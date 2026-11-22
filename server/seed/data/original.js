// Existing mastermechanics.ae pages, keyed by their original paths and image URLs.

import mediaRedirects from '../../src/mediaRedirects.json' with { type: 'json' };

export const LOGO = '/images/master-mechanics-garage-logo.png';
export const OG_DEFAULT = '/images/master-mechanics-garage-car-service-dubai-dip.jpg';
const img = (ym, file) => mediaRedirects[`/wp-content/uploads/${ym}/${file}`];

/* ------------------------------------------------------------------ brands (spare parts page + home) */
export const brandGroups = [
  { name: 'Japanese', logos: [
    ['Toyota', 'toyota-removebg-preview.png', '2024/08'], ['Suzuki', 'suzuki-removebg-preview.png', '2024/08'],
    ['Nissan', 'nissan-removebg-preview.png', '2024/08'], ['Mitsubishi', 'mitsu-removebg-preview.png', '2024/08'],
    ['Lexus', 'lexus-removebg-preview.png', '2024/08'], ['Honda', 'honda.png', '2025/05'],
    ['Infiniti', 'infiniti-removebg-preview-300x162.png', '2024/08'], ['Mazda', 'mazda-removebg-preview.png', '2024/08'] ] },
  { name: 'American', logos: [
    ['American car brand', '5.png', '2024/08'], ['GMC', 'GMC-Logo.avif', '2025/05'], ['American car brand', 'z-1.jpeg', '2024/09'],
    ['American car brand', 'x.png', '2024/09'], ['American car brand', 'z-300x144.jpeg', '2024/09'], ['American car brand', '1.png', '2024/08'] ] },
  { name: 'German', logos: [
    ['German car brand', '6.jpeg', '2024/08'], ['German car brand', '5-1.png', '2024/08'], ['German car brand', '4.jpeg', '2024/08'],
    ['Mercedes-Benz', 'merc.jpg', '2025/05'], ['German car brand', '1.jpeg', '2024/08'], ['Audi', 'audi-removebg-preview.png', '2025/05'] ] },
  { name: 'European', logos: [
    ['European car brand', 'HS982_003ARkddtlvgsrpv1koogosqjbavf96__mid.jpg', '2025/05'], ['European car brand', '2-1.png', '2024/08'],
    ['European car brand', '3.png', '2024/08'], ['European car brand', '5-2.png', '2024/08'], ['European car brand', '6-1.jpeg', '2024/08'],
    ['European car brand', '7.jpeg', '2024/08'], ['European car brand', '8.jpeg', '2024/08'], ['European car brand', 'download-removebg-preview.png', '2024/09'] ] },
  { name: 'Others', logos: [
    ['Vauxhall', 'vaux.jpeg', '2024/10'], ['TVR', 'tvr.png', '2024/10'], ['Triumph', 'tri.png', '2024/10'], ['Morgan', 'morgan.png', '2024/10'],
    ['MINI', 'minni.jpeg', '2024/10'], ['Car brand', 'mac.png', '2024/10'], ['Car brand', 'grin.png', '2024/10'], ['Car brand', 'ac.png', '2024/10'] ] },
].map((g) => ({ name: g.name, logos: g.logos.map(([alt, file, ym]) => ({ alt: `${alt} logo`, src: img(ym, file) })) }));

const homeBrandStrip = [
  '/images/master-mechanics-garage-audi-service-dubai.png', '/images/master-mechanics-garage-vauxhall-service-dubai.jpg', '/images/master-mechanics-garage-mini-cooper-service-dubai.jpg', '/images/master-mechanics-garage-morgan-service-dubai.png',
  '/images/master-mechanics-garage-mercedes-benz-service-dubai.jpg', '/images/master-mechanics-garage-triumph-service-dubai.png', '/images/master-mechanics-garage-tvr-service-dubai.png', '/images/master-mechanics-garage-chevrolet-service-dubai.jpg', '/images/master-mechanics-garage-gmc-service-dubai.avif',
];

/* ------------------------------------------------------------------ pages */
export const pages = [];

