// Unique, short title/description/keywords per URL. Titles ≤60, descriptions ≤145.
// One primary phrase per page — no stuffing. Related links must exist in seed.

const AUTO = '/blog/%d0%b0uto-service';
const BMW_B = `${AUTO}/bmw-car-servicing-in-dubai-keep-your-bmw-in-top-condition/`;
const MERC_B = `${AUTO}/mercedes-car-servicing-in-dubai/`;
const AUDI_B = `${AUTO}/audi-car-servicing-in-dubai/`;
const WHEEL_B = '/blog/care-tips/why-regular-wheel-balancing-is-crucial-for-highway-driving/';
const CHECK_B = '/blog/care-tips/the-ultimate-vehicle-servicing-checklist-for-every-car-owner/';

function seo(title, desc, kw, related = []) {
  if (title.length > 60) throw new Error(`title ${title.length}: ${title}`);
  if (desc.length > 145) throw new Error(`desc ${desc.length}: ${desc}`);
  return { title, desc, kw, related };
}

export const overlay = {
  '/': seo(
    'Car Service DIP | Master Mechanics',
    'Independent car workshop in Dubai Investment Park. AC, brakes, engine and genuine parts.',
    'car service DIP, auto workshop DIP',
    ['/specializations/', '/services/', '/ac-repair-service/', '/maintenance-service/'],
  ),
  '/services/': seo(
    'Car Services DIP | Full Workshop',
    'Specific jobs in DIP 2: AC, cooling, brakes, clutch, belts, diagnostics and more.',
    'car services DIP, auto repair Dubai Investment Park',
    ['/maintenance-service/', '/specializations/', '/minor-car-service/', '/major-car-service/'],
  ),
  '/about/': seo(
    'About Master Mechanics | DIP Garage',
    'Independent garage in DIP 2. Certified techs, genuine parts, clear estimates before work.',
    'Master Mechanics DIP, car garage DIP 2',
    ['/contact/', '/specializations/', '/services/', '/careers/'],
  ),
  '/careers/': seo(
    'Careers DIP Garage | Master Mechanics',
    'Workshop jobs in Dubai Investment Park 2. Technicians and garage roles at Master Mechanics.',
    'garage jobs DIP, car mechanic jobs Dubai',
    ['/about/', '/contact/', '/specializations/'],
  ),
  '/spare-parts/': seo(
    'Genuine Spare Parts DIP | OEM Parts',
    'OEM and genuine car parts in DIP 2: filters, brakes, AC and engine. Fitted at our workshop.',
    'car spare parts DIP, genuine OEM parts Dubai',
    ['/oil-change-service/', '/car-brake-pad-replacement/', '/engine-repair-service/', '/specializations/'],
  ),
  '/faq/': seo(
    'Car Service FAQ | DIP Workshop',
    'Paint, tyres, oil and overheating questions answered by Master Mechanics in DIP.',
    'car service FAQ DIP',
    ['/contact/', '/booking/', '/blog/'],
  ),
  '/gallery/': seo(
    'Workshop Gallery | Master Mechanics DIP',
    'Photos from our Dubai Investment Park workshop and completed car repairs.',
    'car workshop photos DIP',
    ['/services/', '/contact/'],
  ),
  '/blog/': seo(
    'Car Care Blog | DIP Garage Tips',
    'Servicing checklists and brand guides for Dubai drivers from Master Mechanics.',
    'car care blog Dubai, DIP garage tips',
    ['/specializations/', '/maintenance-service/', CHECK_B],
  ),
  '/contact/': seo(
    'Contact Master Mechanics | DIP 2',
    'Visit Master Mechanics Garage LLC, Warehouse No. 49, Building No. 3, Span Precast Compound 71 Street, DIP 2, Dubai.',
    'Master Mechanics contact, garage DIP 2',
    ['/booking/', '/services/'],
  ),
  '/booking/': seo(
    'Book Car Service DIP | Appointment',
    'Request a booking for service or repair in Dubai Investment Park. We confirm by phone.',
    'book car service DIP',
    ['/contact/', '/maintenance-service/'],
  ),
  '/thank-you/': seo(
    'Thank You | Master Mechanics',
    'We received your request and will reply shortly from Master Mechanics DIP.',
    'Master Mechanics thank you',
    ['/'],
  ),
  '/workshop/': seo(
    'Auto Workshop DIP | Master Mechanics',
    'Full-service workshop in DIP 2 for brakes, oil, engines, injectors and programming.',
    'auto workshop DIP, car garage DIP 2',
    ['/services/', '/specializations/', '/oil-change-service/'],
  ),
  '/car-service-centre-in-dubai-investment-park-dip-auto-workshop/': seo(
    'DIP Auto Workshop | Car Service Centre',
    'Luxury and everyday car repair in Dubai Investment Park. Honest work, clear pricing.',
    'DIP auto workshop, car service centre DIP',
    ['/', '/services/', '/specializations/'],
  ),

  '/ac-repair-service/': seo(
    'Car AC Repair DIP | Gas Refill',
    'Car AC not cooling? Leak test, gas refill and compressor repair in Dubai Investment Park.',
    'car AC repair DIP, AC gas refill Dubai',
    ['/car-ac-gas-refill-and-repair/', '/car-radiator-repair/', '/car-overheating-repair/'],
  ),
  '/car-denting-painting-service/': seo(
    'Car Denting Painting DIP | Body Shop',
    'Dent repair, colour-matched paint and detailing in Dubai Investment Park.',
    'car denting painting DIP, car paint Dubai',
    ['/hail-damage-and-rust-repair/', '/car-detailing-ceramic-coating/', '/specializations/'],
  ),
  '/wheel-alignment-and-tire-balancing/': seo(
    'Wheel Alignment DIP | Tyre Balance',
    'Computerised wheel alignment and tyre balancing in DIP. Smoother ride, even wear.',
    'wheel alignment DIP, tyre balancing Dubai',
    ['/car-tyre-replacement/', '/suspension-and-steering-repair/', WHEEL_B],
  ),
  '/car-brake-service/': seo(
    'Car Brake Repair DIP | Pads & Discs',
    'Brake inspection, pad and disc replacement in Dubai Investment Park. Safety first.',
    'car brake repair DIP, brake pads Dubai',
    ['/car-brake-pad-replacement/', '/brake-fluid-change/', '/wheel-alignment-and-tire-balancing/'],
  ),
  '/car-electrical-repair/': seo(
    'Car Electrical Repair DIP | Battery',
    'Battery, alternator, wiring and module faults diagnosed in Dubai Investment Park.',
    'car electrical repair DIP, car battery Dubai',
    ['/alternator-repair/', '/starter-motor-repair/', '/car-key-programming/'],
  ),
  '/engine-repair-service/': seo(
    'Car Engine Repair DIP | Diagnostics',
    'Engine diagnosis, overheating and overhaul work in Dubai Investment Park.',
    'car engine repair DIP, engine diagnostics Dubai',
    ['/car-overheating-repair/', '/engine-overhaul-service/', '/timing-belt-replacement/'],
  ),
  '/injector-cleaning-service/': seo(
    'Fuel Injector Cleaning DIP | Dubai',
    'Injector clean and fuel-system service to restore idle and economy in DIP.',
    'fuel injector cleaning DIP, injector service Dubai',
    ['/throttle-body-cleaning/', '/spark-plug-replacement/', '/engine-repair-service/'],
  ),
  '/maintenance-service/': seo(
    'Car Maintenance DIP | Periodic Care',
    'Scheduled maintenance in Dubai Investment Park. Oil, filters, inspection, clear notes.',
    'car maintenance DIP, periodic car service Dubai',
    ['/minor-car-service/', '/major-car-service/', '/oil-change-service/'],
  ),
  '/repair-service/': seo(
    'Car Repair DIP | Independent Garage',
    'Mechanical repair for German, Japanese and American cars at our DIP 2 workshop. Diagnosis first.',
    'car repair DIP, auto repair Dubai Investment Park',
    ['/engine-repair-service/', '/car-gearbox-transmission-service/', '/specializations/'],
  ),

  '/ecu-programming-service/': seo(
    'ECU Programming DIP | Car Coding',
    'ECU coding, software updates and mapping after repairs. Workshop in DIP 2.',
    'ECU programming DIP, car coding Dubai',
    ['/car-key-programming/', '/car-computer-diagnostics/', '/car-electrical-repair/'],
  ),
  '/car-gearbox-transmission-service/': seo(
    'Gearbox Service DIP | Transmission',
    'Auto and manual gearbox fluid service and diagnostics in Dubai Investment Park.',
    'gearbox service DIP, transmission repair Dubai',
    ['/clutch-repair-service/', '/car-computer-diagnostics/', '/repair-service/'],
  ),
  '/suspension-and-steering-repair/': seo(
    'Suspension Repair DIP | Steering',
    'Shocks, bushes and steering repair in DIP. Alignment after the work so tyres wear evenly.',
    'suspension repair DIP, steering repair Dubai',
    ['/shock-absorber-replacement/', '/power-steering-repair/', '/wheel-alignment-and-tire-balancing/'],
  ),
  '/oil-change-service/': seo(
    'Oil Change DIP | Synthetic Oil',
    'Engine oil and filter change in Dubai Investment Park. Spec oil for your car.',
    'oil change DIP, car oil change Dubai',
    ['/minor-car-service/', '/maintenance-service/', CHECK_B],
  ),
  '/car-computer-diagnostics/': seo(
    'Car Diagnostics DIP | OBD Scan',
    'Computer scan and fault-finding in DIP before any repair. Written findings.',
    'car diagnostics DIP, OBD scan Dubai',
    ['/check-engine-light-diagnostics/', '/ecu-programming-service/', '/car-electrical-repair/'],
  ),
  '/car-battery-replacement/': seo(
    'Car Battery Replacement DIP',
    'Battery test and replacement in Dubai heat. Charging-system check included.',
    'car battery replacement DIP, car battery Dubai',
    ['/alternator-repair/', '/starter-motor-repair/', '/car-electrical-repair/'],
  ),
  '/car-detailing-ceramic-coating/': seo(
    'Car Detailing DIP | Ceramic Coat',
    'Interior clean, paint correction and ceramic coating in Dubai Investment Park.',
    'car detailing DIP, ceramic coating Dubai',
    ['/car-denting-painting-service/', '/hail-damage-and-rust-repair/'],
  ),
  '/hail-damage-and-rust-repair/': seo(
    'Hail Dent Repair DIP | Rust Fix',
    'Hail dents, rust and panel repair with colour-matched paint in our DIP workshop.',
    'hail damage repair DIP, rust repair Dubai',
    ['/car-denting-painting-service/', '/car-detailing-ceramic-coating/'],
  ),
  '/car-tyre-replacement/': seo(
    'Tyre Replacement DIP | Fitting',
    'New tyres fitted and balanced in Dubai Investment Park. Alignment check.',
    'tyre replacement DIP, tyre fitting Dubai',
    ['/wheel-alignment-and-tire-balancing/', '/suspension-and-steering-repair/', WHEEL_B],
  ),
  '/check-engine-light-diagnostics/': seo(
    'Check Engine Light DIP | Scan',
    'Check-engine light on? Scan, confirm the fault and estimate before repair.',
    'check engine light DIP, engine warning Dubai',
    ['/car-computer-diagnostics/', '/engine-repair-service/', '/car-electrical-repair/'],
  ),
  '/car-brake-pad-replacement/': seo(
    'Brake Pad Replacement DIP',
    'Brake pads and discs replaced after inspection. DIP workshop, quality parts.',
    'brake pad replacement DIP, brake discs Dubai',
    ['/car-brake-service/', '/maintenance-service/', '/car-tyre-replacement/'],
  ),
  '/pre-purchase-car-inspection/': seo(
    'Used Car Inspection DIP | Pre-Buy',
    'Scan, engine, gearbox, brakes, AC and body check before you buy. Workshop in DIP.',
    'pre-purchase inspection DIP, used car check Dubai',
    ['/car-computer-diagnostics/', '/rta-vehicle-inspection-service/', '/repair-service/'],
  ),
  '/rta-vehicle-inspection-service/': seo(
    'RTA Inspection Prep | DIP Garage',
    'Brakes, tyres, lights and scan before your RTA test. Fixes at our DIP workshop.',
    'RTA inspection check DIP, vehicle inspection Dubai',
    ['/car-brake-service/', '/car-computer-diagnostics/', '/car-tyre-replacement/'],
  ),
  '/pickup-and-drop-off-car-service/': seo(
    'Car Pick-up Service | DIP Workshop',
    'We collect and return your car for service in DIP. Confirm area on WhatsApp.',
    'car pick up drop off DIP, mobile car collection Dubai',
    ['/maintenance-service/', '/contact/', '/specializations/'],
  ),
  '/car-ac-gas-refill-and-repair/': seo(
    'Car AC Gas Refill DIP | Repair',
    'AC gas refill, leak test and cooling repair for Dubai summer. Workshop in DIP.',
    'car AC gas refill DIP, car AC not cooling',
    ['/ac-repair-service/', '/car-electrical-repair/', '/car-radiator-repair/'],
  ),

  '/car-radiator-repair/': seo(
    'Car Radiator Repair DIP | Cooling',
    'Radiator leak test, repair or replace in DIP. Coolant refill to spec for Dubai heat.',
    'car radiator repair DIP, radiator leak Dubai',
    ['/car-overheating-repair/', '/water-pump-replacement/', '/coolant-flush-service/'],
  ),
  '/car-overheating-repair/': seo(
    'Car Overheating Repair DIP',
    'Gauge in the red? We find radiator, pump, thermostat or fan faults in DIP 2.',
    'car overheating repair DIP, engine overheating Dubai',
    ['/car-radiator-repair/', '/water-pump-replacement/', '/thermostat-replacement/'],
  ),
  '/water-pump-replacement/': seo(
    'Water Pump Replacement DIP',
    'Leaking or noisy water pump replaced in DIP. Coolant bleed and belt check.',
    'water pump replacement DIP, water pump Dubai',
    ['/timing-belt-replacement/', '/car-overheating-repair/', '/coolant-flush-service/'],
  ),
  '/thermostat-replacement/': seo(
    'Car Thermostat Replacement DIP',
    'Stuck thermostat causing heat or a cold engine. Spec part fitted in DIP.',
    'car thermostat replacement DIP, thermostat Dubai',
    ['/car-overheating-repair/', '/water-pump-replacement/', '/car-radiator-repair/'],
  ),
  '/coolant-flush-service/': seo(
    'Coolant Flush DIP | Antifreeze',
    'Coolant flush and refill to manufacturer spec in Dubai Investment Park.',
    'coolant flush DIP, antifreeze change Dubai',
    ['/car-radiator-repair/', '/water-pump-replacement/', '/major-car-service/'],
  ),
  '/timing-belt-replacement/': seo(
    'Timing Belt Replacement DIP',
    'Timing belt and tensioner kit in DIP. Pump replaced when the job needs it.',
    'timing belt replacement DIP, timing belt Dubai',
    ['/water-pump-replacement/', '/engine-repair-service/', '/engine-overhaul-service/'],
  ),
  '/spark-plug-replacement/': seo(
    'Spark Plug Replacement DIP',
    'Spec spark plugs fitted in DIP. Misfire, hard start and economy checks.',
    'spark plug replacement DIP, spark plugs Dubai',
    ['/check-engine-light-diagnostics/', '/injector-cleaning-service/', '/minor-car-service/'],
  ),
  '/clutch-repair-service/': seo(
    'Clutch Repair DIP | Manual Cars',
    'Slipping or heavy clutch inspected and replaced in Dubai Investment Park.',
    'clutch repair DIP, clutch replacement Dubai',
    ['/car-gearbox-transmission-service/', '/repair-service/', '/engine-repair-service/'],
  ),
  '/alternator-repair/': seo(
    'Car Alternator Repair DIP',
    'Charging test and alternator repair in DIP. Battery checked at the same time.',
    'alternator repair DIP, car not charging Dubai',
    ['/car-battery-replacement/', '/starter-motor-repair/', '/serpentine-belt-replacement/'],
  ),
  '/starter-motor-repair/': seo(
    'Starter Motor Repair DIP',
    'Click and no crank? Starter test and replacement in Dubai Investment Park.',
    'starter motor repair DIP, car wont start Dubai',
    ['/car-battery-replacement/', '/alternator-repair/', '/car-key-programming/'],
  ),
  '/shock-absorber-replacement/': seo(
    'Shock Absorber Replacement DIP',
    'Worn shocks replaced in pairs in DIP. Alignment afterwards so the car sits and steers right.',
    'shock absorber replacement DIP, car shocks Dubai',
    ['/suspension-and-steering-repair/', '/wheel-alignment-and-tire-balancing/', '/car-tyre-replacement/'],
  ),
  '/power-steering-repair/': seo(
    'Power Steering Repair DIP',
    'Heavy or noisy steering. Pump, rack or electric-assist diagnosis in DIP.',
    'power steering repair DIP, steering pump Dubai',
    ['/suspension-and-steering-repair/', '/shock-absorber-replacement/', '/wheel-alignment-and-tire-balancing/'],
  ),
  '/exhaust-system-repair/': seo(
    'Car Exhaust Repair DIP',
    'Blowing exhaust, rattles and leaks repaired in DIP. RTA-related checks.',
    'car exhaust repair DIP, exhaust leak Dubai',
    ['/rta-vehicle-inspection-service/', '/check-engine-light-diagnostics/', '/engine-repair-service/'],
  ),
  '/throttle-body-cleaning/': seo(
    'Throttle Body Cleaning DIP',
    'Carbon clean and idle relearn in DIP. Fixes hunting idle and flat spots.',
    'throttle body cleaning DIP, dirty throttle Dubai',
    ['/injector-cleaning-service/', '/spark-plug-replacement/', '/check-engine-light-diagnostics/'],
  ),
  '/engine-overhaul-service/': seo(
    'Engine Overhaul DIP | Rebuild',
    'Engine strip, inspect and rebuild quote in DIP. Only the work the engine needs.',
    'engine overhaul DIP, engine rebuild Dubai',
    ['/engine-repair-service/', '/timing-belt-replacement/', '/car-overheating-repair/'],
  ),
  '/car-key-programming/': seo(
    'Car Key Programming DIP',
    'Spare keys and remotes coded in DIP for supported German, Japanese and US cars.',
    'car key programming DIP, immobiliser coding Dubai',
    ['/ecu-programming-service/', '/car-electrical-repair/', '/starter-motor-repair/'],
  ),
  '/serpentine-belt-replacement/': seo(
    'Serpentine Belt Replacement DIP',
    'Cracked drive belt and tensioner replaced in DIP before it snaps and strands you.',
    'serpentine belt replacement DIP, drive belt Dubai',
    ['/timing-belt-replacement/', '/alternator-repair/', '/ac-repair-service/'],
  ),
  '/minor-car-service/': seo(
    'Minor Car Service DIP | Oil Check',
    'Oil, filter and safety check in DIP. The interval between major services.',
    'minor car service DIP, interim service Dubai',
    ['/major-car-service/', '/oil-change-service/', '/spark-plug-replacement/'],
  ),
  '/major-car-service/': seo(
    'Major Car Service DIP | Full Service',
    'Oil, filters, plugs and fluid checks on your make’s schedule. Workshop in DIP 2.',
    'major car service DIP, full service Dubai',
    ['/minor-car-service/', '/maintenance-service/', '/rta-vehicle-inspection-service/'],
  ),
  '/brake-fluid-change/': seo(
    'Brake Fluid Change DIP',
    'Moisture test, flush and bleed in DIP. Protects ABS valves and a firm pedal.',
    'brake fluid change DIP, brake flush Dubai',
    ['/car-brake-service/', '/car-brake-pad-replacement/', '/major-car-service/'],
  ),

  '/specializations/': seo(
    'Car Specialists DIP | Makes We Service',
    'BMW, Mercedes, Audi, Toyota, Nissan and more. Independent specialists in DIP 2.',
    'car specialist DIP, German car specialist Dubai',
    ['/german-car-specialist-dip/', '/japanese-car-service-dip/', '/american-car-repair-dip/', '/services/'],
  ),
  '/german-car-specialist-dip/': seo(
    'German Car Specialist DIP | BMW Audi',
    'Independent BMW, Mercedes, Audi and MINI service in Dubai Investment Park.',
    'German car specialist DIP, BMW Mercedes Audi garage',
    ['/bmw-service-dubai/', '/mercedes-service-dubai/', '/audi-service-dubai/', '/mini-service-dubai/', BMW_B],
  ),
  '/japanese-car-service-dip/': seo(
    'Japanese Car Service DIP | Toyota',
    'Toyota, Nissan, Lexus, Honda, Mitsubishi, Infiniti, Suzuki and Mazda in DIP.',
    'Japanese car service DIP, Toyota garage Dubai',
    ['/toyota-service-dubai/', '/nissan-service-dubai/', '/lexus-service-dubai/', '/honda-service-dubai/'],
  ),
  '/american-car-repair-dip/': seo(
    'American Car Repair DIP | Ford GMC',
    'Ford, Chevrolet and GMC service in Dubai Investment Park. AC, brakes, gearbox and electrics.',
    'American car repair DIP, Ford GMC garage Dubai',
    ['/ford-service-dubai/', '/chevrolet-service-dubai/', '/gmc-service-dubai/'],
  ),

  '/blog/category/care-tips/': seo(
    'Car Care Tips | DIP Garage Blog',
    'Practical care tips for Dubai heat, tyres, oil and servicing from Master Mechanics.',
    'car care tips Dubai, DIP garage blog',
    ['/blog/', WHEEL_B, CHECK_B],
  ),
  '/blog/category/maintenance/': seo(
    'Car Maintenance Guides | DIP Blog',
    'Maintenance articles for Dubai drivers. Oil, service intervals and checks.',
    'car maintenance guides Dubai',
    ['/blog/', '/maintenance-service/', '/oil-change-service/'],
  ),
  '/blog/category/uncategorized/': seo(
    'Garage Notes | Master Mechanics Blog',
    'Workshop notes and updates from Master Mechanics in Dubai Investment Park.',
    'Master Mechanics blog',
    ['/blog/', '/services/'],
  ),
  '/blog/category/\u0430uto-service/': seo(
    'Auto Service Guides | Brand Care',
    'BMW, Mercedes and Audi servicing notes from our independent DIP workshop in Dubai.',
    'auto service blog Dubai, BMW Mercedes Audi service',
    ['/blog/', '/specializations/', BMW_B],
  ),
};

