export type BoardType = "rum" | "frukost" | "halvpension" | "helpension" | "all-inclusive";

export const boardLabels: Record<BoardType, string> = {
  rum: "Endast rum",
  frukost: "Frukost ingår",
  halvpension: "Halvpension",
  helpension: "Helpension",
  "all-inclusive": "All Inclusive",
};

// Tillägg i kr per person och natt utöver hotellets grundpris (som motsvarar "rum")
export const boardSupplement: Record<BoardType, number> = {
  rum: 0,
  frukost: 90,
  halvpension: 220,
  helpension: 380,
  "all-inclusive": 650,
};

export interface DepartureCity {
  code: string;
  city: string;
  country: string;
}

export const departureCities: DepartureCity[] = [
  { code: "ARN", city: "Stockholm (Arlanda)", country: "Sverige" },
  { code: "GOT", city: "Göteborg (Landvetter)", country: "Sverige" },
  { code: "MMX", city: "Malmö", country: "Sverige" },
  { code: "CPH", city: "Köpenhamn", country: "Danmark" },
  { code: "OSL", city: "Oslo", country: "Norge" },
  { code: "HEL", city: "Helsingfors", country: "Finland" },
];

export interface Hotel {
  id: string;
  name: string;
  city: string;
  countryCode: string;
  stars: 3 | 4 | 5;
  pricePerNightPerPerson: number; // grundpris ("rum") i SEK
  boardOptions: BoardType[];
  amenities: string[];
  rating: number; // 1-10 gästbetyg
  beachfront: boolean;
  emoji: string;
}

export interface City {
  id: string;
  name: string;
  countryCode: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
  basePricePerPersonRoundtrip: number; // baseflygpris tur & retur i SEK
  cities: City[];
}

export const countries: Country[] = [
  {
    code: "ES",
    name: "Spanien",
    flag: "🇪🇸",
    region: "Medelhavet",
    basePricePerPersonRoundtrip: 1690,
    cities: [
      { id: "palma", name: "Palma (Mallorca)", countryCode: "ES" },
      { id: "gran-canaria", name: "Gran Canaria", countryCode: "ES" },
      { id: "costa-del-sol", name: "Costa del Sol", countryCode: "ES" },
    ],
  },
  {
    code: "GR",
    name: "Grekland",
    flag: "🇬🇷",
    region: "Medelhavet",
    basePricePerPersonRoundtrip: 1990,
    cities: [
      { id: "kreta", name: "Kreta", countryCode: "GR" },
      { id: "rhodos", name: "Rhodos", countryCode: "GR" },
      { id: "kos", name: "Kos", countryCode: "GR" },
    ],
  },
  {
    code: "TR",
    name: "Turkiet",
    flag: "🇹🇷",
    region: "Medelhavet",
    basePricePerPersonRoundtrip: 2190,
    cities: [
      { id: "antalya", name: "Antalya", countryCode: "TR" },
      { id: "alanya", name: "Alanya", countryCode: "TR" },
      { id: "bodrum", name: "Bodrum", countryCode: "TR" },
    ],
  },
  {
    code: "EG",
    name: "Egypten",
    flag: "🇪🇬",
    region: "Röda havet",
    basePricePerPersonRoundtrip: 2890,
    cities: [
      { id: "hurghada", name: "Hurghada", countryCode: "EG" },
      { id: "sharm", name: "Sharm el-Sheikh", countryCode: "EG" },
      { id: "marsa-alam", name: "Marsa Alam", countryCode: "EG" },
    ],
  },
  {
    code: "PT",
    name: "Portugal",
    flag: "🇵🇹",
    region: "Atlanten",
    basePricePerPersonRoundtrip: 1890,
    cities: [
      { id: "algarve", name: "Algarve", countryCode: "PT" },
      { id: "madeira", name: "Madeira", countryCode: "PT" },
    ],
  },
  {
    code: "HR",
    name: "Kroatien",
    flag: "🇭🇷",
    region: "Medelhavet",
    basePricePerPersonRoundtrip: 2090,
    cities: [
      { id: "split", name: "Split", countryCode: "HR" },
      { id: "dubrovnik", name: "Dubrovnik", countryCode: "HR" },
    ],
  },
  {
    code: "CY",
    name: "Cypern",
    flag: "🇨🇾",
    region: "Medelhavet",
    basePricePerPersonRoundtrip: 2390,
    cities: [
      { id: "ayia-napa", name: "Ayia Napa", countryCode: "CY" },
      { id: "paphos", name: "Paphos", countryCode: "CY" },
    ],
  },
  {
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    region: "Asien",
    basePricePerPersonRoundtrip: 6990,
    cities: [
      { id: "phuket", name: "Phuket", countryCode: "TH" },
      { id: "krabi", name: "Krabi", countryCode: "TH" },
    ],
  },
  {
    code: "AE",
    name: "Förenade Arabemiraten",
    flag: "🇦🇪",
    region: "Mellanöstern",
    basePricePerPersonRoundtrip: 4290,
    cities: [
      { id: "dubai", name: "Dubai", countryCode: "AE" },
      { id: "abu-dhabi", name: "Abu Dhabi", countryCode: "AE" },
    ],
  },
  {
    code: "MV",
    name: "Maldiverna",
    flag: "🇲🇻",
    region: "Indiska oceanen",
    basePricePerPersonRoundtrip: 8990,
    cities: [{ id: "male", name: "Malé-atollen", countryCode: "MV" }],
  },
  {
    code: "IT",
    name: "Italien",
    flag: "🇮🇹",
    region: "Medelhavet",
    basePricePerPersonRoundtrip: 1790,
    cities: [
      { id: "sicilien", name: "Sicilien", countryCode: "IT" },
      { id: "sardinien", name: "Sardinien", countryCode: "IT" },
    ],
  },
  {
    code: "US",
    name: "USA",
    flag: "🇺🇸",
    region: "Nordamerika",
    basePricePerPersonRoundtrip: 7490,
    cities: [
      { id: "miami", name: "Miami", countryCode: "US" },
      { id: "orlando", name: "Orlando", countryCode: "US" },
    ],
  },
];

