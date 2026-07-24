// Genererat dataset för alla länder som INTE redan finns manuellt kurerade i data.ts.
// Ger varje land minst en stad (huvudstaden) och tre hotell med bilder, så att hela
// världen går att välja som resmål — även om detaljnivån är lägre än för de mest
// populära charterresmålen.

export type Continent =
  | "norden"
  | "europa"
  | "mellanostern"
  | "nordafrika"
  | "afrika"
  | "asien"
  | "oceanien"
  | "nordamerika"
  | "karibien"
  | "sydamerika";

export const continentInfo: Record<Continent, { basePrice: number; flightHours: number; label: string }> = {
  norden: { basePrice: 890, flightHours: 1.2, label: "Norden & Baltikum" },
  europa: { basePrice: 1590, flightHours: 2.5, label: "Europa" },
  mellanostern: { basePrice: 3390, flightHours: 6, label: "Mellanöstern" },
  nordafrika: { basePrice: 2690, flightHours: 4.5, label: "Nordafrika" },
  afrika: { basePrice: 5890, flightHours: 9.5, label: "Afrika" },
  asien: { basePrice: 6590, flightHours: 10.5, label: "Asien" },
  oceanien: { basePrice: 9890, flightHours: 21, label: "Oceanien" },
  nordamerika: { basePrice: 6890, flightHours: 9.5, label: "Nordamerika" },
  karibien: { basePrice: 7290, flightHours: 10.5, label: "Karibien & Centralamerika" },
  sydamerika: { basePrice: 8290, flightHours: 13, label: "Sydamerika" },
};