export const brandSeo = {
  'bmw-service-dubai': seo(
    'BMW Specialist DIP | Independent Service',
    'BMW service in DIP. Cooling, oil leaks, AC and coding. ISTA-style diagnostics on site.',
    'BMW specialist DIP, BMW service Dubai',
    ['/german-car-specialist-dip/', '/mercedes-service-dubai/', '/audi-service-dubai/', '/mini-service-dubai/'],
  ),
  'mercedes-service-dubai': seo(
    'Mercedes Specialist DIP | Independent',
    'Mercedes-Benz service in DIP. Air suspension, AC, gearbox and electrics.',
    'Mercedes specialist DIP, Mercedes service Dubai',
    ['/german-car-specialist-dip/', '/bmw-service-dubai/', '/audi-service-dubai/', '/mini-service-dubai/'],
  ),
  'audi-service-dubai': seo(
    'Audi Specialist DIP | VAG Service',
    'Independent Audi service in DIP. DSG, oil use, cooling and direct-injection care on site.',
    'Audi specialist DIP, Audi service Dubai',
    ['/german-car-specialist-dip/', '/bmw-service-dubai/', '/mercedes-service-dubai/', '/mini-service-dubai/'],
  ),
  'toyota-service-dubai': seo(
    'Toyota Service DIP | Prado & Camry',
    'Toyota service in DIP. Land Cruiser, Prado, Camry, Hilux. AC, brakes, service.',
    'Toyota service DIP, Land Cruiser service Dubai',
    ['/japanese-car-service-dip/', '/nissan-service-dubai/', '/lexus-service-dubai/', '/honda-service-dubai/'],
  ),
  'nissan-service-dubai': seo(
    'Nissan Patrol Service | DIP Dubai',
    'Nissan service in DIP. Patrol, Altima, X-Trail. CVT, AC and suspension.',
    'Nissan Patrol service DIP, Nissan garage Dubai',
    ['/japanese-car-service-dip/', '/toyota-service-dubai/', '/infiniti-service-dubai/', '/mitsubishi-service-dubai/'],
  ),
  'lexus-service-dubai': seo(
    'Lexus Service DIP | Independent Repair',
    'Lexus ES, RX, LX service in DIP. AC, brakes, electrics and scheduled care.',
    'Lexus service DIP, Lexus repair Dubai',
    ['/japanese-car-service-dip/', '/toyota-service-dubai/', '/honda-service-dubai/', '/infiniti-service-dubai/'],
  ),
  'honda-service-dubai': seo(
    'Honda Service DIP | Civic & Accord',
    'Honda service in DIP. Civic, Accord, CR-V. AC, battery and routine oils.',
    'Honda service DIP, Civic Accord garage Dubai',
    ['/japanese-car-service-dip/', '/toyota-service-dubai/', '/mazda-service-dubai/', '/suzuki-service-dubai/'],
  ),
  'ford-service-dubai': seo(
    'Ford Service DIP | F-150 Explorer',
    'Ford service in DIP. F-150, Explorer, Mustang. Gearbox, AC and brakes.',
    'Ford service DIP, F-150 repair Dubai',
    ['/american-car-repair-dip/', '/chevrolet-service-dubai/', '/gmc-service-dubai/', '/specializations/'],
  ),
  'chevrolet-service-dubai': seo(
    'Chevrolet Service DIP | Tahoe',
    'Chevrolet Tahoe, Suburban and Silverado service in Dubai Investment Park.',
    'Chevrolet service DIP, Tahoe repair Dubai',
    ['/american-car-repair-dip/', '/ford-service-dubai/', '/gmc-service-dubai/', '/specializations/'],
  ),
  'gmc-service-dubai': seo(
    'GMC Yukon Service | DIP Dubai',
    'GMC Yukon, Sierra and Acadia service in DIP. AC, brakes and electrics.',
    'GMC service DIP, Yukon repair Dubai',
    ['/american-car-repair-dip/', '/chevrolet-service-dubai/', '/ford-service-dubai/', '/specializations/'],
  ),
  'mitsubishi-service-dubai': seo(
    'Mitsubishi Pajero Service | DIP',
    'Pajero, L200 and Outlander service in DIP. AC, suspension, brakes and scheduled oil.',
    'Mitsubishi Pajero service DIP, L200 garage Dubai',
    ['/japanese-car-service-dip/', '/toyota-service-dubai/', '/nissan-service-dubai/', '/suzuki-service-dubai/'],
  ),
  'infiniti-service-dubai': seo(
    'Infiniti Service DIP | QX Repair',
    'Infiniti Q50 and QX service in DIP. CVT, AC and electrical diagnostics.',
    'Infiniti service DIP, QX80 repair Dubai',
    ['/japanese-car-service-dip/', '/nissan-service-dubai/', '/lexus-service-dubai/', '/toyota-service-dubai/'],
  ),
  'suzuki-service-dubai': seo(
    'Suzuki Service DIP | Swift Jimny',
    'Suzuki Swift, Jimny and Vitara service in DIP. AC, brakes, oil and inspection.',
    'Suzuki service DIP, Jimny garage Dubai',
    ['/japanese-car-service-dip/', '/toyota-service-dubai/', '/honda-service-dubai/', '/mazda-service-dubai/'],
  ),
  'mini-service-dubai': seo(
    'MINI Cooper Service | DIP Dubai',
    'MINI Cooper and Countryman service in DIP. Cooling, oil leaks, AC and electrics.',
    'MINI Cooper service DIP, MINI garage Dubai',
    ['/german-car-specialist-dip/', '/bmw-service-dubai/', '/audi-service-dubai/', '/mercedes-service-dubai/'],
  ),
  'mazda-service-dubai': seo(
    'Mazda Service DIP | Independent',
    'Mazda service in DIP. AC, brakes and scheduled maintenance for CX and Mazda3.',
    'Mazda service DIP, Mazda garage Dubai',
    ['/japanese-car-service-dip/', '/toyota-service-dubai/', '/honda-service-dubai/', '/suzuki-service-dubai/'],
  ),
};

