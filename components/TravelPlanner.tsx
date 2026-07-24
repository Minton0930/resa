"use client";

import { useMemo, useState } from "react";
import {
  BoardType,
  boardLabels,
  countries,
  departureCities,
  getCitiesForCountry,
  getCountry,
  getHotelsForCity,
  Hotel,
} from "@/lib/data";
import { calculatePackagePrice, formatSEK } from "@/lib/pricing";
import {
  Plane,
  Users,
  MapPin,
  Star,
  Waves,
  CalendarDays,
  UtensilsCrossed,
  CheckCircle2,
  Minus,
  Plus,
} from "lucide-react";

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function TravelPlanner() {
  const [departureCode, setDepartureCode] = useState(departureCities[0].code);
  const [countryCode, setCountryCode] = useState(countries[0].code);
  const [cityId, setCityId] = useState(countries[0].cities[0].id);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [departDate, setDepartDate] = useState(todayPlus(30));
  const [returnDate, setReturnDate] = useState(todayPlus(37));
  const [board, setBoard] = useState<BoardType>("all-inclusive");
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const country = getCountry(countryCode)!;
  const cities = getCitiesForCountry(countryCode);
  const hotels = getHotelsForCity(cityId);

  const nights = useMemo(() => {
    const d1 = new Date(departDate);
    const d2 = new Date(returnDate);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [departDate, returnDate]);

  const selectedHotel: Hotel | undefined = hotels.find((h) => h.id === selectedHotelId) ?? hotels[0];

  function handleCountryChange(code: string) {
    setCountryCode(code);
    const newCities = getCitiesForCountry(code);
    setCityId(newCities[0]?.id ?? "");
    setSelectedHotelId(null);
    setBooked(false);
  }

  function handleCityChange(id: string) {
    setCityId(id);
    setSelectedHotelId(null);
    setBooked(false);
  }

  const totalPersons = adults + children;

  const pricing =
    selectedHotel && nights > 0
      ? calculatePackagePrice({
          hotel: selectedHotel,
          flightBasePricePerPerson: country.basePricePerPersonRoundtrip,
          nights,
          adults,
          children,
          board,
        })
      : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <header className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow-glow">
          <Plane size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Reseplaneraren</h1>
          <p className="text-sm font-medium text-slate-500">Flyg + hotell + all inclusive — allt i ett paket</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Route */}
          <section className="card p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-slate-900">
              <MapPin size={18} className="text-brand-500" /> Vart vill du åka?
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Reser ifrån
                </label>
                <select
                  value={departureCode}
                  onChange={(e) => setDepartureCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                >
                  {departureCities.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Land</label>
                <select
                  value={countryCode}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Resmål / stad
                </label>
                <div className="flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCityChange(c.id)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors ${
                        cityId === c.id
                          ? "border-brand-500 bg-brand-500 text-white shadow-glow"
                          : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Dates & travelers */}
          <section className="card p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-slate-900">
              <CalendarDays size={18} className="text-brand-500" /> Datum & resenärer
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Avresa</label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Hemresa</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                  <Users size={14} /> Vuxna
                </label>
                <Stepper value={adults} min={1} max={10} onChange={setAdults} />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                  <Users size={14} /> Barn (2–17 år)
                </label>
                <Stepper value={children} min={0} max={8} onChange={setChildren} />
              </div>
            </div>
            <p className="mt-3 text-xs font-medium text-slate-500">
              {nights > 0 ? `${nights} nätter · ${totalPersons} resenärer` : "Välj giltiga datum för att se antal nätter"}
            </p>
          </section>

          {/* Board type */}
          <section className="card p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-slate-900">
              <UtensilsCrossed size={18} className="text-brand-500" /> Hur vill du bo?
            </h2>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(boardLabels) as BoardType[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBoard(b)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors ${
                    board === b
                      ? "border-sun-500 bg-sun-500 text-white shadow-glow"
                      : "border-slate-200 bg-white text-slate-600 hover:border-sun-400"
                  }`}
                >
                  {boardLabels[b]}
                </button>
              ))}
            </div>
          </section>

          {/* Hotels */}
          <section className="card p-5">
            <h2 className="mb-4 text-lg font-extrabold text-slate-900">
              Hotell i {cities.find((c) => c.id === cityId)?.name}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {hotels
                .filter((h) => h.boardOptions.includes(board))
                .map((hotel) => (
                  <button
                    key={hotel.id}
                    onClick={() => {
                      setSelectedHotelId(hotel.id);
                      setBooked(false);
                    }}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      (selectedHotelId ?? hotels[0]?.id) === hotel.id
                        ? "border-brand-500 bg-brand-50 shadow-glow"
                        : "border-slate-200 bg-white hover:border-brand-300"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-2xl">{hotel.emoji}</span>
                      <span className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </span>
                    </div>
                    <p className="font-extrabold text-slate-900">{hotel.name}</p>
                    <p className="mb-2 flex items-center gap-1 text-xs font-medium text-slate-500">
                      {hotel.beachfront && <Waves size={12} className="text-brand-500" />}
                      Betyg {hotel.rating.toFixed(1)}/10 · {hotel.amenities.join(", ")}
                    </p>
                    <p className="text-sm font-bold text-brand-700">
                      {formatSEK(hotel.pricePerNightPerPerson)} / person / natt
                    </p>
                  </button>
                ))}
              {hotels.filter((h) => h.boardOptions.includes(board)).length === 0 && (
                <p className="text-sm text-slate-500 sm:col-span-2">
                  Inga hotell med {boardLabels[board].toLowerCase()} hittades på det här resmålet — testa ett annat
                  boendealternativ.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Right: summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6 space-y-4 p-5">
            <h2 className="text-lg font-extrabold text-slate-900">Ditt paket</h2>

            {selectedHotel && pricing ? (
              <>
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-slate-900">
                    {country.flag} {country.name} · {cities.find((c) => c.id === cityId)?.name}
                  </p>
                  <p className="text-slate-500">
                    Från {departureCities.find((d) => d.code === departureCode)?.city}
                  </p>
                  <p className="text-slate-500">
                    {departDate} → {returnDate} ({nights} nätter)
                  </p>
                  <p className="text-slate-500">
                    {adults} vuxna{children > 0 ? ` + ${children} barn` : ""}
                  </p>
                  <p className="text-slate-500">{selectedHotel.name}</p>
                  <p className="text-slate-500">{boardLabels[board]}</p>
                </div>

                <div className="space-y-1.5 border-t border-slate-200 pt-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Flyg t/r ({totalPersons} pers)</span>
                    <span className="font-bold text-slate-800">{formatSEK(pricing.flightTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hotell ({nights} nätter)</span>
                    <span className="font-bold text-slate-800">{formatSEK(pricing.hotelTotal)}</span>
                  </div>
                  {pricing.boardSupplementTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">{boardLabels[board]}-tillägg</span>
                      <span className="font-bold text-slate-800">{formatSEK(pricing.boardSupplementTotal)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-slate-500">Totalpris</span>
                    <span className="text-2xl font-extrabold text-slate-900">{formatSEK(pricing.total)}</span>
                  </div>
                  <p className="text-right text-xs font-medium text-slate-400">
                    {formatSEK(pricing.pricePerPerson)} / person
                  </p>
                </div>

                <button
                  onClick={() => setBooked(true)}
                  disabled={nights <= 0}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-extrabold text-white shadow-glow transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {booked ? <CheckCircle2 size={18} /> : <Plane size={18} />}
                  {booked ? "Paket bokat!" : "Boka paketresa"}
                </button>
                {booked && (
                  <p className="rounded-lg bg-emerald-50 p-2.5 text-center text-xs font-bold text-emerald-700">
                    Din resa till {country.name} är bokad. Bekräftelse skickas till din e-post.
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-500">Välj resmål och datum för att se pris.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
      >
        <Minus size={14} />
      </button>
      <span className="w-5 text-center text-sm font-extrabold text-slate-900">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
