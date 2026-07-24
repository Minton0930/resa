import { BoardType, boardSupplement, Hotel } from "./data";

export interface PricingInput {
  hotel: Hotel;
  flightBasePricePerPerson: number;
  nights: number;
  adults: number;
  children: number;
  board: BoardType;
}

export interface PricingResult {
  flightTotal: number;
  hotelTotal: number;
  boardSupplementTotal: number;
  total: number;
  totalPersons: number;
  pricePerPerson: number;
}

const CHILD_DISCOUNT = 0.65; // barn betalar 65% av vuxenpris

export function calculatePackagePrice(input: PricingInput): PricingResult {
  const { hotel, flightBasePricePerPerson, nights, adults, children, board } = input;
  const totalPersons = adults + children;

  const adultFlightCost = adults * flightBasePricePerPerson;
  const childFlightCost = children * flightBasePricePerPerson * CHILD_DISCOUNT;
  const flightTotal = Math.round(adultFlightCost + childFlightCost);

  const nightlyBase = hotel.pricePerNightPerPerson;
  const adultHotelCost = adults * nightlyBase * nights;
  const childHotelCost = children * nightlyBase * nights * CHILD_DISCOUNT;
  const hotelTotal = Math.round(adultHotelCost + childHotelCost);

  const supplement = boardSupplement[board];
  const adultBoardCost = adults * supplement * nights;
  const childBoardCost = children * supplement * nights * CHILD_DISCOUNT;
  const boardSupplementTotal = Math.round(adultBoardCost + childBoardCost);

  const total = flightTotal + hotelTotal + boardSupplementTotal;
  const pricePerPerson = totalPersons > 0 ? Math.round(total / totalPersons) : 0;

  return { flightTotal, hotelTotal, boardSupplementTotal, total, totalPersons, pricePerPerson };
}

export function formatSEK(n: number) {
  return new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 }).format(n) + " kr";
}