export const brandLogos = {
  'bmw-service-dubai': '/images/master-mechanics-garage-bmw-service-dubai.jpg',
  'mercedes-service-dubai': '/images/master-mechanics-garage-mercedes-benz-service-dubai.jpg',
  'audi-service-dubai': '/images/master-mechanics-garage-audi-service-dubai.png',
  'toyota-service-dubai': '/images/master-mechanics-garage-toyota-service-dubai.png',
  'nissan-service-dubai': '/images/master-mechanics-garage-nissan-service-dubai.png',
  'lexus-service-dubai': '/images/master-mechanics-garage-lexus-service-dubai.png',
  'honda-service-dubai': '/images/master-mechanics-garage-honda-service-dubai.png',
  'ford-service-dubai': '/images/master-mechanics-garage-ford-service-dubai.png',
  'chevrolet-service-dubai': '/images/master-mechanics-garage-chevrolet-service-dubai.jpg',
  'gmc-service-dubai': '/images/master-mechanics-garage-gmc-service-dubai.avif',
  'mitsubishi-service-dubai': '/images/master-mechanics-garage-mitsubishi-service-dubai.png',
  'infiniti-service-dubai': '/images/master-mechanics-garage-infiniti-service-dubai.png',
  'suzuki-service-dubai': '/images/master-mechanics-garage-suzuki-service-dubai.png',
  'mini-service-dubai': '/images/master-mechanics-garage-mini-cooper-service-dubai.jpg',
  'mazda-service-dubai': '/images/master-mechanics-garage-mazda-service-dubai.png',
};

