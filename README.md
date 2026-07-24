# Reseplaneraren

En fristående reseplanerare byggd med Next.js (App Router) + TypeScript + Tailwind CSS,
redo att deployas som ett eget projekt på Vercel.

## Funktioner

- Välj **avreseort** (Stockholm, Göteborg, Malmö, Köpenhamn, Oslo, Helsingfors)
- Välj **land och resmål** bland 12 länder / ca 25 städer och resorter
- Ange **antal resenärer** (vuxna och barn) och **resdatum**
- Välj **boendeform**: endast rum, frukost, halvpension, helpension eller **all inclusive**
- Bläddra bland **riktiga hotell med riktiga bilder** (Booking.com) per resmål, med stjärnor,
  gästbetyg och pris — eller exempeldata om inget API är anslutet
- Se ett **komplett paketpris** (flyg + hotell + boendetillägg) uträknat live, totalt och per person
- **Boka** paketresan direkt i gränssnittet

Länder, städer och flygbaspriser är ett dataset i `lib/data.ts` / `lib/worldCountries.ts` som
täcker praktiskt taget alla länder i världen. Hotellen hämtas live från Booking.com (se nedan) —
utan API-nyckel visar appen tydligt märkt exempeldata istället, aldrig påhittad data ihopblandad
med riktig.

## Kom igång

```bash
npm install
cp .env.example .env.local   # valfritt, se nedan
npm run dev
```

Öppna http://localhost:3000

## Koppla in riktiga hotell (Booking.com via RapidAPI)

Utan detta steg visar appen exempelhotell med platshållarbilder — allt annat fungerar ändå.

1. Skapa ett konto på [rapidapi.com](https://rapidapi.com)
2. Sök upp och prenumerera på Booking.coms hotell-API (t.ex. produkten **booking-com15** av
   DataCrawler) — det finns en gratisnivå
3. Kopiera din `X-RapidAPI-Key`
4. Lokalt: klistra in den i `.env.local` som `RAPIDAPI_KEY=...`
   På Vercel: Project Settings → Environment Variables → lägg till `RAPIDAPI_KEY`
5. Redeploya (eller starta om `npm run dev`) — hotellkorten visar nu "Live från Booking.com"

Appens hotellkort visar tydligt om datan är **live** eller **exempeldata**, och om ett anrop
misslyckas visas ett felmeddelande (loggat i servern) med fallback till exempeldata istället för
att krascha. Eftersom det exakta svarsformatet från RapidAPI-produkten kan skilja sig något
(fältnamn m.m.), justera parsningen i `lib/integrations/booking.ts` om hotellkorten kommer tomma
efter att du kopplat in din nyckel.

## Deploy till Vercel

```bash
npm i -g vercel
vercel
```

Eller koppla det här repot till Vercel via dashboarden. Lägg till `RAPIDAPI_KEY` under
Environment Variables om du vill ha riktiga hotell (se ovan) — annars behövs ingen konfiguration.

## Tech stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · lucide-react