pages.push({
  path: '/', type: 'home', nav_label: 'Home', sort_order: 0,
  title: 'Car Service Centre in Dubai Investment Park | DIP Auto Workshop',
  meta_description: "Master Mechanics Garage is Dubai Investment Park's best car service center. Expert auto repair & servicing for all brands.",
  h1: "Dubai's Trusted Car Service & Repair Center - Easy, Quick & Reliable!",
  hero_image: OG_DEFAULT,
  content: {
    hero: {
      sub: "Certified technicians, genuine parts, and top-tier service tailored to Dubai's roads and climate.",
      cta: 'Explore Services', image: OG_DEFAULT,
    },
    badge: '#1 Car Service Center for Expert Care and Performance',
    chips: ['AC Repair Service', 'Electric Repair Service', 'Engine Repair', 'Car Maintenance', 'Car Dent Paint', 'Wheel Alignment'],
    brandsTitle: 'Car Brands We Serve',
    brandStrip: homeBrandStrip,
    brandGroups,
    workshopImage: '/images/master-mechanics-garage-workshop-dubai-dip.jpg',
    why: {
      title: 'Why Choose Us',
      intro: 'We believe in building long-lasting relationships with our customers based on trust and reliability. Let Master Mechanics Garage LLC be your one-stop shop for all your automotive needs.',
      items: [
        { icon: '/images/master-mechanics-garage-expert-technicians.png', title: 'Expert Technicians', text: 'Our highly skilled mechanics have years of experience working on a wide range of vehicles.' },
        { icon: '/images/master-mechanics-garage-advanced-equipment.png', title: 'Advanced Equipment', text: 'We utilize the latest diagnostic tools and technology to ensure accurate and efficient repairs.' },
        { icon: '/images/master-mechanics-garage-genuine-spare-parts.png', title: 'Genuine Spare Parts', text: 'We use only high-quality, original equipment manufacturer (OEM) parts.' },
        { icon: '/images/master-mechanics-garage-transparent-pricing.png', title: 'Transparent Pricing', text: 'We provide honest and upfront estimates, with no hidden fees.' },
        { icon: '/images/master-mechanics-garage-customer-satisfaction.png', title: 'Customer Satisfaction', text: 'Your satisfaction is our top priority. We strive to exceed your expectations with every visit.' },
      ],
    },
    servicesTitle: 'Our Services',
    services: [
      { title: 'AC Repair Service', path: '/ac-repair-service/', image: '/images/master-mechanics-garage-car-ac-repair-dubai-dip.jpg',
        text: "Can you imagine driving a car without an AC in the scorching heat of Dubai? A properly operating car air conditioning system is necessary in Dubai’s harsh climate. In order to keep your car cool even on the hottest summer days, Master Mechanics specializes in thorough automotive AC repairs and maintenance. Our qualified professionals provide dependable, effective car cooling system repair services at affordable costs by combining their knowledge with cutting-edge technology." },
      { title: 'Electric Repair Service', path: '/car-electrical-repair/', image: '/images/master-mechanics-garage-car-electrical-repair-dubai-dip.png',
        text: 'Electrical systems in modern automobiles have advanced well beyond simple wiring and basic components. Modern vehicles rely on sophisticated electrical systems as they control everything from safety features to engine performance. At Master Mechanics, we are aware that diagnosing and fixing these intricate systems requires knowledge of vehicle electronics, advanced diagnostic equipment, and experience. From straightforward battery replacements to intricate computer system diagnostics, our cutting-edge facility in Dubai is prepared to handle all of your car’s electrical requirements.' },
      { title: 'Engine Repair', path: '/engine-repair-service/', image: '/images/master-mechanics-garage-car-engine-repair-dubai-dip.jpg',
        text: 'At Master Mechanics, we know that the engine of your car is its heart and it has to be carefully maintained and cared for to operate at its best. Our team of qualified technicians has been providing comprehensive engine diagnosis, repair, and maintenance services to Dubai’s diverse automotive community for many years. Our cutting-edge facility in Dubai is prepared to address all of your engine-related needs, whether you’re having sensor issues, an overheating engine, or just need a regular oil change.' },
      { title: 'Fuel Injector Service', path: '/injector-cleaning-service/', image: '/images/master-mechanics-garage-fuel-injector-service-dubai-dip.jpg',
        text: 'We at Master Mechanics know how crucial fuel injectors are for your vehicle’s performance system. So, as the top automobile professionals in Dubai Investment Park, we offer complete fuel injector servicing, guaranteeing peak engine performance, increased fuel economy, and lower emissions. Our skilled specialists use cutting-edge cleaning technologies and diagnostic tools to provide exceptional results for all car makes and models.' },
      { title: 'Car Maintenance', path: '/maintenance-service/', image: '/images/master-mechanics-garage-car-maintenance-dubai-dip.jpg',
        text: 'Regular car maintenance is non-negotiable for your vehicle’s longevity and performance. As a leading provider of car routine maintenance in DIP, Dubai, we combine technical expertise with superior customer service to provide you peace of mind when you hit the road with your vehicle.' },
      { title: 'Car Repair Work', path: '/repair-service/', image: '/images/master-mechanics-garage-engine-sensor-repair-dubai.jpg',
        text: 'With our state-of-the-art facilities and certified technicians, we deliver premium car repair services in Dubai Investment Park. Our commitment to excellence and customer satisfaction makes us stand out from the crowd. We are the preferred choice of many car owners for all automotive repair needs in Dubai.' },
      { title: 'Car Denting Painting', path: '/car-denting-painting-service/', image: '/images/master-mechanics-garage-car-denting-painting-dubai-dip.jpg',
        text: 'At Master Mechanics, we understand how important the appearance of your car is for you. At our state-of-the-art facility in Dubai, we offer comprehensive auto car dent repair, paint services, and professional detailing to restore and enhance your vehicle’s aesthetic appeal.' },
      { title: 'Wheel Alignment & Balancing', path: '/wheel-alignment-and-tire-balancing/', image: '/images/master-mechanics-garage-wheel-alignment-balancing-dubai-dip.jpg',
        text: 'Properly balanced tires are essential for vehicle safety, comfort, and performance. Using cutting-edge computerized equipment, our state-of-the-art facility in Dubai Investment Park provides accurate tire balancing services. With our skilled specialists and state-of-the-art technology, we guarantee that the tires on your car are precisely balanced for optimum performance.' },
    ],
    testimonialsTitle: 'Happy Clients & Feedbacks',
    testimonials: [
      { name: 'Christof Lexner', rating: 5, text: 'The service here is unparalleled. I look for honesty and service at a car shop and this place delivers consistently.' },
      { name: 'Ali Saleh', rating: 4, text: 'Really great service! They’re extremely transparent, good communicators, and work quickly and efficiently.' },
      { name: 'Paul Alford', rating: 5, text: 'Great service and honest mechanic I always come when I have an issue with my cars and always recommend this place to everybody.' },
    ],
    closing: 'Keep your car running smoothly and safely with expert servicing. From oil changes to full inspections, we’ve got you covered.',
  },
});

pages.push({
  path: '/services/', type: 'services_index', nav_label: 'Services', sort_order: 1,
  title: 'Luxury Car Repair & Auto Service in South Dubai',
  meta_description: 'Premium car repair, diagnostics, ECU programming, AC, electrical, brakes, tyres and body work for luxury and everyday cars in South Dubai.',
  h1: 'Car Repair & Auto Services in South Dubai',
  subtitle: 'Everything your car needs under one roof in Dubai Investment Park.',
  content: {
    intro: [
      'Master Mechanics is an automotive repair and maintenance workshop focused on luxury and everyday vehicles in South Dubai. From engine overhauls and ECU programming to AC, electrical, brake, tyre and body work, our certified technicians handle it all.',
    ],
    highlights: [
      'Engine overhauls, diagnostics, timing belts and overheating repair', 'ECU and key programming', 'Fuel injector and throttle-body service',
      'Minor and major service, oil and coolant flush', 'Air conditioning, radiators and water pumps',
      'Electrical – battery, alternator, starter and wiring', 'Tyre replacement, shocks and power steering', 'Brakes, clutch and exhaust',
      'RTA inspection prep', 'Body work – denting, painting, hail and rust',
    ],
    perks: ['Fast delivery of your car to your door', 'Customer lounge with free WiFi', 'Competitive, transparent pricing'],
  },
});