export const hotels: Hotel[] = [
  // Spanien
  { id: "es-palma-1", name: "Hotel Bellver Mallorca", city: "palma", countryCode: "ES", stars: 4, pricePerNightPerPerson: 420, boardOptions: ["frukost", "halvpension", "all-inclusive"], amenities: ["Pool", "Spa", "Gym"], rating: 8.4, beachfront: true, emoji: "🏖️" },
  { id: "es-palma-2", name: "Palma Suites Boutique", city: "palma", countryCode: "ES", stars: 3, pricePerNightPerPerson: 290, boardOptions: ["rum", "frukost"], amenities: ["Pool", "Wifi"], rating: 7.8, beachfront: false, emoji: "🏨" },
  { id: "es-gc-1", name: "Gran Canaria Sun Resort", city: "gran-canaria", countryCode: "ES", stars: 5, pricePerNightPerPerson: 590, boardOptions: ["halvpension", "helpension", "all-inclusive"], amenities: ["Pool", "Spa", "Barn­klubb", "Vattenland"], rating: 9.0, beachfront: true, emoji: "🌴" },
  { id: "es-cds-1", name: "Costa del Sol Marina Hotel", city: "costa-del-sol", countryCode: "ES", stars: 4, pricePerNightPerPerson: 440, boardOptions: ["frukost", "halvpension", "all-inclusive"], amenities: ["Pool", "Gym", "Golf"], rating: 8.2, beachfront: true, emoji: "⛳" },
  // Grekland
  { id: "gr-kreta-1", name: "Creta Blue Lagoon Resort", city: "kreta", countryCode: "GR", stars: 5, pricePerNightPerPerson: 610, boardOptions: ["halvpension", "all-inclusive"], amenities: ["Privat strand", "Spa", "Barn­klubb"], rating: 9.1, beachfront: true, emoji: "🏝️" },
  { id: "gr-kreta-2", name: "Kreta Olive Grove Hotel", city: "kreta", countryCode: "GR", stars: 3, pricePerNightPerPerson: 280, boardOptions: ["rum", "frukost"], amenities: ["Pool", "Restaurang"], rating: 7.6, beachfront: false, emoji: "🫒" },
  { id: "gr-rhodos-1", name: "Rhodos Acropolis Beach", city: "rhodos", countryCode: "GR", stars: 4, pricePerNightPerPerson: 470, boardOptions: ["frukost", "halvpension", "all-inclusive"], amenities: ["Pool", "Spa"], rating: 8.5, beachfront: true, emoji: "🏛️" },
  { id: "gr-kos-1", name: "Kos Aegean Sunset", city: "kos", countryCode: "GR", stars: 4, pricePerNightPerPerson: 430, boardOptions: ["halvpension", "all-inclusive"], amenities: ["Pool", "Vattensport"], rating: 8.3, beachfront: true, emoji: "🌅" },
  // Turkiet
  { id: "tr-antalya-1", name: "Antalya Royal Palace All Inclusive", city: "antalya", countryCode: "TR", stars: 5, pricePerNightPerPerson: 520, boardOptions: ["all-inclusive"], amenities: ["Vattenland", "Spa", "5 restauranger"], rating: 9.2, beachfront: true, emoji: "👑" },
  { id: "tr-alanya-1", name: "Alanya Beach Resort", city: "alanya", countryCode: "TR", stars: 4, pricePerNightPerPerson: 380, boardOptions: ["halvpension", "all-inclusive"], amenities: ["Pool", "Barn­klubb"], rating: 8.4, beachfront: true, emoji: "🏖️" },
  { id: "tr-bodrum-1", name: "Bodrum Marina View", city: "bodrum", countryCode: "TR", stars: 4, pricePerNightPerPerson: 410, boardOptions: ["frukost", "halvpension"], amenities: ["Marina", "Pool"], rating: 8.1, beachfront: true, emoji: "⛵" },
  // Egypten
  { id: "eg-hurghada-1", name: "Hurghada Coral Reef Resort", city: "hurghada", countryCode: "EG", stars: 5, pricePerNightPerPerson: 460, boardOptions: ["all-inclusive"], amenities: ["Dykcenter", "Vattenland", "Spa"], rating: 8.9, beachfront: true, emoji: "🐠" },
  { id: "eg-sharm-1", name: "Sharm Grand Oasis", city: "sharm", countryCode: "EG", stars: 5, pricePerNightPerPerson: 490, boardOptions: ["halvpension", "all-inclusive"], amenities: ["Privat strand", "Spa"], rating: 8.7, beachfront: true, emoji: "🐪" },
  { id: "eg-marsa-1", name: "Marsa Alam Diving Lodge", city: "marsa-alam", countryCode: "EG", stars: 4, pricePerNightPerPerson: 350, boardOptions: ["halvpension", "all-inclusive"], amenities: ["Dykcenter", "Pool"], rating: 8.3, beachfront: true, emoji: "🤿" },
  // Portugal
  { id: "pt-algarve-1", name: "Algarve Cliffside Resort", city: "algarve", countryCode: "PT", stars: 4, pricePerNightPerPerson: 400, boardOptions: ["frukost", "halvpension"], amenities: ["Golf", "Pool"], rating: 8.5, beachfront: true, emoji: "🏌️" },
  { id: "pt-madeira-1", name: "Madeira Garden Hotel", city: "madeira", countryCode: "PT", stars: 4, pricePerNightPerPerson: 380, boardOptions: ["frukost", "halvpension"], amenities: ["Utsikt", "Spa"], rating: 8.6, beachfront: false, emoji: "🌺" },
  // Kroatien
  { id: "hr-split-1", name: "Split Old Town Hotel", city: "split", countryCode: "HR", stars: 3, pricePerNightPerPerson: 310, boardOptions: ["rum", "frukost"], amenities: ["Centralt", "Wifi"], rating: 7.9, beachfront: false, emoji: "🏰" },
  { id: "hr-dubrovnik-1", name: "Dubrovnik Pearl Adriatic", city: "dubrovnik", countryCode: "HR", stars: 5, pricePerNightPerPerson: 620, boardOptions: ["frukost", "halvpension"], amenities: ["Havsutsikt", "Spa"], rating: 9.0, beachfront: true, emoji: "🌊" },
  // Cypern
  { id: "cy-ayianapa-1", name: "Ayia Napa Party Beach Hotel", city: "ayia-napa", countryCode: "CY", stars: 4, pricePerNightPerPerson: 420, boardOptions: ["halvpension", "all-inclusive"], amenities: ["Pool", "Nattliv nära"], rating: 8.0, beachfront: true, emoji: "🎉" },
  { id: "cy-paphos-1", name: "Paphos Aphrodite Resort", city: "paphos", countryCode: "CY", stars: 5, pricePerNightPerPerson: 540, boardOptions: ["halvpension", "all-inclusive"], amenities: ["Spa", "Privat strand"], rating: 8.8, beachfront: true, emoji: "💎" },
  // Thailand
  { id: "th-phuket-1", name: "Phuket Andaman Paradise", city: "phuket", countryCode: "TH", stars: 5, pricePerNightPerPerson: 480, boardOptions: ["frukost", "halvpension", "all-inclusive"], amenities: ["Privat strand", "Spa", "Pool"], rating: 9.0, beachfront: true, emoji: "🌴" },
  { id: "th-krabi-1", name: "Krabi Limestone Bay Resort", city: "krabi", countryCode: "TH", stars: 4, pricePerNightPerPerson: 370, boardOptions: ["frukost", "halvpension"], amenities: ["Klippformationer", "Pool"], rating: 8.6, beachfront: true, emoji: "🧗" },
  // UAE
  { id: "ae-dubai-1", name: "Dubai Skyline Grand Hotel", city: "dubai", countryCode: "AE", stars: 5, pricePerNightPerPerson: 780, boardOptions: ["frukost", "halvpension", "all-inclusive"], amenities: ["Rooftop pool", "Spa", "Shopping nära"], rating: 9.1, beachfront: false, emoji: "🏙️" },
  { id: "ae-abudhabi-1", name: "Abu Dhabi Desert Pearl Resort", city: "abu-dhabi", countryCode: "AE", stars: 5, pricePerNightPerPerson: 720, boardOptions: ["halvpension", "all-inclusive"], amenities: ["Privat strand", "Spa"], rating: 8.9, beachfront: true, emoji: "🐫" },
  // Maldiverna
  { id: "mv-male-1", name: "Malé Overwater Villas", city: "male", countryCode: "MV", stars: 5, pricePerNightPerPerson: 1450, boardOptions: ["helpension", "all-inclusive"], amenities: ["Vattenvillor", "Dykcenter", "Spa"], rating: 9.6, beachfront: true, emoji: "🏝️" },
  // Italien
  { id: "it-sicilien-1", name: "Sicilia Etna View Hotel", city: "sicilien", countryCode: "IT", stars: 4, pricePerNightPerPerson: 410, boardOptions: ["frukost", "halvpension"], amenities: ["Vinprovning", "Pool"], rating: 8.4, beachfront: true, emoji: "🍷" },
  { id: "it-sardinien-1", name: "Sardegna Costa Smeralda Resort", city: "sardinien", countryCode: "IT", stars: 5, pricePerNightPerPerson: 650, boardOptions: ["halvpension", "all-inclusive"], amenities: ["Privat strand", "Yacht­hamn"], rating: 9.0, beachfront: true, emoji: "⛵" },
  // USA
  { id: "us-miami-1", name: "Miami South Beach Hotel", city: "miami", countryCode: "US", stars: 4, pricePerNightPerPerson: 690, boardOptions: ["rum", "frukost"], amenities: ["Pool", "Nattliv"], rating: 8.3, beachfront: true, emoji: "🌆" },
  { id: "us-orlando-1", name: "Orlando Family Resort & Parks", city: "orlando", countryCode: "US", stars: 4, pricePerNightPerPerson: 560, boardOptions: ["frukost", "halvpension"], amenities: ["Nära nöjesparker", "Pool", "Barn­klubb"], rating: 8.7, beachfront: false, emoji: "🎢" },
];

export function getCountry(code: string) {
  return countries.find((c) => c.code === code);
}

export function getCitiesForCountry(code: string) {
  return getCountry(code)?.cities ?? [];
}

export function getHotelsForCity(cityId: string) {
  return hotels.filter((h) => h.city === cityId);
}
