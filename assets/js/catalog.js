/* PÍCARA – prototype catalogue and motif line drawings.
   ALL prices, sizes and product details below are PLACEHOLDERS.
   In the Shopify build this data comes from Shopify products/metafields. */

window.PICARA_MOTIFS = {
  libelula: '<svg class="motif" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><line x1="50" y1="22" x2="50" y2="94"/><circle cx="50" cy="17" r="4.5"/><ellipse cx="29" cy="34" rx="21" ry="5.5" transform="rotate(-10 29 34)"/><ellipse cx="71" cy="34" rx="21" ry="5.5" transform="rotate(10 71 34)"/><ellipse cx="31" cy="46" rx="18" ry="4.8" transform="rotate(12 31 46)"/><ellipse cx="69" cy="46" rx="18" ry="4.8" transform="rotate(-12 69 46)"/></svg>',
  mariposa: '<svg class="motif" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M50 40 C34 16 8 22 12 44 C15 56 34 56 50 48 C66 56 85 56 88 44 C92 22 66 16 50 40Z"/><path d="M50 50 C40 62 26 76 34 82 C42 86 48 70 50 60 C52 70 58 86 66 82 C74 76 60 62 50 50Z"/><line x1="50" y1="34" x2="50" y2="66"/><path d="M48 34 L40 24 M52 34 L60 24"/></svg>',
  mariquita: '<svg class="motif" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="50" cy="56" r="32"/><path d="M50 24 L50 88"/><path d="M30 26 C34 18 42 16 50 18 C58 16 66 18 70 26"/><circle cx="50" cy="16" r="6"/><circle cx="36" cy="46" r="5"/><circle cx="64" cy="46" r="5"/><circle cx="34" cy="68" r="5"/><circle cx="66" cy="68" r="5"/></svg>',
  escarabajo: '<svg class="motif" viewBox="0 0 100 110" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="50" cy="20" r="8"/><path d="M45 13 L36 3 M55 13 L64 3"/><ellipse cx="50" cy="62" rx="24" ry="34"/><line x1="50" y1="28" x2="50" y2="96"/><path d="M27 52 L12 44 M26 66 L10 70 M29 80 L16 92 M73 52 L88 44 M74 66 L90 70 M71 80 L84 92"/></svg>',
  hoja: '<svg class="motif" viewBox="0 0 60 80" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M30 76 C30 50 30 30 30 6"/><path d="M30 20 C14 14 8 26 12 36 C18 34 26 28 30 20Z"/><path d="M30 34 C46 28 52 40 48 50 C42 48 34 42 30 34Z"/><path d="M30 50 C16 46 12 58 16 66 C22 64 28 58 30 50Z"/></svg>'
};

window.PICARA_WAYS = {
  short: '<svg viewBox="0 0 200 150" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M60 20 Q100 100 140 20"/><circle cx="100" cy="78" r="7"/></svg>',
  long: '<svg viewBox="0 0 200 150" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M70 10 Q100 140 130 10"/><circle cx="100" cy="106" r="7"/></svg>',
  bracelet: '<svg viewBox="0 0 200 150" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><ellipse cx="100" cy="66" rx="44" ry="18"/><ellipse cx="100" cy="74" rx="44" ry="18"/><ellipse cx="100" cy="82" rx="44" ry="18"/><circle cx="144" cy="76" r="5"/></svg>',
  earring: '<svg viewBox="0 0 200 150" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M100 14 C88 14 84 30 92 38"/><circle cx="100" cy="46" r="4"/><line x1="100" y1="50" x2="100" y2="84"/><circle cx="100" cy="92" r="8"/></svg>'
};

window.PICARA_COLLECTIONS = [
  { id: 'libelula', name: 'Libélula', bg: 'bg-musgo', tag: { es: 'LIGERA · AÉREA', en: 'LIGHT · AIRY', de: 'LEICHT · LUFTIG' } },
  { id: 'mariposa', name: 'Mariposa', bg: 'bg-piedra', tag: { es: 'CLÁSICA · PÍCARA', en: 'CLASSIC · CHEEKY', de: 'KLASSISCH · FRECH' } },
  { id: 'mariquita', name: 'Mariquita', bg: 'bg-liquen', tag: { es: 'PEQUEÑA · CON SUERTE', en: 'SMALL · LUCKY', de: 'KLEIN · GLÜCKLICH' } },
  { id: 'escarabajo', name: 'Escarabajo', bg: 'bg-bosque', tag: { es: 'BRILLANTE · ESCULTÓRICO', en: 'SHINY · SCULPTURAL', de: 'GLÄNZEND · SKULPTURAL' } }
];

window.PICARA_TYPES = {
  necklace: { es: 'Collar convertible', en: 'Convertible necklace', de: 'Wandelbare Kette' },
  earrings: { es: 'Pendientes', en: 'Earrings', de: 'Ohrringe' },
  pendant: { es: 'Colgante', en: 'Pendant', de: 'Anhänger' },
  ring: { es: 'Anillo', en: 'Ring', de: 'Ring' }
};