pages.push({
  path: '/about/', type: 'static', nav_label: 'About', sort_order: 2,
  title: 'About Master Mechanics Garage | Car Service Center in Dubai Investment Park',
  // The live page has placeholder text ("jjggjgkgkgk") as its meta description – replaced here.
  meta_description: 'Master Mechanics Garage is a car service center in Dubai Investment Park 2 for German, European, Japanese and American cars. Genuine parts, transparent pricing.',
  h1: 'Know Us Better',
  hero_image: '/images/master-mechanics-garage-workshop-dubai-dip.jpg',
  content: {
    intro: [
      'Welcome to Master Mechanics!',
      'At Master Mechanics Garage LLC, we are your trusted experts in servicing German, European, Japanese, and American cars. Our highly skilled team specializes in maintaining and repairing a wide range of vehicles, from BMWs and Mercedes-Benz to Toyota, Honda, Ford, and Chevrolet. We pride ourselves on providing top-quality service using state-of-the-art equipment and genuine parts, ensuring your car receives the best care possible.',
      'In addition to our expertise, we offer exclusive services designed to make your experience as convenient as possible. Our complimentary pick-up and drop-off service saves you time, while our transparent and reasonable pricing ensures you get the best value for your money. At Master Mechanics Care, we go the extra mile to provide full care for your vehicle, delivering unmatched quality and customer satisfaction. Trust us to keep your car running smoothly and safely on the road.',
      'Thank you for choosing Master Mechanics!',
    ],
    sections: [
      { heading: 'Our team', paragraphs: [
        'Our team is the heart of our car service centre. We have assembled a team of the finest automotive experts in the region. With a blend of seasoned professionals and fresh talent, our team is constantly evolving, staying ahead of the latest automotive technologies and repair techniques. Our technicians are passionate about cars and committed to excellence, providing top-tier service that keeps your vehicle in peak condition. With ample staff on hand, we have ensured the quickest delivery of your vehicle, minimizing wait times and getting you back on the road as soon as possible.',
        'Our customers trust us for our transparency, integrity, and the exceptional care we provide for every vehicle that enters our workshop at DIP.',
      ] },
      { heading: 'Contact us', bullets: [
        '+971 455 491 81',
        '+971 58 621 9014',
        'carcare@mastermechanics.ae',
        'Master Mechanics Garage LLC Warehouse No. 49, Building No. 3, Span Precast Compound 71 Street, Dubai Investment Park 2 (DIP 2) Dubai, United Arab Emirates',
      ] },
    ],
  },
});

pages.push({
  path: '/spare-parts/', type: 'spare_parts', nav_label: 'Spare Parts', sort_order: 3,
  title: 'Spare Parts in Dubai Investment Park – Genuine & OEM | Master Mechanics',
  meta_description: 'Genuine and OEM spare parts for Japanese, American, German and European cars in Dubai Investment Park. WhatsApp or call Master Mechanics for availability and pricing.',
  h1: 'Genuine OEM spare parts in Dubai Investment Park',
  subtitle: 'Filters, brakes, AC and engine parts for German, Japanese and American cars — ordered for your VIN and fitted in DIP 2.',
  hero_image: LOGO,
  faq: [
    { q: 'Do you sell genuine OEM spare parts in DIP?', a: 'Yes. We order genuine or OEM-quality parts for your make and model and can fit them in the same visit at our Dubai Investment Park 2 workshop.' },
    { q: 'How fast can you get a part for my car?', a: 'Common filters, pads and batteries are often same-day. We confirm availability on WhatsApp before you drive in.' },
    { q: 'Can I buy the part without a repair?', a: 'Yes. WhatsApp the part name or photo. Fitting at the workshop is optional.' },
  ],
  content: {
    intro: [
      'Need a genuine car part in Dubai Investment Park? Master Mechanics sources OEM and OEM-quality spares for Japanese, German, American and European cars, then fits them in our DIP 2 workshop.',
      'WhatsApp a photo or the part name and we will confirm price and stock. We also carry the jobs that usually need those parts: oil service, brakes, AC and engine work.',
    ],
    groups: brandGroups,
    categories: [
      { title: 'Accessories & miscellaneous', items: ['Towing and cargo holders', 'Deflectors, mudguards & mouldings', 'Additional equipment'] },
      { title: 'Maintenance parts', items: ['Filters', 'Lamps', 'Wipers', 'Ignition', 'Glow plugs', 'Brake shoes', 'Brake disc / drum', 'Tools'] },
      { title: 'Engine', items: ['Sensors, units, valves, controllers', 'Engine assembly', 'Cylinder block / crankcase', 'Cylinder head', 'Engine mounting', 'Gaskets and seals', 'Drive belts', 'Valvetrain, timing belts, pulleys', 'Ventilation / recirculation', 'Lubrication system', 'Gears, pulleys, sprockets'] },
      { title: 'Exhaust system', items: ['Sensors, units, valves, controllers', 'Gaskets', 'Exhaust manifold', 'Resonator / middle part', 'Mounting', 'Muffler / rear part', 'Pipes, repair parts, flexible corrugated pipes'] },
      { title: 'Body, car & glass', items: ['Front and rear bumpers', 'Radiator grille', 'Hood', 'Front / rear wing', 'Engine compartment parts', 'Mirrors', 'Doors, glass lifters, handles, locks', 'Car glass', 'Passenger and luggage compartments', 'Safety systems', 'Body frames', 'Fuel tank cap', 'Trunk lid', 'Headlight / windshield wiper', 'Exterior and interior lighting', 'Mouldings, reflectors, spoilers', 'Emblems and plates'] },
      { title: 'Heating & AC', items: ['Sensors, units, valves, controllers', 'AC compressors', 'Evaporators / dehumidifiers', 'Interior heater', 'System pipes', 'Heater radiator', 'Interior filter', 'Air ducts'] },
      { title: 'Suspension & chassis', items: ['Front / rear subframe', 'Shock absorbers', 'Springs / torsion bars', 'Bump stops / boots', 'Steering knuckle, hub', 'Arms, tie rods', 'Stabilizer', 'Rear beam'] },
      { title: 'Transmission & gearbox', items: ['Sensors, units, valves, controllers', 'Automatic transmission components', 'Manual transmission components', 'Transmission mounts', 'Gear shift mechanism', 'Gaskets and seals', 'Clutch systems', 'Lubrication', 'Wheel drive'] },
      { title: 'Wheels & tyres', items: ['Wheel bolts, pins, nuts', 'Stamped and alloy wheels', 'Tyres'] },
      { title: 'Steering', items: ['Sensors, units, valves, controllers', 'Steering wheels', 'Steering column', 'Tie rod end', 'Steering rack', 'Tie rod / idler arm', 'Power steering'] },
      { title: 'Fuel system', items: ['Sensors, units, valves, controllers', 'Fuel tank', 'Vacuum systems', 'Injectors / carburettors', 'Fuel pumps', 'Accelerator pedals', 'Fuel piping', 'Fuel nozzles'] },
      { title: 'Air system', items: ['Sensors, units, valves, controllers', 'Vacuum systems', 'Intake manifold', 'Air filters'] },
      { title: 'Ignition system', items: ['Sensors and units', 'Ignition lock', 'Ignition coil', 'Spark plugs'] },
      { title: 'Brake system', items: ['Sensors, units, valves, controllers', 'Disc brakes', 'Disc brake pads', 'Drum brakes', 'Drum brake shoes', 'Parking brake', 'Caliper', 'Brake pedal', 'Master cylinder', 'Hoses and tubes', 'Brake booster', 'Repair kits'] },
      { title: 'Electrical', items: ['Car battery', 'Audio, video, communication, navigation', 'Control units', 'Switches, buttons, keys', 'Alternator', 'Sensors', 'Relays', 'Fuses', 'Starter', 'Exterior and interior lighting', 'Wiring', 'Electric motors and pumps'] },
    ],
  },
});