const areaSeo = (area, slugHint) => seo(
  `Car Service ${area} | DIP`.slice(0, 60),
  `Car service near ${area}. Workshop in Dubai Investment Park 2. AC, brakes, service.`,
  `car service ${area}, garage near ${area}`,
  ['/specializations/', '/maintenance-service/', '/ac-repair-service/', '/contact/'],
);

export const areaTitles = {
  'car-service-dubai-investment-park': seo(
    'Garage in DIP 2 | Car Service Park',
    'Car service inside Dubai Investment Park 2. AC, brakes, engine and genuine parts.',
    'garage DIP 2, car service Dubai Investment Park',
    ['/', '/specializations/', '/maintenance-service/', '/ac-repair-service/'],
  ),
  'car-repair-south-dubai': seo(
    'Car Repair South Dubai | DIP Shop',
    'South Dubai car repair from our DIP workshop. Diagnostics, AC and servicing.',
    'car repair South Dubai, auto service South Dubai',
    ['/repair-service/', '/specializations/', '/car-computer-diagnostics/'],
  ),
  'car-service-jebel-ali': areaSeo('Jebel Ali'),
  'car-service-dubai-south': areaSeo('Dubai South'),
  'car-service-arabian-ranches': areaSeo('Arabian Ranches'),
  'car-service-dubai-marina': areaSeo('Dubai Marina'),
  'car-service-jumeirah-village-circle': seo(
    'Car Service JVC | DIP Workshop',
    'JVC car service from Master Mechanics in nearby DIP. Estimates before work.',
    'car service JVC, garage Jumeirah Village Circle',
    ['/specializations/', '/maintenance-service/', '/ac-repair-service/', '/contact/'],
  ),
  'car-service-mudon': areaSeo('Mudon'),
  'car-service-dubai-sports-city': areaSeo('Sports City'),
  'car-service-al-barsha': areaSeo('Al Barsha'),
  'car-service-green-community': seo(
    'Car Service Green Community | DIP',
    'Closest full workshop for Green Community. Service, AC and brakes in DIP 2.',
    'car service Green Community, garage DIP',
    ['/', '/ac-repair-service/', '/maintenance-service/'],
  ),
  'car-service-remraam': areaSeo('Remraam'),
  'car-service-dubai-industrial-city': areaSeo('Industrial City'),
  'car-service-al-furjan': areaSeo('Al Furjan'),
};