window.PICARA_PRODUCTS = [
  { id: 'libelula-collar', collection: 'libelula', type: 'necklace', price: 145, vermeilExtra: 30, ways: ['short', 'long', 'bracelet'],
    size: { es: 'Cadena: 84 cm. Libélula: 18 × 22 mm.', en: 'Chain: 84 cm. Libélula: 18 × 22 mm.', de: 'Kette: 84 cm. Libélula: 18 × 22 mm.' },
    desc: { es: 'Una cadena fina con una libélula que hace de cierre. Corta, larga o en la muñeca. Ligera como el insecto que la inspira.', en: 'A fine chain with a dragonfly that works as the clasp. Short, long or on the wrist. Light as the insect behind it.', de: 'Eine feine Kette mit einer Libelle als Verschluss. Kurz, lang oder am Handgelenk. Leicht wie das Insekt, das sie inspiriert.' } },
  { id: 'libelula-pendientes', collection: 'libelula', type: 'earrings', price: 95, vermeilExtra: 20, ways: ['earring'],
    size: { es: 'Largo: 24 mm.', en: 'Length: 24 mm.', de: 'Länge: 24 mm.' },
    desc: { es: 'Dos libélulas pequeñas. Añade el colgante Libélula para alargarlas.', en: 'Two small dragonflies. Add the Libélula pendant to make them longer.', de: 'Zwei kleine Libellen. Mit dem Libélula-Anhänger werden sie länger.' } },
  { id: 'mariposa-pendientes', collection: 'mariposa', type: 'earrings', price: 110, vermeilExtra: 25, ways: ['earring'],
    size: { es: 'Largo: 28 mm.', en: 'Length: 28 mm.', de: 'Länge: 28 mm.' },
    desc: { es: 'Alas abiertas, línea limpia. Una mariposa con carácter.', en: 'Open wings, clean lines. A butterfly with character.', de: 'Offene Flügel, klare Linien. Ein Schmetterling mit Charakter.' } },
  { id: 'mariposa-colgante', collection: 'mariposa', type: 'pendant', price: 85, vermeilExtra: 20, ways: ['short', 'earring'],
    size: { es: 'Mariposa: 20 × 16 mm.', en: 'Butterfly: 20 × 16 mm.', de: 'Schmetterling: 20 × 16 mm.' },
    desc: { es: 'En la cadena o en el pendiente. La mariposa elige dónde posarse.', en: 'On the chain or on the earring. The butterfly chooses where to land.', de: 'An der Kette oder am Ohrring. Der Schmetterling wählt, wo er landet.' } },
  { id: 'mariquita-colgante', collection: 'mariquita', type: 'pendant', price: 85, vermeilExtra: 20, ways: ['short', 'earring'],
    size: { es: 'Mariquita: 12 mm.', en: 'Ladybird: 12 mm.', de: 'Marienkäfer: 12 mm.' },
    desc: { es: 'Pequeña y redonda. Dicen que trae suerte.', en: 'Small and round. They say it brings luck.', de: 'Klein und rund. Man sagt, er bringt Glück.' } },
  { id: 'mariquita-anillo', collection: 'mariquita', type: 'ring', price: 75, vermeilExtra: 15, ways: [],
    size: { es: 'Tallas 12–18. Ajustable.', en: 'Sizes 12–18. Adjustable.', de: 'Größen 12–18. Verstellbar.' },
    desc: { es: 'Una mariquita que se posa en tu dedo y no se va.', en: 'A ladybird that lands on your finger and stays.', de: 'Ein Marienkäfer, der auf deinem Finger landet und bleibt.' } },
  { id: 'escarabajo-anillo', collection: 'escarabajo', type: 'ring', price: 95, vermeilExtra: 20, ways: [],
    size: { es: 'Tallas 12–18.', en: 'Sizes 12–18.', de: 'Größen 12–18.' },
    desc: { es: 'Brillante y escultórico, como el ala de un escarabajo.', en: 'Shiny and sculptural, like a beetle wing.', de: 'Glänzend und skulptural, wie der Flügel eines Käfers.' } },
  { id: 'escarabajo-collar', collection: 'escarabajo', type: 'necklace', price: 125, vermeilExtra: 30, ways: ['short', 'long', 'bracelet'],
    size: { es: 'Cadena: 84 cm. Escarabajo: 16 × 22 mm.', en: 'Chain: 84 cm. Beetle: 16 × 22 mm.', de: 'Kette: 84 cm. Käfer: 16 × 22 mm.' },
    desc: { es: 'El escarabajo cierra la cadena. Tres formas de llevarlo.', en: 'The beetle closes the chain. Three ways to wear it.', de: 'Der Käfer schließt die Kette. Drei Arten, sie zu tragen.' } }
];