pages.push({
  path: '/faq/', type: 'faq', nav_label: 'FAQ', sort_order: 4,
  title: 'FAQ - Mastermechanics', meta_description: "You've got questions? We've got answers – car painting, tyre rotation, synthetic oil and overheating, answered by Master Mechanics in Dubai Investment Park.",
  h1: 'Frequently Asked Questions', content: {},
});

pages.push({
  path: '/gallery/', type: 'gallery', nav_label: 'Gallery', sort_order: 5,
  title: 'Gallery - Mastermechanics', meta_description: 'Photo gallery of our workshop and work at Master Mechanics Garage, Dubai Investment Park.',
  h1: 'Photo Gallery', content: {},
});

pages.push({
  path: '/blog/', type: 'blog_index', nav_label: 'Blog', sort_order: 6,
  title: 'Blog - Mastermechanics',
  meta_description: 'Car care tips, servicing guides and brand-specific advice for Dubai drivers from the Master Mechanics team.',
  h1: 'Blog', content: {},
});

/* Live Yoast category archives: /blog/category/<slug>/ (kept so those URLs do not 404) */
const AUTO = 'аuto-service';
[
  { slug: 'care-tips', name: 'Care Tips', title: 'Care Tips Archives - Mastermechanics' },
  { slug: 'maintenance', name: 'Maintenance', title: 'Maintenance Archives - Mastermechanics' },
  { slug: 'uncategorized', name: 'Uncategorized', title: 'Uncategorized Archives - Mastermechanics' },
  { slug: AUTO, name: 'Auto Service', title: 'Auto Service Archives - Mastermechanics' },
].forEach((c, i) => pages.push({
  path: `/blog/category/${c.slug}/`, type: 'blog_category', nav_label: null, sort_order: 40 + i,
  title: c.title,
  meta_description: `${c.name} articles from Master Mechanics Garage in Dubai Investment Park.`,
  h1: c.name,
  content: { category_slug: c.slug, category_name: c.name },
}));

pages.push({
  path: '/contact/', type: 'contact', nav_label: 'Contact', in_menu: true, sort_order: 7,
  title: 'Contact - Mastermechanics',
  meta_description: 'Visit Master Mechanics Garage LLC, Warehouse No. 49, Building No. 3, Span Precast Compound 71 Street, DIP 2, Dubai.',
  h1: 'Contact Us',
  content: {
    intro: ['Get in touch with Master Mechanics Garage LLC. Every number, email and the workshop map below is clickable.'],
    sections: [
      { heading: 'Hours of operation', bullets: ['Monday – Saturday: 9:00 AM – 7:00 PM', 'Sunday: closed'] },
    ],
  },
});

pages.push({
  path: '/booking/', type: 'booking', nav_label: 'Book', in_menu: true, sort_order: 8,
  title: 'Book Car Service DIP | Appointment',
  meta_description: 'Book a car service appointment at Master Mechanics Garage in Dubai Investment Park. We confirm the time by phone or WhatsApp.',
  h1: 'Book an appointment',
  subtitle: 'Tell us about your car and we will confirm a time that suits you.',
  content: {
    intro: ['Use the form below, call, or WhatsApp. The slot you request may not be available — we will confirm your actual appointment.'],
  },
});

pages.push({
  path: '/thank-you/', type: 'static', nav_label: null, sort_order: 9,
  title: 'Thank you - Mastermechanics',
  meta_description: 'Thank you for contacting Master Mechanics Garage. Our team will connect with you very soon.',
  h1: 'Thank You!!',
  hero_image: '/images/master-mechanics-garage-spare-parts-dubai-dip.jpg',
  content: {
    intro: ['Our team will connect with you very soon.'],
  },
});

pages.push({
  path: '/workshop/', type: 'static', nav_label: null, sort_order: 10,
  title: 'Workshop | Master Mechanics Garage DIP, Dubai',
  meta_description: "Master Mechanics Garage is Dubai Investment Park's car service centre – quality care, a customer lounge, and service for Japanese, American, German and European cars.",
  h1: 'Quality Care You Can Count On',
  hero_image: '/images/master-mechanics-garage-car-maintenance-dubai-dip.jpg',
  content: {
    intro: [
      'We believe in building long-lasting relationships with our customers based on trust and reliability. Let Master Mechanics Garage LLC be your one-stop shop for all your automotive needs.',
    ],
    sections: [
      { heading: 'You relax while we work', paragraphs: [
        'At Master Mechanics, care is in our DNA. We take pride in not only servicing your cars but also in providing a comfortable customer experience. Enjoy our customer lounge with complimentary WiFi, clean washrooms, and refreshments while you wait.',
      ] },
      { heading: 'Our popular services', bullets: [
        { title: 'Brakes', text: 'If you have any doubts regarding the current condition of your brakes, call us or visit the workshop.' },
        { title: 'Transmission', text: 'Keep your car in top shape by taking good care of its transmission system.' },
        { title: 'Car programming', text: 'Diagnostics and programming with the latest equipment.' },
        { title: 'Oil changes', text: 'The easiest thing a vehicle owner can do is get the oil changed on time.' },
        { title: 'Fuel injector', text: 'Certified technicians use the latest diagnostic equipment to service and repair your vehicles.' },
        { title: 'Engines', text: 'State-of-the-art scan tools for engine diagnostics and repair.' },
      ] },
    ],
  },
});