export const postOverlay = {
  [BMW_B]: seo(
    'BMW Servicing Dubai | DIP Guide',
    'How we service BMWs in Dubai heat. Cooling, oil and AC. Independent DIP workshop.',
    'BMW servicing Dubai, BMW garage DIP',
    ['/bmw-service-dubai/', '/german-car-specialist-dip/', '/ac-repair-service/'],
  ),
  [MERC_B]: seo(
    'Mercedes Servicing Dubai | DIP',
    'Independent Mercedes service notes for Dubai. Suspension, AC and gearbox care.',
    'Mercedes servicing Dubai, Mercedes garage DIP',
    ['/mercedes-service-dubai/', '/german-car-specialist-dip/', '/car-gearbox-transmission-service/'],
  ),
  [AUDI_B]: seo(
    'Audi Servicing Dubai | DIP Guide',
    'Audi service in Dubai: oil, DSG and cooling. Independent workshop in DIP.',
    'Audi servicing Dubai, Audi garage DIP',
    ['/audi-service-dubai/', '/german-car-specialist-dip/', '/oil-change-service/'],
  ),
  [WHEEL_B]: seo(
    'Wheel Balancing Dubai | Highway Tips',
    'Why unbalanced wheels shake at speed. Balancing and alignment in DIP.',
    'wheel balancing Dubai, tyre vibration highway',
    ['/wheel-alignment-and-tire-balancing/', '/car-tyre-replacement/', '/suspension-and-steering-repair/'],
  ),
  [CHECK_B]: seo(
    'Car Service Checklist | Dubai Owners',
    'What to check at each service in Dubai heat. Oil, filters, brakes and AC.',
    'car service checklist Dubai, vehicle servicing list',
    ['/maintenance-service/', '/oil-change-service/', '/specializations/'],
  ),
};

