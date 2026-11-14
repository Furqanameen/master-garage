const WHY = [
  'Certified, experienced technicians',
  'Modern diagnostic equipment',
  'Genuine / OEM-quality parts',
  'Transparent estimates before any work starts',
];

export function specializationPages() {
  return [
    {
      path: '/specializations/',
      type: 'specializations_index',
      nav_label: 'Specialize',
      in_menu: false,
      sort_order: 2,
      title: 'Car Specialists DIP | Makes We Service',
      meta_description: 'BMW, Mercedes, Audi, Toyota, Nissan and more. Independent specialists in DIP 2.',
      h1: 'Car specializations in Dubai Investment Park',
      subtitle: 'Independent service for German, Japanese, American and European cars.',
      content: {
        keywords: 'car specialist DIP, German car specialist Dubai',
        intro: [
          'Master Mechanics is an independent workshop in Dubai Investment Park 2. Competitors around DIP rank on brand-specialist searches — BMW, Mercedes, Audi, Toyota, Nissan and American SUVs. These pages match that intent with one make (or family) per URL, then link to the service and blog that belong with it.',
        ],
        groups: [
          { heading: 'German', paths: ['/bmw-service-dubai/', '/mercedes-service-dubai/', '/audi-service-dubai/', '/mini-service-dubai/', '/german-car-specialist-dip/'] },
          { heading: 'Japanese', paths: ['/toyota-service-dubai/', '/nissan-service-dubai/', '/lexus-service-dubai/', '/honda-service-dubai/', '/mitsubishi-service-dubai/', '/infiniti-service-dubai/', '/suzuki-service-dubai/', '/mazda-service-dubai/', '/japanese-car-service-dip/'] },
          { heading: 'American', paths: ['/ford-service-dubai/', '/chevrolet-service-dubai/', '/gmc-service-dubai/', '/american-car-repair-dip/'] },
        ],
        related: ['/services/', '/german-car-specialist-dip/', '/japanese-car-service-dip/', '/american-car-repair-dip/'],
        sections: [
          { heading: 'How we work on specialist cars', paragraphs: [
            'Each make gets a dedicated page with the faults we see in Dubai heat: cooling, AC, oil, batteries and electronics. We use genuine or OEM-quality parts and give a written estimate before work starts.',
          ] },
          { heading: 'Related', links: ['/services/', '/maintenance-service/', '/ac-repair-service/', '/blog/'] },
        ],
      },
    },
    {
      path: '/german-car-specialist-dip/',
      type: 'specialization',
      nav_label: 'German specialists',
      sort_order: 90,
      title: 'German Car Specialist DIP | BMW Audi',
      meta_description: 'Independent BMW, Mercedes, Audi and MINI service in Dubai Investment Park.',
      h1: 'German car specialist in Dubai Investment Park',
      subtitle: 'BMW, Mercedes-Benz, Audi and MINI',
      content: {
        keywords: 'German car specialist DIP, BMW Mercedes Audi garage',
        intro: [
          'Independent German-car work is what nearby DIP garages advertise most. We service BMW, Mercedes-Benz, Audi and MINI with computer diagnostics, cooling and AC repairs, and the fluids those engines need in Dubai.',
        ],
        sections: [
          { heading: 'Makes in this group', links: ['/bmw-service-dubai/', '/mercedes-service-dubai/', '/audi-service-dubai/', '/mini-service-dubai/'] },
          { heading: 'Typical German-car jobs in DIP', bullets: [
            'Cooling system and water-pump checks',
            'Oil leaks from gaskets and valve covers',
            'AC compressor and condenser performance',
            'Battery, modules and coding after replacements',
            'DSG / automatic gearbox service',
          ] },
          { heading: 'Why this workshop', bullets: WHY },
          { heading: 'Related', links: ['/specializations/', '/car-computer-diagnostics/', '/ac-repair-service/', '/blog/%d0%b0uto-service/bmw-car-servicing-in-dubai-keep-your-bmw-in-top-condition/'] },
        ],
        related: ['/bmw-service-dubai/', '/mercedes-service-dubai/', '/audi-service-dubai/', '/specializations/'],
      },
      faq: [
        { q: 'Do I need the dealer for a BMW, Mercedes or Audi?', a: 'Not for routine service and most repairs. Keep records and use the correct-spec parts and oils. If the car is under warranty, check those terms first.' },
        { q: 'Can you read German-car fault codes?', a: 'Yes. We scan the car, confirm the cause with tests, and explain the repair before work starts.' },
      ],
    },
    {
      path: '/japanese-car-service-dip/',
      type: 'specialization',
      nav_label: 'Japanese specialists',
      sort_order: 91,
      title: 'Japanese Car Service DIP | Toyota',
      meta_description: 'Toyota, Nissan, Lexus, Honda, Mitsubishi, Infiniti, Suzuki and Mazda in DIP.',
      h1: 'Japanese car service in Dubai Investment Park',
      subtitle: 'Toyota, Nissan, Lexus, Honda and more',
      content: {
        keywords: 'Japanese car service DIP, Toyota garage Dubai',
        intro: [
          'Japanese SUVs and saloons are daily drivers across South Dubai. We service Toyota, Nissan, Lexus, Honda, Mitsubishi, Infiniti, Suzuki and Mazda — with extra attention to AC, CVT/automatic fluid and suspension wear in the heat.',
        ],
        sections: [
          { heading: 'Makes in this group', links: ['/toyota-service-dubai/', '/nissan-service-dubai/', '/lexus-service-dubai/', '/honda-service-dubai/', '/mitsubishi-service-dubai/', '/infiniti-service-dubai/', '/suzuki-service-dubai/', '/mazda-service-dubai/'] },
          { heading: 'Typical Japanese-car jobs', bullets: [
            'AC performance in extreme heat',
            'CVT and automatic transmission fluid service',
            'Brake and suspension wear on SUVs and pick-ups',
            'Scheduled oil, filter and spark-plug service',
          ] },
          { heading: 'Why this workshop', bullets: WHY },
          { heading: 'Related', links: ['/specializations/', '/maintenance-service/', '/ac-repair-service/', '/oil-change-service/'] },
        ],
        related: ['/toyota-service-dubai/', '/nissan-service-dubai/', '/specializations/'],
      },
      faq: [
        { q: 'Do you service Land Cruiser and Patrol?', a: 'Yes. Both are common in DIP. See the Toyota and Nissan specialist pages for model notes.' },
      ],
    },
    {
      path: '/american-car-repair-dip/',
      type: 'specialization',
      nav_label: 'American specialists',
      sort_order: 92,
      title: 'American Car Repair DIP | Ford GMC',
      meta_description: 'Ford, Chevrolet and GMC service and repair in Dubai Investment Park.',
      h1: 'American car repair in Dubai Investment Park',
      subtitle: 'Ford, Chevrolet and GMC',
      content: {
        keywords: 'American car repair DIP, Ford GMC garage Dubai',
        intro: [
          'Heavy SUVs and trucks need stronger brakes, cooling and AC. We service Ford, Chevrolet and GMC from our DIP 2 workshop with estimates before any work starts.',
        ],
        sections: [
          { heading: 'Makes in this group', links: ['/ford-service-dubai/', '/chevrolet-service-dubai/', '/gmc-service-dubai/'] },
          { heading: 'Typical American-car jobs', bullets: [
            'AC and rear-climate performance on large SUVs',
            'Brake pads and discs on heavier vehicles',
            'Transmission service and diagnostics',
            'Battery and charging checks in the heat',
          ] },
          { heading: 'Why this workshop', bullets: WHY },
          { heading: 'Related', links: ['/specializations/', '/car-brake-service/', '/ac-repair-service/', '/car-gearbox-transmission-service/'] },
        ],
        related: ['/ford-service-dubai/', '/gmc-service-dubai/', '/specializations/'],
      },
      faq: [
        { q: 'Can you work on F-150, Tahoe and Yukon?', a: 'Yes. Those models are listed on the Ford, Chevrolet and GMC pages.' },
      ],
    },
  ];
}