pages.push({
  path: '/car-service-centre-in-dubai-investment-park-dip-auto-workshop/', type: 'static', nav_label: null, sort_order: 11,
  noindex: true,
  title: 'Get Started | Master Mechanics Garage LLC',
  meta_description: 'Choose spare parts and lubricants or the Master Mechanics workshop in Dubai Investment Park.',
  h1: 'Where Would You Like to Go?',
  content: {
    intro: ['Master Mechanics Garage LLC – spare parts & lubricants, or book the workshop.'],
    sections: [
      { heading: 'Choose a destination', links: ['/spare-parts/', '/workshop/'] },
    ],
  },
});

/* ------------------------------------------------------------------ services (original 9) */
const wa = 'Message us on WhatsApp or book an appointment and our team will get back to you.';
const svc = (o) => pages.push({ type: 'service', in_menu: true, ...o });

svc({
  path: '/ac-repair-service/', nav_label: 'Ac Repair Service', sort_order: 10, card_image: '/images/master-mechanics-garage-car-ac-repair-dubai-dip.jpg',
  title: 'Best Car AC Repair in DIP | Auto Cooling System Repair in DIP',
  meta_description: 'Affordable, expert car AC and cooling system repair in Dubai Investment Park so you stay comfortable on the road – Master Mechanics.',
  h1: "DIP's Premier Auto AC Repair Specialists", subtitle: "Stay Cool with Dubai Investment Park's Most Trusted AC Repair Experts.",
  content: {
    intro: ["Can you imagine driving a car without an AC in the scorching heat of Dubai? A properly operating car air conditioning system is necessary in Dubai’s harsh climate. Master Mechanics specializes in thorough automotive AC repairs and maintenance, combining skilled professionals with cutting-edge technology to deliver dependable, effective car cooling system repair at affordable cost."],
    sections: [
      { heading: 'Get your car’s cooling fixed', bullets: ['Ensure optimum efficiency', 'Fix strange sounds from the compressor', 'Guarantee optimum cabin temperature at all times'] },
      { heading: 'Why choose us', bullets: [
        { title: 'Factory-trained technicians', text: 'regularly updated certifications and experience across many makes and models.' },
        { title: 'State-of-the-art diagnostic equipment', text: 'accurately finds electrical faults and refrigerant leaks.' },
        { title: 'Genuine parts and materials', text: 'manufacturer-approved parts to extend system life and reduce future failures.' },
        { title: 'Same-day service availability', text: 'most routine AC jobs are completed the same day.' },
        { title: 'Competitive pricing structure', text: 'fair, transparent prices with cost breakdowns before work begins.' },
        { title: 'Comprehensive warranty coverage', text: 'repairs and replacements are protected by warranty.' },
        { title: 'Transparent cost estimates', text: 'detailed written estimates before any repair starts.' } ] },
      { heading: 'Schedule your appointment', paragraphs: ['Keep your car’s AC working well despite the heat. Master Mechanics is your professional, reliable and affordable choice for AC repairs in DIP, Dubai. ' + wa] },
    ],
  },
});

svc({
  path: '/car-denting-painting-service/', nav_label: 'Car Denting And Painting', sort_order: 11, card_image: '/images/master-mechanics-garage-car-denting-painting-dubai-dip.jpg',
  title: 'Premium Car Paint & Dent Repair Services in DIP, Dubai',
  meta_description: 'Top-quality car paint, dent repair and detailing at affordable rates in Dubai Investment Park. Visit Master Mechanics Garage for expert service.',
  h1: 'Premium Car Paint Services in DIP, Dubai', subtitle: 'Restore the beauty of your car with experts.',
  content: {
    intro: ['At Master Mechanics we understand how important the appearance of your car is. At our facility in Dubai we offer comprehensive dent repair, paint services and professional detailing to restore and enhance your vehicle’s look.'],
    sections: [
      { heading: 'Our range of dent and scratch repair services', bullets: [
        { title: 'Minor collision repair', text: 'from dent removal to scratch repair after minor accidents.' },
        { title: 'Bumper repair', text: 'paint scrapes and scratches from tight parking, fixed by experienced staff.' },
        { title: 'Scratches', text: 'minor and major scratches that spoil your car’s appearance.' },
        { title: 'Professional paint', text: 'premium products and colour-matching technology for touch-ups or full repaints.' },
        { title: 'Expert dent repair', text: 'paintless techniques and traditional body repair for dents of all sizes.' },
        { title: 'Comprehensive auto detailing', text: 'interior deep cleaning, paint correction, clay bar treatment, exterior wash and ceramic coating.' } ] },
      { heading: 'Master Mechanics means quality assurance', paragraphs: ['Every job goes through quality checks under professional lighting with detailed inspections. Work is not finished until it meets our standards.'] },
      { heading: 'We use advanced technology', paragraphs: ['Climate-controlled paint booths, computerised colour matching and professional tools deliver consistent results, even on difficult repairs.'] },
      { heading: 'Why Master Mechanics', bullets: [
        { title: 'Client satisfaction', text: 'records of completed work with before-and-after photos; client inspections welcome.' },
        { title: 'Warranty protection', text: 'covers paint flaws, colour-matching issues and workmanship.' },
        { title: 'Competitive pricing', text: 'clear pricing with detailed cost breakdowns.' },
        { title: 'Emergency services', text: 'fast turnaround for urgent paint touch-ups and accident damage.' } ] },
      { heading: 'What’s more', bullets: ['Custom paint jobs', 'Vintage car restoration', 'Fleet services', 'Insurance claim assistance', 'Mobile estimates', 'Express paint repairs', 'Paint protection packages', 'Premium detailing packages'] },
    ],
  },
});

