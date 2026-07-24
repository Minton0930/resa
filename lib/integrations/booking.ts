// Integration mot Booking.coms hotell-API via RapidAPI
// (https://rapidapi.com/DataCrawler/api/booking-com15).
//
// Kräver miljövariabeln RAPIDAPI_KEY. RAPIDAPI_HOST kan sättas om du byter
// till en annan Booking.com-liknande produkt på RapidAPI som har ett annat
// värdnamn — annars används standardvärdet nedan.

import { BoardType, Hotel } from "@/lib/data";

const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "booking-com15.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export function isBookingConfigured() {
  return Boolean(RAPIDAPI_KEY);
}

async function rapidGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`https://${RAPIDAPI_HOST}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const res = await fetch(url.toString(), {
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY as string,
      "x-rapidapi-host": RAPIDAPI_HOST,
    },
    // Hotellpriser/tillgänglighet ändras löpande — cacha inte.
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`RapidAPI ${path} svarade ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json() as Promise<T>;
}

interface DestinationResult {
  dest_id: string;
  search_type: string;
  name?: string;
  city_name?: string;
  label?: string;
}

async function searchDestination(query: string): Promise<DestinationResult | null> {
  const json = await rapidGet<{ data?: DestinationResult[] }>("/api/v1/hotels/searchDestination", {
    query,
  });
  const first = json.data?.[0];
  return first ?? null;
}

export interface LiveHotelSearchParams {
  cityName: string;
  countryName: string;
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  adults: number;
  countryCode: string;
  cityId: string;
}

interface RawHotelResult {
  hotel_id?: number | string;
  property?: {
    name?: string;
    photoUrls?: string[];
    reviewScore?: number;
    reviewCount?: number;
    propertyClass?: number;
    priceBreakdown?: { grossPrice?: { value?: number; currency?: string } };
    accessibilityLabel?: string;
  };
}

function mapBoardOptions(stars: number): BoardType[] {
  if (stars >= 5) return ["frukost", "halvpension", "helpension", "all-inclusive"];
  if (stars >= 4) return ["frukost", "halvpension", "all-inclusive"];
  if (stars >= 3) return ["rum", "frukost", "halvpension"];
  return ["rum", "frukost"];
}

function mapHotel(raw: RawHotelResult, params: LiveHotelSearchParams, nights: number): Hotel | null {
  const name = raw.property?.name;
  const photo = raw.property?.photoUrls?.[0];
  const grossPrice = raw.property?.priceBreakdown?.grossPrice?.value;
  if (!name || !photo || !grossPrice || !raw.hotel_id) return null;

  const stars = Math.min(5, Math.max(3, Math.round(raw.property?.propertyClass || 4))) as 3 | 4 | 5;
  // grossPrice är totalpris för hela vistelsen (för de resenärer som söktes) — räkna om till pris/person/natt.
  const pricePerNightPerPerson = Math.max(150, Math.round(grossPrice / Math.max(1, nights) / Math.max(1, params.adults)));

  return {
    id: `live-${raw.hotel_id}`,
    name,
    city: params.cityId,
    countryCode: params.countryCode,
    stars,
    pricePerNightPerPerson,
    boardOptions: mapBoardOptions(stars),
    amenities: [],
    rating: raw.property?.reviewScore ? Math.round(raw.property.reviewScore * 10) / 10 : 7.5,
    beachfront: false,
    emoji: stars === 5 ? "✨" : stars === 4 ? "🏨" : "🛏️",
    image: photo,
  };
}

export async function searchLiveHotels(params: LiveHotelSearchParams): Promise<Hotel[]> {
  if (!isBookingConfigured()) return [];

  const destination = await searchDestination(`${params.cityName}, ${params.countryName}`);
  if (!destination) return [];

  const d1 = new Date(params.checkin);
  const d2 = new Date(params.checkout);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / 86400000));

  const json = await rapidGet<{ data?: { hotels?: RawHotelResult[] } }>("/api/v1/hotels/searchHotels", {
    dest_id: destination.dest_id,
    search_type: destination.search_type?.toUpperCase() || "CITY",
    arrival_date: params.checkin,
    departure_date: params.checkout,
    adults: String(params.adults),
    room_qty: "1",
    page_number: "1",
    units: "metric",
    temperature_unit: "c",
    languagecode: "sv",
    currency_code: "SEK",
  });

  const hotels = json.data?.hotels ?? [];
  return hotels
    .map((h) => mapHotel(h, params, nights))
    .filter((h): h is Hotel => h !== null)
    .slice(0, 12);
}