// [ISO-kod, namn (svenska), huvudstad, kontinent/region]
export const rawWorldCountries: [string, string, string, Continent][] = [
  // Norden & Baltikum
  ["DK", "Danmark", "Köpenhamn", "norden"],
  ["NO", "Norge", "Oslo", "norden"],
  ["FI", "Finland", "Helsingfors", "norden"],
  ["IS", "Island", "Reykjavik", "norden"],
  ["EE", "Estland", "Tallinn", "norden"],
  ["LV", "Lettland", "Riga", "norden"],
  ["LT", "Litauen", "Vilnius", "norden"],

  // Europa
  ["AD", "Andorra", "Andorra la Vella", "europa"],
  ["AL", "Albanien", "Tirana", "europa"],
  ["AT", "Österrike", "Wien", "europa"],
  ["BA", "Bosnien och Hercegovina", "Sarajevo", "europa"],
  ["BE", "Belgien", "Bryssel", "europa"],
  ["BG", "Bulgarien", "Sofia", "europa"],
  ["BY", "Vitryssland", "Minsk", "europa"],
  ["CH", "Schweiz", "Bern", "europa"],
  ["CZ", "Tjeckien", "Prag", "europa"],
  ["DE", "Tyskland", "Berlin", "europa"],
  ["FR", "Frankrike", "Paris", "europa"],
  ["GB", "Storbritannien", "London", "europa"],
  ["HU", "Ungern", "Budapest", "europa"],
  ["IE", "Irland", "Dublin", "europa"],
  ["LI", "Liechtenstein", "Vaduz", "europa"],
  ["LU", "Luxemburg", "Luxemburg", "europa"],
  ["MC", "Monaco", "Monaco", "europa"],
  ["MD", "Moldavien", "Chisinau", "europa"],
  ["ME", "Montenegro", "Podgorica", "europa"],
  ["MK", "Nordmakedonien", "Skopje", "europa"],
  ["MT", "Malta", "Valletta", "europa"],
  ["NL", "Nederländerna", "Amsterdam", "europa"],
  ["PL", "Polen", "Warszawa", "europa"],
  ["RO", "Rumänien", "Bukarest", "europa"],
  ["RS", "Serbien", "Belgrad", "europa"],
  ["RU", "Ryssland", "Moskva", "europa"],
  ["SI", "Slovenien", "Ljubljana", "europa"],
  ["SK", "Slovakien", "Bratislava", "europa"],
  ["SM", "San Marino", "San Marino", "europa"],
  ["UA", "Ukraina", "Kiev", "europa"],
  ["VA", "Vatikanstaten", "Vatikanstaten", "europa"],
  ["XK", "Kosovo", "Pristina", "europa"],

  // Mellanöstern
  ["BH", "Bahrain", "Manama", "mellanostern"],
  ["IL", "Israel", "Jerusalem", "mellanostern"],
  ["IQ", "Irak", "Bagdad", "mellanostern"],
  ["IR", "Iran", "Teheran", "mellanostern"],
  ["JO", "Jordanien", "Amman", "mellanostern"],
  ["KW", "Kuwait", "Kuwait City", "mellanostern"],
  ["LB", "Libanon", "Beirut", "mellanostern"],
  ["OM", "Oman", "Muskat", "mellanostern"],
  ["PS", "Palestina", "Ramallah", "mellanostern"],
  ["QA", "Qatar", "Doha", "mellanostern"],
  ["SA", "Saudiarabien", "Riyadh", "mellanostern"],
  ["SY", "Syrien", "Damaskus", "mellanostern"],
  ["YE", "Jemen", "Sana'a", "mellanostern"],

  // Nordafrika
  ["DZ", "Algeriet", "Alger", "nordafrika"],
  ["LY", "Libyen", "Tripoli", "nordafrika"],
  ["MA", "Marocko", "Rabat", "nordafrika"],
  ["SD", "Sudan", "Khartoum", "nordafrika"],
  ["TN", "Tunisien", "Tunis", "nordafrika"],

  // Afrika söder om Sahara
  ["AO", "Angola", "Luanda", "afrika"],
  ["BF", "Burkina Faso", "Ouagadougou", "afrika"],
  ["BI", "Burundi", "Gitega", "afrika"],
  ["BJ", "Benin", "Porto-Novo", "afrika"],
  ["BW", "Botswana", "Gaborone", "afrika"],
  ["CD", "Kongo-Kinshasa", "Kinshasa", "afrika"],
  ["CF", "Centralafrikanska republiken", "Bangui", "afrika"],
  ["CG", "Kongo-Brazzaville", "Brazzaville", "afrika"],
  ["CI", "Elfenbenskusten", "Yamoussoukro", "afrika"],
  ["CM", "Kamerun", "Yaoundé", "afrika"],
  ["CV", "Kap Verde", "Praia", "afrika"],
  ["DJ", "Djibouti", "Djibouti", "afrika"],
  ["ER", "Eritrea", "Asmara", "afrika"],
  ["ET", "Etiopien", "Addis Abeba", "afrika"],
  ["GA", "Gabon", "Libreville", "afrika"],
  ["GH", "Ghana", "Accra", "afrika"],
  ["GM", "Gambia", "Banjul", "afrika"],
  ["GN", "Guinea", "Conakry", "afrika"],
  ["GQ", "Ekvatorialguinea", "Malabo", "afrika"],
  ["GW", "Guinea-Bissau", "Bissau", "afrika"],
  ["KE", "Kenya", "Nairobi", "afrika"],
  ["KM", "Komorerna", "Moroni", "afrika"],
  ["LR", "Liberia", "Monrovia", "afrika"],
  ["LS", "Lesotho", "Maseru", "afrika"],
  ["MG", "Madagaskar", "Antananarivo", "afrika"],
  ["ML", "Mali", "Bamako", "afrika"],
  ["MR", "Mauretanien", "Nouakchott", "afrika"],
  ["MU", "Mauritius", "Port Louis", "afrika"],
  ["MW", "Malawi", "Lilongwe", "afrika"],
  ["MZ", "Moçambique", "Maputo", "afrika"],
  ["NA", "Namibia", "Windhoek", "afrika"],
  ["NE", "Niger", "Niamey", "afrika"],
  ["NG", "Nigeria", "Abuja", "afrika"],
  ["RW", "Rwanda", "Kigali", "afrika"],
  ["SC", "Seychellerna", "Victoria", "afrika"],
  ["SL", "Sierra Leone", "Freetown", "afrika"],
  ["SN", "Senegal", "Dakar", "afrika"],
  ["SO", "Somalia", "Mogadishu", "afrika"],
  ["SS", "Sydsudan", "Juba", "afrika"],
  ["ST", "Sao Tome och Principe", "São Tomé", "afrika"],
  ["SZ", "Eswatini", "Mbabane", "afrika"],
  ["TD", "Tchad", "N'Djamena", "afrika"],
  ["TG", "Togo", "Lomé", "afrika"],
  ["TZ", "Tanzania", "Dodoma", "afrika"],
  ["UG", "Uganda", "Kampala", "afrika"],
  ["ZA", "Sydafrika", "Pretoria", "afrika"],
  ["ZM", "Zambia", "Lusaka", "afrika"],
  ["ZW", "Zimbabwe", "Harare", "afrika"],

  // Asien
  ["AF", "Afghanistan", "Kabul", "asien"],
  ["AM", "Armenien", "Jerevan", "asien"],
  ["AZ", "Azerbajdzjan", "Baku", "asien"],
  ["BD", "Bangladesh", "Dhaka", "asien"],
  ["BN", "Brunei", "Bandar Seri Begawan", "asien"],
  ["BT", "Bhutan", "Thimphu", "asien"],
  ["CN", "Kina", "Peking", "asien"],
  ["GE", "Georgien", "Tbilisi", "asien"],
  ["HK", "Hongkong", "Hongkong", "asien"],
  ["ID", "Indonesien", "Jakarta", "asien"],
  ["IN", "Indien", "New Delhi", "asien"],
  ["JP", "Japan", "Tokyo", "asien"],
  ["KG", "Kirgizistan", "Bisjkek", "asien"],
  ["KH", "Kambodja", "Phnom Penh", "asien"],
  ["KP", "Nordkorea", "Pyongyang", "asien"],
  ["KR", "Sydkorea", "Seoul", "asien"],
  ["KZ", "Kazakstan", "Astana", "asien"],
  ["LA", "Laos", "Vientiane", "asien"],
  ["LK", "Sri Lanka", "Colombo", "asien"],
  ["MM", "Myanmar", "Naypyidaw", "asien"],
  ["MN", "Mongoliet", "Ulaanbaatar", "asien"],
  ["MO", "Macao", "Macao", "asien"],
  ["MY", "Malaysia", "Kuala Lumpur", "asien"],
  ["NP", "Nepal", "Katmandu", "asien"],
  ["PH", "Filippinerna", "Manila", "asien"],
  ["PK", "Pakistan", "Islamabad", "asien"],
  ["SG", "Singapore", "Singapore", "asien"],
  ["TJ", "Tadzjikistan", "Dusjanbe", "asien"],
  ["TL", "Östtimor", "Dili", "asien"],
  ["TM", "Turkmenistan", "Asjchabad", "asien"],
  ["TW", "Taiwan", "Taipei", "asien"],
  ["UZ", "Uzbekistan", "Tasjkent", "asien"],
  ["VN", "Vietnam", "Hanoi", "asien"],

  // Oceanien
  ["AU", "Australien", "Canberra", "oceanien"],
  ["FJ", "Fiji", "Suva", "oceanien"],
  ["FM", "Mikronesien", "Palikir", "oceanien"],
  ["KI", "Kiribati", "Tarawa", "oceanien"],
  ["MH", "Marshallöarna", "Majuro", "oceanien"],
  ["NR", "Nauru", "Yaren", "oceanien"],
  ["NZ", "Nya Zeeland", "Wellington", "oceanien"],
  ["PG", "Papua Nya Guinea", "Port Moresby", "oceanien"],
  ["PW", "Palau", "Ngerulmud", "oceanien"],
  ["SB", "Salomonöarna", "Honiara", "oceanien"],
  ["TO", "Tonga", "Nuku'alofa", "oceanien"],
  ["TV", "Tuvalu", "Funafuti", "oceanien"],
  ["VU", "Vanuatu", "Port Vila", "oceanien"],
  ["WS", "Samoa", "Apia", "oceanien"],

  // Nordamerika
  ["CA", "Kanada", "Ottawa", "nordamerika"],
  ["MX", "Mexiko", "Mexico City", "nordamerika"],
  ["GL", "Grönland", "Nuuk", "nordamerika"],

  // Karibien & Centralamerika
  ["AG", "Antigua och Barbuda", "Saint John's", "karibien"],
  ["BB", "Barbados", "Bridgetown", "karibien"],
  ["BS", "Bahamas", "Nassau", "karibien"],
  ["BZ", "Belize", "Belmopan", "karibien"],
  ["CR", "Costa Rica", "San José", "karibien"],
  ["CU", "Kuba", "Havanna", "karibien"],
  ["DM", "Dominica", "Roseau", "karibien"],
  ["DO", "Dominikanska republiken", "Santo Domingo", "karibien"],
  ["GD", "Grenada", "Saint George's", "karibien"],
  ["GT", "Guatemala", "Guatemala City", "karibien"],
  ["HN", "Honduras", "Tegucigalpa", "karibien"],
  ["HT", "Haiti", "Port-au-Prince", "karibien"],
  ["JM", "Jamaica", "Kingston", "karibien"],
  ["KN", "Saint Kitts och Nevis", "Basseterre", "karibien"],
  ["LC", "Saint Lucia", "Castries", "karibien"],
  ["NI", "Nicaragua", "Managua", "karibien"],
  ["PA", "Panama", "Panama City", "karibien"],
  ["SV", "El Salvador", "San Salvador", "karibien"],
  ["TT", "Trinidad och Tobago", "Port of Spain", "karibien"],
  ["VC", "Saint Vincent och Grenadinerna", "Kingstown", "karibien"],

  // Sydamerika
  ["AR", "Argentina", "Buenos Aires", "sydamerika"],
  ["BO", "Bolivia", "La Paz", "sydamerika"],
  ["BR", "Brasilien", "Brasília", "sydamerika"],
  ["CL", "Chile", "Santiago", "sydamerika"],
  ["CO", "Colombia", "Bogotá", "sydamerika"],
  ["EC", "Ecuador", "Quito", "sydamerika"],
  ["GY", "Guyana", "Georgetown", "sydamerika"],
  ["PY", "Paraguay", "Asunción", "sydamerika"],
  ["PE", "Peru", "Lima", "sydamerika"],
  ["SR", "Surinam", "Paramaribo", "sydamerika"],
  ["UY", "Uruguay", "Montevideo", "sydamerika"],
  ["VE", "Venezuela", "Caracas", "sydamerika"],
];

export function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

// Enkel deterministisk "slump" baserad på en textnyckel, så samma land/hotell
// alltid ger samma pris och bild mellan sidladdningar.
export function seededRandom(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (h << 5) - h + key.charCodeAt(i);
    h |= 0;
  }
  return (Math.abs(h) % 1000) / 1000;
}

export function hotelImage(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/640/420`;
}