svc({
  path: '/wheel-alignment-and-tire-balancing/', nav_label: 'Wheel Alignment And Tire Balancing', sort_order: 12, card_image: '/images/master-mechanics-garage-wheel-alignment-balancing-dubai-dip.jpg',
  title: 'Car Wheel Alignment and Tire Balancing in DIP, Dubai',
  meta_description: 'Affordable, expert wheel alignment and tire balancing at Master Mechanics Garage, Dubai Investment Park – smoother, safer drives.',
  h1: 'Professional Tire & Wheel Balancing Services in DIP, Dubai', subtitle: 'Experience smoother rides with expert wheel balancing.',
  content: {
    intro: ['Properly balanced tires are essential for safety, comfort and performance. Using computerised equipment and skilled specialists, our workshop in Dubai Investment Park balances your tires precisely. Call us or book an appointment.'],
    sections: [
      { heading: 'Why choose our wheel service', bullets: [
        { title: 'Advanced wheel balancing technology', text: 'detects small imbalances that affect tire wear and performance, using static and dynamic balancing.' },
        { title: 'Professional diagnostic process', text: 'we inspect tire pressure, rim condition, mounting and wear patterns before balancing to find underlying issues.' },
        { title: 'Complete tire services', text: 'alignment, rotation and pressure optimisation to extend tire life and even out wear.' },
        { title: 'Expert technical team', text: 'certified technicians with years of experience and ongoing training.' },
        { title: 'Quality materials', text: 'premium balancing materials and wheel weights that meet manufacturer standards.' },
        { title: 'Quick service time', text: 'most balancing jobs finish in about an hour.' },
        { title: 'Competitive pricing', text: 'transparent prices with no hidden fees.' },
        { title: 'Customer education', text: 'we explain the process and share tips to keep your tires performing.' } ] },
    ],
  },
});

svc({
  path: '/car-brake-service/', nav_label: 'Car Brake Service', sort_order: 13,
  title: 'Expert Car Brake Pads Repair and Replacement in DIP, Dubai',
  meta_description: 'Expert brake repair, brake pad replacement and brake service at our Dubai Investment Park garage – top-quality care for your safety.',
  h1: 'Car Brake Repair Services in DIP, Dubai', subtitle: 'Your safety is our priority.',
  content: {
    intro: ['Brakes are the most critical safety component of your car, and even a minor fault creates risk. We offer brake repair and maintenance in Dubai with certified technicians, diagnostic equipment and premium parts for all makes and models.'],
    sections: [
      { heading: 'Signs your car requires professional brake repair', bullets: [
        'You have to press the pedal harder than usual', 'The pedal feels soft or spongy', 'The car pulls to one side when braking',
        'Unusual noises or vibration', 'Longer stopping distances', 'Brake-related dashboard warning lights' ] },
      { heading: 'How we can help', bullets: [
        { title: 'Professional brake system diagnostics', text: 'full inspection of pad wear, rotor condition, fluid levels and system pressure.' },
        { title: 'Complete brake repair services', text: 'from simple pad replacements to hydraulic system overhauls, tested after every repair.' },
        { title: 'Brake pad replacement', text: 'premium pads matched to your vehicle and driving style, with bedding procedures.' },
        { title: 'Rotor service and replacement', text: 'machined to precision where feasible, replaced when necessary.' },
        { title: 'Emergency brake repairs', text: 'urgent brake issues handled as they arise.' },
        { title: 'Quality parts and materials', text: 'only parts from reliable suppliers.' } ] },
      { heading: 'Our brake service checklist', bullets: ['Full system inspection', 'Brake fluid analysis', 'Wear measurement', 'Hydraulic testing', 'Performance verification', 'Safety certification'] },
      { heading: 'Count on us for every brake service', paragraphs: ['Master Mechanics is a go-to choice for brake maintenance and repair in Dubai Investment Park, with a focus on quality, safety and customer satisfaction.'] },
    ],
  },
});

svc({
  path: '/car-electrical-repair/', nav_label: 'Electric Repair Service', sort_order: 14, card_image: '/images/master-mechanics-garage-car-electrical-repair-dubai-dip.png',
  title: 'Car Electrical, Battery Repair & Replacement in DIP, Dubai',
  meta_description: 'For reliable and affordable car electrical repair in Dubai Investment Park, trust Master Mechanics – get back on the road fast.',
  h1: 'Car Electrical Repair in DIP, Dubai', subtitle: 'Trust us to deal with the growing complexity of modern vehicle electronics.',
  content: {
    intro: ['Modern cars rely on complex electrical systems that control everything from safety features to engine performance. Master Mechanics has the knowledge, diagnostic equipment and experience to handle everything from simple battery replacements to computer system diagnostics.'],
    sections: [
      { heading: 'Battery and charging systems', bullets: ['Battery performance and lifespan', 'Alternator efficiency', 'Voltage regulator function', 'Starter motor problems', 'Charging system cables'] },
      { heading: 'Lighting and accessory systems', bullets: ['Headlight and taillight faults', 'Interior lighting', 'Power windows', 'Central locking', 'Entertainment system problems'] },
      { heading: 'Engine management systems', bullets: ['Check engine light issues', 'Sensor malfunctions', 'ECU programming', 'Fuel injection electronics', 'Ignition system problems'] },
      { heading: 'Advanced safety features', bullets: ['ABS electronics', 'Traction control', 'Airbag components', 'Parking sensors', 'Backup camera malfunctions'] },
      { heading: 'Why choose Master Mechanics?', bullets: [
        { title: 'Expert technicians', text: 'certified professionals with automotive electrical experience and ongoing training.' },
        { title: 'State-of-the-art equipment', text: 'advanced tools to find faults, program components and monitor performance.' },
        { title: 'Comprehensive solutions', text: 'thorough diagnostics, clear explanations, quality parts and post-repair testing.' },
        { title: 'Comprehensive testing', text: 'load testing, voltage-drop testing and full system scans after each repair.' },
        { title: 'Transparent pricing', text: 'upfront estimates, no hidden charges or unnecessary repairs.' },
        { title: 'Emergency services', text: 'an emergency team for electrical problems at any time.' },
        { title: 'Customer support', text: 'support from first contact through completion, with regular updates.' },
        { title: 'Warranty protection', text: 'all electrical repairs include warranty coverage.' } ] },
    ],
  },
});