/** Unique short SEO for every blog slug (WordPress titles were too long for SERPs). */
export const postSeoBySlug = {
  'bmw-car-servicing-in-dubai-keep-your-bmw-in-top-condition': postOverlay[BMW_B],
  'mercedes-car-servicing-in-dubai': postOverlay[MERC_B],
  'audi-car-servicing-in-dubai': postOverlay[AUDI_B],
  'why-regular-wheel-balancing-is-crucial-for-highway-driving': postOverlay[WHEEL_B],
  'the-ultimate-vehicle-servicing-checklist-for-every-car-owner': postOverlay[CHECK_B],
  'performance-parts-that-can-instantly-upgrade-your-ride': seo(
    'Performance Parts Dubai | DIP Fit',
    'Sensible performance parts that survive Dubai heat. Independent fitment in DIP.',
    'performance parts Dubai, DIP garage upgrades',
  ),
  '5-signs-that-indicate-its-time-to-repaint-your-car': seo(
    'Car Repaint Signs | Dubai Guide',
    'Fading, chips and rust that mean a respray. Paint work from our DIP workshop.',
    'car repaint Dubai, when to respray car',
  ),
  'prepare-your-car-for-summer-road-trips-with-vehicle-maintenance': seo(
    'Summer Car Prep Dubai | DIP',
    'Cooling, tyres and AC checks before a UAE summer trip. Book in DIP.',
    'summer car prep Dubai, road trip car check',
  ),
  'how-affordable-tire-balancing-can-extend-the-life-of-your-tires': seo(
    'Affordable Tire Balancing | Dubai',
    'Cheap vibration now costs tyres later. Balancing in Dubai Investment Park.',
    'affordable tire balancing Dubai, tyre life DIP',
  ),
  'the-hidden-benefits-of-regular-fuel-injector-maintenance': seo(
    'Fuel Injector Care | Dubai DIP',
    'Why injectors clog in Dubai traffic. Cleaning restores idle and pull.',
    'fuel injector care Dubai, injector cleaning DIP',
  ),
  'maximise-tire-life-with-regular-balancing': seo(
    'Maximise Tire Life | Dubai Tips',
    'Balance and rotate on time so Dubai heat does not eat the shoulders.',
    'maximise tire life Dubai, tyre rotation DIP',
  ),
  'explore-why-timely-brake-pad-replacement-is-critical-for-safety': seo(
    'Brake Pad Timing | Dubai Safety',
    'How long pads last in Dubai stop-start traffic and when to replace them.',
    'brake pad timing Dubai, brake safety DIP',
  ),
  'what-every-driver-should-know-about-cooling-system-repair': seo(
    'Cooling System Repair | Dubai',
    'Overheating in UAE heat. Radiator, pump and thermostat checks in DIP.',
    'cooling system repair Dubai, overheating DIP',
  ),
  'common-car-maintenance-mistakes-and-how-to-avoid-them': seo(
    'Car Maintenance Mistakes | Dubai',
    'Skipped oil, cheap pads and ignored lights. What Dubai drivers get wrong.',
    'car maintenance mistakes Dubai, garage tips DIP',
  ),
  'best-practices-for-extending-the-life-of-your-car-engine': seo(
    'Engine Life Tips | Dubai Heat',
    'Oil grade, cooling and idle habits that keep engines alive in Dubai.',
    'engine life tips Dubai, engine care DIP',
  ),
  'what-happens-to-your-car-if-you-dont-change-your-engine-oil-on-time': seo(
    'Late Oil Change Risks | Dubai',
    'What sludge and heat do when oil is overdue. Change it in DIP.',
    'late oil change Dubai, overdue oil risks',
  ),
  'why-ignoring-minor-engine-issues-can-lead-to-major-repairs': seo(
    'Minor Engine Issues | DIP Garage',
    'Small knocks and leaks that become rebuilds. Diagnose early in DIP.',
    'minor engine issues Dubai, engine knock DIP',
  ),
  'the-complete-car-detailing-procedure-from-interior-cleaning-to-ceramic-coating': seo(
    'Car Detailing Steps | Dubai DIP',
    'Interior, paint correction and ceramic coating steps at our DIP shop.',
    'car detailing steps Dubai, ceramic coating DIP',
  ),
  '5-signs-you-need-professional-car-dent-repair-asap': seo(
    'Dent Repair Signs | Dubai ASAP',
    'Creases, paint cracks and rust starting at a dent. Repair in DIP.',
    'dent repair signs Dubai, car dent ASAP DIP',
  ),
  'how-often-should-you-get-your-brakes-checked-a-complete-guide-to-brake-maintenance': seo(
    'Brake Check Interval | Dubai',
    'How often to inspect pads and fluid in Dubai traffic. DIP workshop.',
    'brake check interval Dubai, brake maintenance DIP',
  ),
  'essential-services-offered-by-a-professional-car-service-centre': seo(
    'Service Centre Jobs | DIP List',
    'Oil, brakes, AC, diagnostics and more. What a DIP workshop actually does.',
    'service centre jobs Dubai, DIP garage list',
  ),
  'how-a-car-painting-service-can-instantly-boost-your-vehicles-appeal': seo(
    'Car Paint Appeal | Dubai Shop',
    'Colour-matched respray vs polish. When paint work is worth it in Dubai.',
    'car paint appeal Dubai, respray DIP',
  ),
  'what-is-a-fuel-injector-service-and-why-does-your-car-need-it': seo(
    'Fuel Injector Service | Dubai',
    'What injector service includes and when Dubai cars need it. Done in DIP.',
    'fuel injector service Dubai, injector flush DIP',
  ),
  'common-car-problems-only-an-expert-repair-service-can-fix': seo(
    'Expert Car Repair | Dubai Issues',
    'Intermittent electrics, overheating and gearbox faults need workshop tools.',
    'expert car repair Dubai, hard faults DIP',
  ),
  'when-and-how-often-should-you-balance-your-tires': seo(
    'How Often to Balance Tires',
    'Balance after new tyres and when you feel a shake. DIP fitting bay.',
    'how often balance tires Dubai, tyre shake DIP',
  ),
  'how-to-choose-a-reliable-service-for-engine-sensor-repair': seo(
    'Engine Sensor Repair | Dubai',
    'Scan first, then replace the right sensor. Independent diagnostics in DIP.',
    'engine sensor repair Dubai, O2 sensor DIP',
  ),
  'why-car-engine-service-should-be-part-of-your-regular-car-care-routine': seo(
    'Regular Engine Service | Dubai',
    'Why oil, filters and cooling belong on a Dubai service plan. DIP shop.',
    'regular engine service Dubai, engine plan DIP',
  ),
  'why-professional-cooling-system-repair-is-worth-it': seo(
    'Pro Cooling Repair | Dubai Heat',
    'Pressure test, flush and parts that last. Cooling repair in DIP.',
    'pro cooling repair Dubai, radiator work DIP',
  ),
  'why-car-detailing-increases-your-vehicles-resale-value': seo(
    'Detailing Resale Value | Dubai',
    'Clean paint and cabin that buyers notice. Detailing in DIP before sale.',
    'detailing resale value Dubai, ceramic before sale',
  ),
  'how-expert-car-repair-services-improve-vehicle-lifespan': seo(
    'Repair vs Lifespan | DIP Garage',
    'Fixing leaks and sensors early vs waiting. Independent repair in DIP.',
    'car repair lifespan Dubai, DIP garage care',
  ),
  'the-importance-of-timely-brake-pad-replacement-for-your-safety': seo(
    'Timely Brake Pads | Dubai',
    'Squeal, grind and long pedal. Pad replacement in Dubai Investment Park.',
    'timely brake pads Dubai, brake squeal DIP',
  ),
  'how-expert-wheel-balancing-improves-vehicle-safety': seo(
    'Wheel Balancing Safety | Dubai',
    'Vibration at speed is a safety issue. Balance and alignment in DIP.',
    'wheel balancing safety Dubai, steering shake DIP',
  ),
  'common-car-problems-that-an-auto-workshop-can-solve-efficiently': seo(
    'Auto Workshop Fixes | DIP Dubai',
    'AC, batteries, brakes and scans a DIP workshop finishes the same day.',
    'auto workshop fixes Dubai, same day DIP jobs',
  ),
  'fuel-injector-calibration-for-peak-engine-performance': seo(
    'Injector Calibration | Dubai',
    'Flow-matched injectors for smooth idle. Calibration work in DIP.',
    'injector calibration Dubai, injector flow DIP',
  ),
  'how-to-choose-the-best-car-dent-repair-service': seo(
    'Choose Dent Repair | Dubai DIP',
    'PDR vs panel and paint. How to pick a dent shop in Dubai.',
    'choose dent repair Dubai, PDR vs paint DIP',
  ),
  'why-tire-balancing-matters-for-extended-tire-lifespan': seo(
    'Tire Balancing Lifespan | Dubai',
    'Unbalanced wheels cup the tread. Balance to keep tyre life in Dubai heat.',
    'tire balancing lifespan Dubai, cupping tyres DIP',
  ),
  'why-ignoring-engine-service-can-lead-to-catastrophic-failures': seo(
    'Skip Engine Service Risks | DIP',
    'Missed oil and cooling that seize engines. Service on time in DIP.',
    'skip engine service Dubai, engine seize DIP',
  ),
  'the-importance-of-diagnosing-electrical-issues-early-in-cars': seo(
    'Early Electrical Diagnosis | Dubai',
    'Parasitic drain and failing alternators. Electrical diagnosis in DIP.',
    'electrical diagnosis Dubai, car electrics DIP',
  ),
  'preventative-car-engine-services-every-driver-should-know': seo(
    'Preventative Engine Service | DIP',
    'Belts, coolant and oil that stop breakdowns. Preventative work in DIP.',
    'preventative engine service Dubai, belts coolant DIP',
  ),
  '5-signs-its-time-for-car-denting-and-painting-services': seo(
    'Denting Painting Signs | Dubai',
    'When a polish will not hide it. Denting and painting in DIP.',
    'denting painting signs Dubai, body shop DIP',
  ),
  'what-sets-the-best-auto-workshops-apart-from-the-rest': seo(
    'Best Auto Workshop | DIP Traits',
    'Diagnosis, written estimates and genuine parts. What to look for in DIP.',
    'best auto workshop DIP, how to choose garage',
  ),
  'a-complete-guide-to-fixing-your-cars-paint-after-dents-and-scratches': seo(
    'Paint After Dents | Dubai Guide',
    'Touch-up vs respray after dents and scratches. Body work in DIP.',
    'paint after dents Dubai, scratch repair DIP',
  ),
};

