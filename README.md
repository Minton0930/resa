# Reseplaneraren

En fristående reseplanerare byggd med Next.js (App Router) + TypeScript + Tailwind CSS,
redo att deployas som ett eget projekt på Vercel.

## Funktioner

- Välj **avreseort** (Stockholm, Göteborg, Malmö, Köpenhamn, Oslo, Helsingfors)
- Välj **land och resmål** bland 12 länder / ca 25 städer och resorter
- Ange **antal resenärer** (vuxna och barn) och **resdatum**
- Välj **boendeform**: endast rum, frukost, halvpension, helpension eller **all inclusive**
- Bläddra bland **hotell** per resmål med stjärnor, gästbetyg och faciliteter
- Se ett **komplett paketpris** (flyg + hotell + boendetillägg) uträknat live, totalt och per person
- **Boka** paketresan direkt i gränssnittet

All data (länder, städer, hotell, flygbaspriser) är ett kurerat exempeldataset i `lib/data.ts` —
byt ut det mot ett riktigt boknings-API (t.ex. Amadeus, Duffel, Hotelbeds) genom att ersätta
funktionerna där och i `lib/pricing.ts`.

## Kom igång

```bash
npm install
npm run dev
```

Öppna http://localhost:3000

## Deploy till Vercel

```bash
npm i -g vercel
vercel
```

Eller koppla det här repot till Vercel via dashboarden — ingen extra konfiguration behövs.
Ingen miljövariabel krävs för grundutförandet eftersom all data är statisk i appen.

## Tech stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · lucide-react