svc({
  path: '/engine-repair-service/', nav_label: 'Engine Repair', sort_order: 15, card_image: '/images/master-mechanics-garage-car-engine-repair-dubai-dip.jpg',
  title: 'Car Engine Diagnostics, Repair and Overhaul Service in DIP',
  meta_description: 'We specialize in affordable car engine repair, oil changes, sensor and overheating repairs in Dubai Investment Park.',
  h1: 'Affordable Car Engine Repair Service Dubai Investment Park', subtitle: 'We are your trusted engine repair experts in DIP, Dubai.',
  content: {
    intro: ['Master Mechanics provides engine repair in Dubai with qualified technicians and a facility that handles sensor problems, overheating and routine oil changes.'],
    sections: [
      { heading: 'Comprehensive engine diagnostic services', bullets: ['Full computer scanning', 'Real-time performance monitoring', 'Sensor testing', 'Emissions analysis', 'Engine efficiency evaluation'] },
      { heading: 'Expert engine repair solutions', bullets: ['Engine mount repair', 'Sensor replacement', 'Overheating fixes', 'Complete overhauls', 'Timing belt replacement', 'Head gasket repair', 'Engine tuning'] },
      { heading: 'Oil change service', paragraphs: ['Choose synthetic or conventional oil with OEM-specified filters. Every oil change includes a multi-point inspection, fluid top-ups, used oil disposal and advice on change intervals.'] },
      { heading: 'Performance enhancement', bullets: ['Advanced tuning', 'Fuel system cleaning', 'Performance diagnostics', 'Power and fuel efficiency improvements', 'Custom tuning'] },
      { heading: 'Why choose Master Mechanics', bullets: ['24/7 emergency response', 'Quick diagnostics', 'Efficient repairs', 'Mobile service', 'Priority scheduling for urgent jobs'] },
      { heading: 'How our process works', bullets: [
        { title: '1. Get a quote', text: 'tell us about your car and the problem.' },
        { title: '2. Make a booking', text: 'approve the quote and book collection and delivery – or visit the service center in person.' },
        { title: '3. We repair', text: 'receive your repaired car.' } ] },
      { heading: 'Signs that your car engine needs your attention right away', bullets: ['Strange noises', 'Poor power', 'Engine light on', 'Increase in oil consumption'] },
    ],
  },
});

svc({
  path: '/injector-cleaning-service/', nav_label: 'Injector Cleaning Service', sort_order: 16, card_image: '/images/master-mechanics-garage-fuel-injector-service-dubai-dip.jpg',
  title: 'Best Car Fuel Injector Cleaning Service in Dubai Investment Park',
  meta_description: 'Get expert fuel injector cleaning services in DIP, Dubai. Improve engine performance, fuel economy & emissions with Master Mechanics.',
  h1: 'Best Car Fuel Injector Cleaning Service in DIP, Dubai', subtitle: "Optimize your engine's performance with affordable fuel injector services.",
  content: {
    intro: ['Master Mechanics offers complete fuel injector servicing in Dubai Investment Park to improve engine performance, fuel economy and emissions, using modern cleaning technology and diagnostic tools for all makes and models.'],
    sections: [
      { heading: 'Fuel injection system', paragraphs: ['An electronic fuel injection system uses sensors and control modules to time each injector’s opening and closing, delivering precise amounts of fuel to the cylinders. Injectors act as valves that meter fuel periodically rather than continuously, supporting combustion, power and efficiency.'] },
      { heading: 'Signs you need car fuel injector service in Dubai Investment Park', bullets: ['Rough idling', 'Poor acceleration', 'Lower fuel efficiency', 'Engine misfires', 'Failed emissions tests', 'Unusual engine noise', 'Hard starting', 'Visible black smoke'] },
      { heading: 'Fuel injector cleaning in Dubai & Abu Dhabi', paragraphs: ['Several factors can degrade engine performance, and injector wear is commonly overlooked. Our professionals combine current technology with experience to deliver fuel injector service in DIP.'] },
      { heading: 'Professional fuel injector diagnostic services', bullets: ['Electronic fuel system analysis', 'Pressure and flow testing', 'Individual injector evaluation', 'Spray pattern analysis', 'Leak detection', 'Real-time monitoring', 'Overall system efficiency assessment'] },
      { heading: 'Comprehensive cleaning solutions', bullets: ['Ultrasonic cleaning', 'Professional-grade cleaning solutions', 'Flow rate balancing', 'Spray pattern optimisation', 'Carbon deposit removal', 'Pressure regulation adjustment', 'Full system flushing', 'Individual injector servicing'] },
    ],
  },
});

svc({
  path: '/maintenance-service/', nav_label: 'Maintenance', sort_order: 17, card_image: '/images/master-mechanics-garage-car-maintenance-dubai-dip.jpg',
  title: 'Car Maintenance Services in DIP Dubai | Master Mechanics',
  meta_description: 'Affordable, expert car maintenance in DIP, Dubai by Master Mechanics – quality service, longer vehicle life and peace of mind.',
  h1: 'Car Maintenance Services in DIP, Dubai', subtitle: 'Trust Master Mechanics for premium vehicle maintenance at affordable cost.',
  content: {
    intro: ['Master Mechanics is a leading provider of routine car maintenance in DIP, Dubai. Regular maintenance is essential for your vehicle’s longevity and performance, and we pair technical expertise with superior customer service.'],
    sections: [
      { heading: 'What is car maintenance?', paragraphs: ['Maintenance is the set of tasks that keep your vehicle running safely and lasting longer – addressing wear, preventing breakdowns and preserving performance.'],
        bullets: ['Engine diagnostics and tuning', 'Oil and filter changes', 'Brake inspection', 'Transmission care', 'Coolant checks', 'Air conditioning service', 'Tire rotation and alignment', 'Battery checks', 'Electrical diagnostics'] },
      { heading: 'Benefits of regular maintenance with Master Mechanics', bullets: [
        { title: 'Extended vehicle life', text: 'regular care can significantly extend how long your car lasts.' },
        { title: 'Improved fuel efficiency', text: 'a well-tuned car uses less fuel.' },
        { title: 'Enhanced safety', text: 'reliable braking, blowout prevention and better handling.' },
        { title: 'Maintained resale value', text: 'a documented service history helps your car’s resale value.' },
        { title: 'Reduced repair costs', text: 'early detection of faults keeps repair bills down.' },
        { title: 'Peace of mind', text: 'a lower risk of roadside breakdowns.' } ] },
      { heading: 'Why Master Mechanics for car routine service maintenance in Dubai', bullets: [
        { title: 'Expert technicians', text: 'experienced on all makes and models.' },
        { title: 'State-of-the-art equipment', text: 'advanced diagnostic equipment.' },
        { title: 'Instant quotes', text: 'compare our prices with other providers.' },
        { title: 'Trusted service', text: 'a hassle-free service experience.' } ] },
      { heading: 'Comprehensive service packages under one roof', bullets: [
        { title: 'Basic', text: 'oil change, filter replacement and basic safety checks.' },
        { title: 'Intermediate', text: 'comprehensive system checks and preventive maintenance.' },
        { title: 'Full', text: 'complete inspection and maintenance.' },
        { title: 'Custom', text: 'tailored to your vehicle’s specific requirements.' } ] },
      { heading: 'Affordable vehicle maintenance without compromising quality', paragraphs: ['Our transparent pricing shows exactly what you pay for. Schedule your maintenance check today.'] },
    ],
  },
});

