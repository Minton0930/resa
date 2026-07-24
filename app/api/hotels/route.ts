import { NextRequest, NextResponse } from "next/server";
import { isBookingConfigured, searchLiveHotels } from "@/lib/integrations/booking";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const cityName = params.get("cityName");
  const countryName = params.get("countryName");
  const countryCode = params.get("countryCode");
  const cityId = params.get("cityId");
  const checkin = params.get("checkin");
  const checkout = params.get("checkout");
  const adults = Number(params.get("adults") || "2");

  if (!isBookingConfigured()) {
    return NextResponse.json({ source: "not_connected", hotels: [] });
  }

  if (!cityName || !countryName || !countryCode || !cityId || !checkin || !checkout) {
    return NextResponse.json({ source: "error", hotels: [], message: "Saknar sökparametrar" }, { status: 400 });
  }

  try {
    const hotels = await searchLiveHotels({
      cityName,
      countryName,
      countryCode,
      cityId,
      checkin,
      checkout,
      adults,
    });
    return NextResponse.json({ source: "live", hotels });
  } catch (err) {
    console.error("Kunde inte hämta hotell från Booking.com:", err);
    return NextResponse.json({ source: "error", hotels: [] });
  }
}