function firstKw(kw = '') {
  return String(kw).split(',')[0].trim();
}

const ANCHORS = {};
function remember(path, o) {
  if (path && o?.kw) ANCHORS[path] = firstKw(o.kw);
}
for (const [p, o] of Object.entries(overlay)) remember(p, o);
for (const [slug, o] of Object.entries(brandSeo)) remember(`/${slug}/`, o);
for (const [slug, o] of Object.entries(areaTitles)) remember(`/${slug}/`, o);
for (const [p, o] of Object.entries(postOverlay)) remember(p, o);

function fallbackAnchor(path) {
  const d = decodeURIComponent(path).replace(/\/$/, '');
  const last = d.split('/').pop() || '';
  let t = last.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  if (t.length > 42) t = t.split(' ').slice(0, 5).join(' ');
  if (!/dubai|dip/i.test(t)) t = `${t} Dubai`;
  return t;
}

export function searchAnchor(path) {
  if (!path) return '';
  const d = decodeURIComponent(path);
  return ANCHORS[path] || ANCHORS[d] || ANCHORS[`${d.endsWith('/') ? d : `${d}/`}`] || fallbackAnchor(path);
}

function labeled(related = []) {
  return related.slice(0, 4).map((href) => ({ href, text: searchAnchor(href) }));
}