svc({
  path: '/repair-service/', nav_label: 'Repair Service', sort_order: 18, card_image: '/images/master-mechanics-garage-engine-sensor-repair-dubai.jpg',
  title: 'Expert Car Repair Services in DIP Dubai | Master Mechanics',
  meta_description: 'Premium car repair in Dubai Investment Park (DIP) with certified technicians, genuine parts and fast service – Master Mechanics.',
  h1: 'Expert Auto Repair Services in DIP, Dubai', subtitle: 'One-stop shop for professional car repairs at competitive prices.',
  content: {
    intro: ['Master Mechanics is a one-stop shop for car repairs in Dubai Investment Park, using modern facilities and certified technicians. We are the preferred choice of many local car owners.'],
    sections: [
      { heading: 'What we offer', paragraphs: ['Everything from routine adjustments to complex technical repairs, across all vehicle makes and models.'] },
      { heading: 'Our core auto repair services', bullets: ['Engine diagnostics and repair', 'Transmission service', 'Brake overhauls', 'Electrical repairs', 'AC service', 'Suspension and steering work', 'Computer diagnostics', 'Emergency repairs'] },
      { heading: 'Why choose Master Mechanics', bullets: [
        { title: 'Certified technicians', text: 'factory-trained and experienced.' },
        { title: 'Advanced diagnostic equipment', text: 'up-to-date tools for accurate fault finding.' },
        { title: 'Genuine parts', text: 'original-equipment quality parts.' },
        { title: 'Warranty protection', text: 'on repairs and replacement parts.' } ] },
      { heading: 'Our service excellence', bullets: [
        { title: 'Transparent communication', text: 'clear explanations of repairs and costs.' },
        { title: 'Quick turnaround', text: 'on-time delivery.' },
        { title: 'Customer convenience', text: 'pick-up and drop-off service.' },
        { title: '24/7 support', text: 'round-the-clock emergency support.' } ] },
      { heading: 'Why we’re the best car repair in Dubai', paragraphs: ['A satisfaction guarantee, transparent pricing, an experienced team, a modern facility, fast service and after-service support.'] },
      { heading: 'Our expert car repair process', bullets: [
        { title: 'Initial vehicle assessment', text: 'we listen to the problem and do a walk-around inspection.' },
        { title: 'Detailed diagnostic report', text: 'scanners read error codes and test affected systems to find the root cause.' },
        { title: 'Repair cost estimation', text: 'parts, labour and any additional issues are costed.' },
        { title: 'Client approval', text: 'we explain findings, options, timelines and costs before any work begins.' },
        { title: 'Quality repair execution', text: 'manufacturer-approved parts and standard procedures.' },
        { title: 'Final testing and quality check', text: 'the vehicle is tested, cleaned, documented in a final report and reviewed with you before handover.' } ] },
    ],
  },
});

/* ------------------------------------------------------------------ FAQ page, gallery */
export const faqs = [
  { question: 'Can I wax or wash my car after it’s been painted?',
    answer: 'Yes, most modern refinishes are cured when they come out of the oven. Auto body shops are equipped with car-sized ovens: the materials used to paint your vehicle are cured when heated at a certain temperature for a certain amount of time. When the vehicle comes out of the booth it may feel tacky but should be a workable surface immediately, including wet sand and polish. If you just picked up your vehicle after it has been painted or repaired, you can wash and wax it at your leisure. No shop should give you a vehicle back that cannot be washed. If they say you can’t wash or wax it for any period of time, they are likely using inferior techniques or products.' },
  { question: 'Why are my car’s bumper and fender a different color?',
    answer: 'There are many reasons why bumpers and adjacent panels (fenders, quarter panels) may look like different colors. The most common is that’s the way the factory made it. Painted parts are often finished at different facilities, so mixing, environment, stirring and spraying all affect the result. Paint on a plastic bumper next to a metal part can also look slightly different, especially with pearl paint, which can change how it looks in the sun.' },
  { question: 'How often should I rotate my tires?',
    answer: 'Your tires should be rotated every other oil change, or every 6,000 miles. Neglecting to rotate tires is a major cause of premature tire wear.' },
  { question: 'Should I consider using synthetic motor oil in my vehicle?',
    answer: 'Synthetic motor oils can be a good choice for high-output, turbocharged or supercharged engines, for vehicles used for towing (especially during hot weather), and for vehicles that operate in extremely cold or hot climates. Although more expensive than mineral-based oils, synthetic motor oils can improve fuel economy and provide longer intervals between changes.' },
  { question: 'What should I do if my car starts to overheat?',
    answer: 'This is a very serious problem – if your car overheats for too long, you can damage your engine. As soon as possible, find a safe place to pull off the road and shut the engine off. Do not attempt to check the fluid level in the radiator; the hot fluid can cause severe burns. The best thing to do is have your car towed to a trusted auto repair facility.' },
];

export const gallery = [
  { image: OG_DEFAULT, alt: 'Master Mechanics Garage LLC car service workshop in Dubai Investment Park', sort_order: 0 },
  ...[
    '2024/09/WhatsApp-Image-2024-09-15-at-19.41.05.jpeg',
    '2024/09/WhatsApp-Image-2024-09-15-at-19.41.02-1-1.jpeg', '2024/09/WhatsApp-Image-2024-09-15-at-19.41.01-2.jpeg',
    '2024/09/WhatsApp-Image-2024-09-15-at-19.41.04-1-1.jpeg', '2024/09/WhatsApp-Image-2024-09-15-at-19.41.00.jpeg',
    '2024/09/WhatsApp-Image-2024-09-15-at-19.41.04.jpeg', '2024/09/WhatsApp-Image-2024-09-15-at-19.41.03.jpeg',
    '2024/09/WhatsApp-Image-2024-09-15-at-19.40.59-2.jpeg', '2024/09/WhatsApp-Image-2024-09-15-at-19.40.59-1.jpeg',
    '2024/09/WhatsApp-Image-2024-09-15-at-19.41.00-1.jpeg',
  ].map((p, i) => ({
    image: mediaRedirects[`/wp-content/uploads/${p}`],
    alt: `Master Mechanics Garage LLC workshop photo ${i + 2}`,
    sort_order: i + 1,
  })),
];