function mergeRelated(content = {}, related = []) {
  if (!related.length) return { ...content, related: content.related || [], related_links: content.related_links || [] };
  const related_links = labeled(related);
  const sections = [...(content.sections || [])];
  const idx = sections.findIndex((s) => /related/i.test(s.heading || ''));
  if (idx >= 0) sections[idx] = { ...sections[idx], heading: 'Related in Dubai', links: related, related_links };
  else sections.push({ heading: 'Related in Dubai', links: related, related_links });
  return { ...content, keywords: content.keywords, related, related_links, sections };
}

const POST_RELATED = [
  [/bmw/, ['/bmw-service-dubai/', '/german-car-specialist-dip/', '/ac-repair-service/']],
  [/mercedes/, ['/mercedes-service-dubai/', '/german-car-specialist-dip/', '/car-gearbox-transmission-service/']],
  [/audi/, ['/audi-service-dubai/', '/german-car-specialist-dip/', '/oil-change-service/']],
  [/brake/, ['/car-brake-service/', '/car-brake-pad-replacement/', '/brake-fluid-change/']],
  [/tire|tyre|wheel|balanc/, ['/wheel-alignment-and-tire-balancing/', '/car-tyre-replacement/', '/suspension-and-steering-repair/']],
  [/inject/, ['/injector-cleaning-service/', '/throttle-body-cleaning/', '/engine-repair-service/']],
  [/dent|paint|scratch/, ['/car-denting-painting-service/', '/hail-damage-and-rust-repair/', '/car-detailing-ceramic-coating/']],
  [/cool/, ['/ac-repair-service/', '/car-overheating-repair/', '/car-radiator-repair/']],
  [/electric/, ['/car-electrical-repair/', '/alternator-repair/', '/car-battery-replacement/']],
  [/oil/, ['/oil-change-service/', '/minor-car-service/', '/engine-repair-service/']],
  [/engine/, ['/engine-repair-service/', '/engine-overhaul-service/', '/oil-change-service/']],
  [/detail|ceramic/, ['/car-detailing-ceramic-coating/', '/car-denting-painting-service/']],
  [/sensor|diagnostic/, ['/car-computer-diagnostics/', '/check-engine-light-diagnostics/', '/engine-repair-service/']],
];

function relatedForPost(slug = '') {
  const s = String(slug).toLowerCase();
  for (const [re, links] of POST_RELATED) {
    if (re.test(s)) return links;
  }
  return ['/maintenance-service/', '/minor-car-service/', '/specializations/'];
}

export function applyPageSeo(page) {
  const slug = (page.path || '').replace(/^\/|\/$/g, '');
  const o = overlay[page.path] || brandSeo[slug] || areaTitles[slug];
  if (!o) return page;
  return {
    ...page,
    title: o.title,
    meta_description: o.desc,
    noindex: page.path === '/thank-you/' ? true : page.noindex,
    card_image: brandLogos[slug] || page.card_image,
    content: mergeRelated({ ...page.content, keywords: o.kw }, o.related),
  };
}

export function applyPostSeo(post) {
  const path = `/blog/${post.category_slug}/${post.slug}/`;
  const encoded = `/blog/${encodeURIComponent(post.category_slug).toLowerCase()}/${post.slug}/`;
  const o = postSeoBySlug[post.slug] || postOverlay[path] || postOverlay[encoded];
  const related = o?.related?.length ? o.related : relatedForPost(post.slug);
  const kw = o?.kw || `${fallbackAnchor(path).replace(/ dubai$/i, '')} Dubai`;
  remember(path, { kw });
  remember(encoded, { kw });
  let desc = o?.desc || post.meta_description;
  if (desc && desc.length < 70) {
    desc = `${desc.replace(/\.$/, '')}. Independent garage in DIP 2, Dubai.`;
  }
  return {
    ...post,
    ...(o ? { seo_title: o.title, meta_description: desc } : { ...(desc ? { meta_description: desc } : {}) }),
    content: mergeRelated({ ...(post.content || {}), keywords: kw }, related),
  };
}

export function overlayForPath(path) {
  const slug = (path || '').replace(/^\/|\/$/g, '');
  return overlay[path] || brandSeo[slug] || areaTitles[slug] || postOverlay[path] || null;
}
