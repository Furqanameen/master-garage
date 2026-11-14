import { brandSeo, brandLogos } from './seoOverlay.js';
import { extraServices } from './extraServices.js';

// NEW pages added to help the site rank: extra service pages, brand pages and area pages.
// Rules followed so these don't read as thin "doorway" pages:
//   - every page has its own intro, its own problem list and its own FAQ
//   - only claims that already appear on the live site (genuine parts, pick-up & drop-off, warranty, etc.)
//   - no invented prices, ratings, years in business or distances
// Please review each page, add real photos / prices / customer stories, and confirm anything marked "confirm".

const U = '/wp-content/uploads';
const WHY = [
  'Certified, experienced technicians',
  'Modern diagnostic equipment',
  'Genuine / OEM-quality parts',
  'Transparent estimates before any work starts',
  'Pick-up and drop-off service (confirm availability for your area on WhatsApp)',
];
const cta = (what) => ({ heading: `Book your ${what}`, paragraphs: ['Call us, message us on WhatsApp, or use the form below and our team will confirm a time that suits you. We are open Monday to Saturday, 9 AM to 7 PM, in Dubai Investment Park 2.'] });

/* ---------------------------------------------------------------- extra services */
const services = [
  { slug: 'ecu-programming-service', label: 'ECU Programming', h1: 'ECU Programming & Car Tuning in Dubai',
    title: 'ECU Programming & Car Tuning in Dubai | Master Mechanics DIP',
    desc: 'ECU programming, remapping and software updates in Dubai Investment Park. Improve performance and emissions with Master Mechanics.',
    intro: 'The ECU (engine control unit) decides how your engine delivers fuel, spark and boost. Master Mechanics offers ECU programming and software tuning to improve engine performance and emissions, and to restore correct operation after repairs or replacement.',
    signs: ['Flat throttle response or hesitation', 'A new or replaced ECU that needs coding', 'Persistent check-engine light after a repair', 'Fuel economy that has dropped without an obvious cause', 'Software updates recommended for your model'],
    does: ['Read and back up your original ECU data before any change', 'ECU programming, coding and software updates', 'Performance and emissions-focused tuning', 'Post-programming road test and diagnostic scan'],
    faq: [
      { q: 'Is ECU tuning safe for my engine?', a: 'When it is done carefully, with the original file backed up and the car tested afterwards, it is. We explain what will change before we start.' },
      { q: 'Can you reprogram an ECU after replacing it?', a: 'Yes. A replacement ECU usually needs coding and programming to match the car; we handle that in-house.' },
    ], related: ['/car-computer-diagnostics/', '/car-electrical-repair/', '/engine-repair-service/'] },
  { slug: 'car-gearbox-transmission-service', label: 'Gearbox & Transmission', h1: 'Gearbox & Transmission Service in Dubai',
    title: 'Gearbox & Transmission Service in Dubai Investment Park | Master Mechanics',
    desc: 'Automatic and manual gearbox service, fluid change and repair in Dubai Investment Park. Fix slipping, jerking and delayed shifts early.',
    intro: 'Your transmission works hard in Dubai’s heat and stop-start traffic. Regular fluid service and early diagnosis are far cheaper than a rebuild. Master Mechanics services and repairs automatic and manual gearboxes for German, Japanese, American and European cars.',
    signs: ['Slipping gears or delayed engagement', 'Harsh or jerky shifts', 'Whining, humming or clunking noises', 'Gearbox warning light on the dashboard', 'Dark or burnt-smelling transmission fluid'],
    does: ['Computer scan for transmission fault codes', 'Transmission fluid and filter service', 'Gearbox leak inspection and repair', 'Clutch and mechatronic/valve-body checks'],
    faq: [
      { q: 'How often should transmission fluid be changed?', a: 'Follow your manufacturer’s schedule, but in Dubai’s heat many owners benefit from checking it earlier. We can inspect your fluid and advise.' },
      { q: 'My car jerks when changing gear – is it serious?', a: 'It can be. It is often a fluid, sensor or software issue that is cheaper to fix early, so have it diagnosed rather than waiting.' },
    ], related: ['/car-computer-diagnostics/', '/repair-service/', '/oil-change-service/'] },
  { slug: 'suspension-and-steering-repair', label: 'Suspension & Steering', h1: 'Suspension & Steering Repair in Dubai',
    title: 'Suspension & Steering Repair in Dubai Investment Park | Master Mechanics',
    desc: 'Shock absorber, strut, bushing and steering repair in Dubai Investment Park. Restore a smooth, stable and safe ride.',
    intro: 'Worn suspension and steering parts make a car harder to control and wear tires out faster. Master Mechanics inspects and repairs shocks, struts, bushings, ball joints and steering components so your car handles the way it should.',
    signs: ['Knocking or clunking over bumps', 'Bouncy ride or nose-diving under braking', 'Steering that pulls, wanders or feels loose', 'Uneven tire wear', 'Vibration through the steering wheel'],
    does: ['Full suspension and steering inspection', 'Shock absorber and strut replacement', 'Bushing, ball joint and control arm replacement', 'Wheel alignment after repairs'],
    faq: [
      { q: 'How do I know if my shock absorbers are worn?', a: 'Common signs are a bouncy ride, nose-dive when braking, oil leaking from the shock body and uneven tire wear. We can check them on the lift.' },
      { q: 'Do I need an alignment after suspension work?', a: 'Usually yes – replacing suspension parts changes wheel angles, so an alignment protects your tires and handling.' },
    ], related: ['/wheel-alignment-and-tire-balancing/', '/car-brake-service/', '/car-tyre-replacement/'] },
  { slug: 'oil-change-service', label: 'Oil Change', h1: 'Car Oil Change Service in Dubai Investment Park',
    title: 'Oil Change Service in Dubai Investment Park | Synthetic & Conventional',
    desc: 'Fast oil and filter change in Dubai Investment Park – synthetic or conventional oil, OEM filters and a multi-point inspection.',
    intro: 'A fresh oil change is the simplest way to protect your engine. At Master Mechanics you can choose synthetic or conventional oil with OEM-specified filters, and every oil change includes a multi-point inspection.',
    signs: ['Oil change interval reached (by km or by time)', 'Dark, gritty oil on the dipstick', 'Engine noise or a rougher idle', 'Oil-pressure or service-due light on the dashboard', 'Frequent short trips or heavy stop-start driving'],
    does: ['Synthetic or conventional oil to your manufacturer’s specification', 'OEM-specified oil filter', 'Multi-point inspection and fluid top-ups', 'Responsible disposal of used oil and advice on your next interval'],
    faq: [
      { q: 'How often should I change my oil in Dubai?', a: 'It depends on your car and oil type. Many drivers change oil every 5,000 to 10,000 km; your owner’s manual and driving conditions should guide the final decision.' },
      { q: 'Is synthetic oil worth it?', a: 'It suits turbocharged and high-output engines and very hot climates, and can extend change intervals, though it costs more than mineral oil.' },
    ], related: ['/maintenance-service/', '/engine-repair-service/', '/blog/care-tips/the-ultimate-vehicle-servicing-checklist-for-every-car-owner/'] },
  { slug: 'car-battery-replacement', label: 'Battery Replacement', h1: 'Car Battery Test & Replacement in Dubai',
    title: 'Car Battery Replacement in Dubai Investment Park | Master Mechanics',
    desc: 'Battery testing, replacement and charging-system checks in Dubai Investment Park. Don’t get stranded by a heat-weakened battery.',
    intro: 'Dubai’s heat shortens battery life, and many failures come without warning. Master Mechanics tests your battery and charging system, replaces the battery when needed and checks that the alternator and starter are not the real cause.',
    signs: ['Slow or clicking start', 'Dim headlights or flickering dashboard', 'Battery warning light', 'Swollen case or corrosion around the terminals', 'Battery older than a few years in hot conditions'],
    does: ['Battery load and health test', 'Alternator, regulator and starter checks', 'Replacement with the correct battery for your vehicle', 'Registration/coding where the car requires it'],
    faq: [
      { q: 'How long does a car battery last in Dubai?', a: 'Heat shortens battery life compared with cooler climates, so annual testing after the first couple of years is a good habit.' },
      { q: 'Can a weak battery damage other parts?', a: 'A failing battery can strain the alternator and cause electrical faults in modern cars, so test early.' },
    ], related: ['/car-electrical-repair/', '/maintenance-service/', '/car-computer-diagnostics/'] },
  { slug: 'pre-purchase-car-inspection', label: 'Pre-Purchase Inspection', h1: 'Pre-Purchase Car Inspection in Dubai',
    title: 'Pre-Purchase Car Inspection in Dubai | Used Car Check – Master Mechanics',
    desc: 'Used-car inspection before you buy: computer scan, engine, gearbox, brakes, AC and body check in Dubai Investment Park.',
    intro: 'Buying a used car? A mechanical inspection before you pay can save you from hidden faults and help you negotiate. Master Mechanics checks the car’s mechanical, electrical and body condition and gives you a clear picture of what you are buying.',
    signs: ['You are buying a used car privately or from a dealer', 'The seller has limited service history', 'The car has been imported or re-sprayed', 'You want leverage to negotiate the price', 'You want a second opinion before committing'],
    does: ['Computer scan for stored fault codes', 'Engine, gearbox, brakes, suspension and AC checks', 'Fluid leaks, battery and electrical checks', 'Body, paint and accident-repair assessment', 'Clear summary of faults and likely repair needs'],
    faq: [
      { q: 'How long does a pre-purchase inspection take?', a: 'It depends on the car, but allow time for a proper check on the lift plus a scan and road test. Contact us to book a slot.' },
      { q: 'Can you inspect any make?', a: 'We work on German, European, Japanese and American vehicles. Tell us the make and model when you book.' },
    ], related: ['/car-computer-diagnostics/', '/rta-vehicle-inspection-service/', '/repair-service/'] },
  { slug: 'car-detailing-ceramic-coating', label: 'Detailing & Ceramic Coating', h1: 'Car Detailing & Ceramic Coating in Dubai Investment Park',
    title: 'Car Detailing & Ceramic Coating in Dubai Investment Park | Master Mechanics',
    desc: 'Interior deep cleaning, paint correction, clay bar treatment and ceramic coating in Dubai Investment Park.',
    intro: 'Detailing goes far beyond a wash. Master Mechanics offers interior deep cleaning, paint correction, clay bar treatment, exterior washing and ceramic coating to help protect paint from Dubai’s sun and dust.',
    signs: ['Dull, swirled or faded paint', 'Rough paint surface even after washing', 'Stained or odour-prone interior', 'A new car you want to protect', 'You are preparing a car for sale'],
    does: ['Exterior wash and clay bar treatment', 'Paint correction to reduce swirls and light scratches', 'Ceramic coating for long-lasting protection', 'Interior deep cleaning'],
    faq: [
      { q: 'What does ceramic coating do?', a: 'It forms a protective layer over the paint that helps resist UV, dirt and water spotting and makes the car easier to clean.' },
      { q: 'Can I wash my car right after painting?', a: 'Yes – see our FAQ page: modern paint is heat-cured, so a normal wash and wax is usually fine after collection.' },
    ], related: ['/car-denting-painting-service/', '/hail-damage-and-rust-repair/', '/faq/'] },
  { slug: 'car-computer-diagnostics', label: 'Computer Diagnostics', h1: 'Car Computer Diagnostics in Dubai Investment Park',
    title: 'Car Computer Diagnostics & Check Engine Light Scan in DIP, Dubai',
    desc: 'Full computer scan, check-engine-light diagnosis and live data analysis in Dubai Investment Park – find the real fault first.',
    intro: 'A warning light tells you something is wrong, not what. Master Mechanics uses modern diagnostic equipment to read fault codes, monitor live data and test sensors so we repair the real cause instead of guessing.',
    signs: ['Check engine, ABS, airbag or other warning lights', 'Rough idle, misfires or hesitation', 'Poor fuel economy', 'Car in limp mode', 'Intermittent faults that come and go'],
    does: ['Full-system computer scan', 'Live data and sensor testing', 'Emissions analysis', 'Written findings and repair estimate before any repair'],
    faq: [
      { q: 'Can I keep driving with the check engine light on?', a: 'A steady light is often not an emergency, but a flashing light or other symptoms (overheating, loss of power) mean you should stop and get it checked. When unsure, have it scanned.' },
      { q: 'Will a scan fix the problem?', a: 'A scan finds the cause; repair follows. We give you the findings and an estimate first.' },
    ], related: ['/engine-repair-service/', '/car-electrical-repair/', '/ecu-programming-service/'] },
  { slug: 'rta-vehicle-inspection-service', label: 'RTA Inspection Prep', h1: 'RTA Vehicle Inspection Preparation in Dubai',
    title: 'RTA Vehicle Inspection Check in Dubai Investment Park | Master Mechanics',
    desc: 'Get your car checked before the RTA technical inspection – brakes, tyres, lights, emissions and more – at Master Mechanics, DIP.',
    intro: 'A failed RTA technical inspection costs time. Master Mechanics checks the systems that matter – brakes, tyres, lights, emissions-related faults and more – so any problems are fixed before you go for approval.',
    signs: ['Your registration renewal and inspection are due', 'Warning lights are on', 'Worn tyres or weak brakes', 'Fluid leaks or exhaust smoke', 'You want to avoid a re-test'],
    does: ['Pre-inspection check of brakes, tyres, lights and steering', 'Computer scan for fault codes', 'Emissions-related diagnosis and repair', 'Repairs so your car is ready for inspection'],
    faq: [
      { q: 'Do you perform the official RTA test?', a: 'We check your car and repair issues ahead of the RTA technical inspection to help you get approval. Confirm the exact process with us when you book.' },
      { q: 'What commonly causes an inspection failure?', a: 'Worn tyres and brakes, lights not working, fluid leaks and emissions-related faults are common reasons.' },
    ], related: ['/car-brake-service/', '/car-computer-diagnostics/', '/car-tyre-replacement/'] },
  { slug: 'pickup-and-drop-off-car-service', label: 'Pick-up & Drop-off', h1: 'Car Service Pick-up & Drop-off in Dubai',
    title: 'Car Service Pick-up & Drop-off in Dubai | Master Mechanics Garage',
    desc: 'Skip the trip to the workshop: pick-up and drop-off car service from Master Mechanics Garage, Dubai Investment Park.',
    intro: 'Busy week? Master Mechanics offers pick-up and drop-off so your car can be serviced without you losing your day. Message us on WhatsApp with your location and we will confirm availability and timing.',
    signs: ['You can’t get to the workshop during opening hours', 'You live or work in South Dubai or nearby communities', 'Your car is not safe to drive far', 'You prefer to be updated by WhatsApp'],
    does: ['Collection of your car from an agreed address (confirm your area)', 'Diagnosis and a clear estimate before any repair', 'Repairs and quality check at our workshop', 'Delivery of your car back to your door'],
    faq: [
      { q: 'Is pick-up and drop-off free?', a: 'Our site advertises free pick-up and drop-off – please confirm current terms and coverage areas on WhatsApp.' },
      { q: 'Which areas do you cover?', a: 'We serve Dubai Investment Park and nearby communities such as Jebel Ali, Dubai South, Arabian Ranches, Dubai Marina, JVC, Mudon, Sports City and Al Barsha. Ask us about your address.' },
    ], related: ['/services/', '/maintenance-service/', '/repair-service/'] },
  { slug: 'hail-damage-and-rust-repair', label: 'Hail Damage & Rust Repair', h1: 'Hail Damage, Dent & Rust Repair in Dubai',
    title: 'Hail Damage, Dent & Rust Repair in Dubai Investment Park | Master Mechanics',
    desc: 'Paintless dent repair, hail damage, rust and collision repair with colour-matched paint in Dubai Investment Park.',
    intro: 'From hail dents to rust spots and collision damage, our body shop restores panels and paint with computerised colour matching and climate-controlled paint booths. We document the work with before-and-after photos.',
    signs: ['Dents from hail or minor collisions', 'Rust bubbles or flaking paint', 'Bumper scrapes and scratches', 'Colour mismatch after a previous repair', 'Insurance repair needed'],
    does: ['Paintless dent repair where possible, traditional body repair where needed', 'Rust treatment and panel repair', 'Colour-matched repainting', 'Quality inspection and before/after documentation'],
    faq: [
      { q: 'Can small dents be fixed without repainting?', a: 'Often yes, using paintless techniques – it depends on dent size, location and paint condition. We’ll inspect and advise.' },
      { q: 'Do you help with insurance claims?', a: 'Insurance claim assistance is part of our paint and body offering – ask us for details.' },
    ], related: ['/car-denting-painting-service/', '/car-detailing-ceramic-coating/', '/faq/'] },
  { slug: 'car-tyre-replacement', label: 'Tyre Replacement', h1: 'Tyre Replacement & Balancing in Dubai Investment Park',
    title: 'Tyre Replacement, Fitting & Balancing in Dubai Investment Park',
    desc: 'New tyre fitting, balancing, rotation and alignment in Dubai Investment Park. Safe, smooth and long-lasting tyres.',
    intro: 'Tyres are your only contact with the road, and Dubai’s heat is hard on them. Master Mechanics fits and balances new tyres, rotates existing ones and checks alignment so you get the most from every set.',
    signs: ['Tread worn near the wear indicators', 'Cracks, bulges or sidewall damage', 'Vibration at highway speed', 'Uneven wear across the tyre', 'Tyres several years old even if tread looks fine'],
    does: ['Tyre inspection – pressure, wear, damage and age', 'New tyre fitting and computerised balancing', 'Tyre rotation and pressure optimisation', 'Wheel alignment check'],
    faq: [
      { q: 'How often should tyres be rotated?', a: 'About every other oil change, or around 6,000 miles, to even out wear.' },
      { q: 'Why does my car vibrate on the highway?', a: 'Unbalanced wheels are a common cause – see our wheel balancing page and blog guide.' },
    ], related: ['/wheel-alignment-and-tire-balancing/', '/suspension-and-steering-repair/', '/blog/care-tips/why-regular-wheel-balancing-is-crucial-for-highway-driving/'] },
  { slug: 'check-engine-light-diagnostics', label: 'Check Engine Light', h1: 'Check Engine Light Diagnostics in Dubai Investment Park',
    title: 'Check Engine Light Diagnostics in Dubai Investment Park | Master Mechanics',
    desc: 'Check engine light on? Computer scan and fault diagnosis in Dubai Investment Park with clear findings and an estimate before repair.',
    intro: 'A check engine light can mean anything from a loose fuel cap to a failing sensor. We scan your car, read the fault codes, confirm the real cause with tests and explain the repair before any work starts.',
    signs: ['Check engine or engine-management light on or flashing', 'Rough idle, hesitation or loss of power', 'Higher fuel consumption than usual', 'Car goes into limp mode', 'Failed or upcoming RTA inspection'],
    does: ['Computer scan and fault-code reading', 'Live-data and sensor testing to confirm the cause', 'Clear explanation and written estimate', 'Repair and code clearing once the fault is fixed'],
    faq: [
      { q: 'Is it safe to drive with the check engine light on?', a: 'If the light is steady and the car drives normally you can usually drive a short distance to a garage. If it flashes or the car loses power, stop safely and have it checked immediately.' },
      { q: 'Can you just clear the code?', a: 'Clearing a code does not fix the cause and the light will usually return. We diagnose the fault first.' },
    ], related: ['/car-computer-diagnostics/', '/engine-repair-service/', '/car-electrical-repair/'] },
  { slug: 'car-brake-pad-replacement', label: 'Brake Pad Replacement', h1: 'Brake Pad & Disc Replacement in Dubai Investment Park',
    title: 'Brake Pad & Disc Replacement in Dubai Investment Park | Master Mechanics',
    desc: 'Squeaking or soft brakes? Brake pad, disc and fluid service in Dubai Investment Park with a full brake inspection.',
    intro: 'Brakes are the most important safety system on your car. We inspect pads, discs, calipers and brake fluid, then replace only what is worn, using quality parts for your make and model.',
    signs: ['Squealing or grinding noise when braking', 'Longer stopping distance or soft pedal', 'Steering wheel vibration under braking', 'Brake warning light on', 'Car pulls to one side when braking'],
    does: ['Full brake inspection', 'Pad and disc replacement', 'Brake fluid check and change', 'Test drive to confirm the result'],
    faq: [
      { q: 'How long do brake pads last?', a: 'It depends on the car and driving style. Heavy stop-start traffic wears pads faster, so have them checked at every service.' },
      { q: 'Do I need to change discs with the pads?', a: 'Not always. We measure the discs and only recommend replacement if they are worn below the limit or warped.' },
    ], related: ['/car-brake-service/', '/maintenance-service/', '/car-tyre-replacement/'] },
  { slug: 'car-ac-gas-refill-and-repair', label: 'AC Gas Refill', h1: 'Car AC Gas Refill & Cooling Repair in Dubai Investment Park',
    title: 'Car AC Repair & Gas Refill in Dubai Investment Park | Master Mechanics',
    desc: 'Car AC not cooling? AC gas refill, leak test, compressor and condenser repair in Dubai Investment Park.',
    intro: 'In Dubai, a weak AC is more than an annoyance. We test the system, find leaks and faulty parts, and restore cold air so your drive stays comfortable all summer.',
    signs: ['AC blowing warm or only slightly cool air', 'Weak airflow or strange smells', 'Noise when the AC is switched on', 'Water inside the cabin', 'AC works only while driving'],
    does: ['AC pressure and leak test', 'Gas refill', 'Compressor, condenser and cabin filter service', 'Blower, fan and electrical checks'],
    faq: [
      { q: 'Why is my car AC not cold?', a: 'Common causes are low gas from a leak, a failing compressor, a blocked condenser or an electrical fault. A pressure and leak test finds the cause.' },
      { q: 'How often should I refill AC gas?', a: 'A sealed system should not lose gas. If it needs frequent refills there is a leak that should be repaired.' },
    ],     related: ['/ac-repair-service/', '/car-electrical-repair/', '/maintenance-service/'] },
  ...extraServices,
];

/* ---------------------------------------------------------------- brands */
const brands = [
  { slug: 'bmw-service-dubai', name: 'BMW', group: 'German', models: '1, 3, 5 and 7 Series, X models and M cars', post: '/blog/%d0%b0uto-service/bmw-car-servicing-in-dubai-keep-your-bmw-in-top-condition/',
    issues: ['Cooling system and water pump checks in the heat', 'Oil leaks from gaskets and seals', 'AC compressor and condenser performance', 'Electrical faults and ECU coding after battery or module replacement'] },
  { slug: 'mercedes-service-dubai', name: 'Mercedes-Benz', group: 'German', models: 'C-Class, E-Class, S-Class, GLC, GLE and more', post: '/blog/%d0%b0uto-service/mercedes-car-servicing-in-dubai/',
    issues: ['Air suspension and shock wear', 'AC and cooling performance', 'Battery and electrical system health', 'Transmission fluid service and gearbox diagnostics'] },
  { slug: 'audi-service-dubai', name: 'Audi', group: 'German', models: 'A3, A4, A6, Q3, Q5 and Q7', post: '/blog/%d0%b0uto-service/audi-car-servicing-in-dubai/',
    issues: ['Oil leaks and consumption checks', 'Dual-clutch / automatic transmission service', 'Cooling system and thermostat/water-pump condition', 'Intake and fuel-system cleaning on direct-injection engines'] },
  { slug: 'toyota-service-dubai', name: 'Toyota', group: 'Japanese', models: 'Camry, Corolla, Land Cruiser, Prado, Hilux and Fortuner',
    issues: ['AC performance in extreme heat', 'Suspension and bushing wear on heavily used SUVs and pick-ups', 'Brake pad and rotor condition', 'Throttle body and fuel injector cleaning'] },
  { slug: 'nissan-service-dubai', name: 'Nissan', group: 'Japanese', models: 'Patrol, Altima, Sunny, X-Trail and Kicks',
    issues: ['CVT / transmission fluid service and diagnostics', 'AC compressor and cooling system checks', 'Suspension and steering wear', 'Battery and charging system health'] },
  { slug: 'lexus-service-dubai', name: 'Lexus', group: 'Japanese', models: 'ES, IS, RX, LX and GX',
    issues: ['AC and cabin cooling performance', 'Suspension and brake wear', 'Electrical and infotainment faults', 'Scheduled maintenance and fluid services'] },
  { slug: 'honda-service-dubai', name: 'Honda', group: 'Japanese', models: 'Accord, Civic, CR-V and Pilot',
    issues: ['AC compressor and condenser condition', 'Battery health in hot weather', 'Brake and suspension bushing wear', 'Routine oil, filter and fluid services'] },
  { slug: 'ford-service-dubai', name: 'Ford', group: 'American', models: 'F-150, Explorer, Edge, Expedition and Mustang',
    issues: ['Transmission service and diagnostics', 'AC and cooling system performance', 'Brake and suspension wear on heavier vehicles', 'Electrical and sensor faults'] },
  { slug: 'chevrolet-service-dubai', name: 'Chevrolet', group: 'American', models: 'Tahoe, Suburban, Silverado, Camaro and Malibu',
    issues: ['AC performance on large SUVs', 'Brake wear on heavy vehicles', 'Suspension and steering components', 'Fuel system and injector cleaning'] },
  { slug: 'gmc-service-dubai', name: 'GMC', group: 'American', models: 'Yukon, Sierra and Acadia',
    issues: ['AC and rear-climate performance', 'Brake pads, rotors and fluid', 'Suspension and steering wear', 'Electrical and battery checks'] },
  { slug: 'mitsubishi-service-dubai', name: 'Mitsubishi', group: 'Japanese', models: 'Pajero, L200, Outlander and ASX',
    issues: ['AC and cooling performance', 'Suspension wear on off-road-used vehicles', 'Brake service', 'Fuel injector and intake cleaning'] },
  { slug: 'infiniti-service-dubai', name: 'Infiniti', group: 'Japanese', models: 'Q50, Q70, QX50, QX60 and QX80',
    issues: ['CVT / automatic transmission service', 'AC and cooling system checks', 'Electrical and sensor diagnostics', 'Suspension and brake wear'] },
  { slug: 'suzuki-service-dubai', name: 'Suzuki', group: 'Japanese', models: 'Swift, Jimny, Vitara and Ertiga',
    issues: ['AC regas and compressor checks', 'Brake pads and shoes', 'Battery and charging system', 'Regular oil and filter services'] },
  { slug: 'mini-service-dubai', name: 'MINI', group: 'European', models: 'Cooper, Cooper S, Clubman and Countryman',
    issues: ['Cooling system and thermostat checks', 'Oil leaks from gaskets and seals', 'Electrical faults and coding', 'AC performance'] },
  { slug: 'mazda-service-dubai', name: 'Mazda', group: 'Japanese', models: 'Mazda3, Mazda6, CX-5 and CX-9',
    issues: ['AC performance in the heat', 'Brake and suspension wear', 'Scheduled oil and filter service', 'Battery health in hot weather'] },
];

/* ---------------------------------------------------------------- areas */
const areas = [
  { slug: 'car-service-dubai-investment-park', area: 'Dubai Investment Park', h1: 'Car Service & Repair in Dubai Investment Park (DIP)', home: true,
    intro: 'Master Mechanics Garage is based in Dubai Investment Park 2 – so if you live or work in DIP, you are only a short drive from a full-service workshop. We handle servicing, repairs, AC, electrical, brakes, tyres and body work for all major brands.' },
  { slug: 'car-repair-south-dubai', area: 'South Dubai', h1: 'Car Repair & Auto Service in South Dubai', home: true,
    intro: 'Looking for a dependable garage in South Dubai? Master Mechanics offers luxury and everyday car repair, diagnostics and ECU programming from our workshop in Dubai Investment Park, with transparent pricing and genuine parts.' },
  { slug: 'car-service-jebel-ali', area: 'Jebel Ali',
    intro: 'Residents and businesses in Jebel Ali can have their cars serviced and repaired at Master Mechanics in nearby Dubai Investment Park. Fleet owners and daily commuters alike benefit from fast diagnostics and clear estimates.' },
  { slug: 'car-service-dubai-south', area: 'Dubai South',
    intro: 'Master Mechanics serves drivers from Dubai South with full-service car maintenance and repair, from oil changes to engine, AC and electrical work, plus pick-up and drop-off enquiries welcome.' },
  { slug: 'car-service-arabian-ranches', area: 'Arabian Ranches',
    intro: 'Family SUVs and saloons in Arabian Ranches see a lot of school runs and heat. Master Mechanics keeps them reliable with servicing, AC repair, brake work and tyre care, and can discuss pick-up and drop-off for your villa.' },
  { slug: 'car-service-dubai-marina', area: 'Dubai Marina',
    intro: 'Dubai Marina drivers who want a trusted independent garage can book Master Mechanics for servicing, diagnostics and repairs on German, European, Japanese and American cars. Ask about collection and delivery.' },
  { slug: 'car-service-jumeirah-village-circle', area: 'Jumeirah Village Circle (JVC)',
    intro: 'JVC residents can reach Master Mechanics for transparent-price servicing, AC repair, brake service and more. Message us on WhatsApp with your car details for a quick estimate and to ask about pick-up and drop-off.' },
  { slug: 'car-service-mudon', area: 'Mudon',
    intro: 'Mudon families and commuters get complete car care from Master Mechanics: routine maintenance, repairs, tyres and body work for all major brands.' },
  { slug: 'car-service-dubai-sports-city', area: 'Dubai Sports City',
    intro: 'Master Mechanics provides Dubai Sports City drivers with reliable servicing, repairs and diagnostics from our Dubai Investment Park workshop, backed by genuine parts and honest estimates.' },
  { slug: 'car-service-al-barsha', area: 'Al Barsha',
    intro: 'Al Barsha drivers looking for an alternative to the dealership can book Master Mechanics for servicing, repairs and diagnostics, including luxury and performance cars.' },
  { slug: 'car-service-green-community', area: 'Green Community',
    intro: 'Green Community sits right next to Dubai Investment Park, so Master Mechanics is one of the closest full-service garages for residents. Book servicing, AC repair, brake work or diagnostics for any major brand.' },
  { slug: 'car-service-remraam', area: 'Remraam',
    intro: 'Remraam residents can reach Master Mechanics in Dubai Investment Park for servicing, repairs and diagnostics, with transparent estimates before any work starts.' },
  { slug: 'car-service-dubai-industrial-city', area: 'Dubai Industrial City',
    intro: 'Commuters and company vehicles from Dubai Industrial City can be serviced and repaired at Master Mechanics in nearby Dubai Investment Park. Ask about pick-up and drop-off for your vehicle.' },
  { slug: 'car-service-al-furjan', area: 'Al Furjan',
    intro: 'Al Furjan drivers get dependable servicing, AC and brake repair, tyres and diagnostics from Master Mechanics, a short drive away in Dubai Investment Park.' },
];

/* ---------------------------------------------------------------- builders */
const ul = (arr) => arr.slice();

export function buildSeoPages() {
  const out = [];
  let order = 100;

  for (const s of services) {
    out.push({
      path: `/${s.slug}/`, type: 'service', in_menu: false, nav_label: s.label, sort_order: order++,
      title: s.title || s.h1, meta_description: s.desc || null, h1: s.h1,
      subtitle: 'Master Mechanics Garage – Dubai Investment Park',
      content: {
        intro: [s.intro],
        sections: [
          { heading: 'Signs you may need this service', bullets: ul(s.signs) },
          { heading: 'What we do', bullets: ul(s.does) },
          { heading: 'Why choose Master Mechanics', bullets: WHY },
          { heading: 'Related services', links: s.related },
          cta(s.label.toLowerCase()),
        ],
      },
      faq: s.faq,
    });
  }

  for (const b of brands) {
    const meta = brandSeo[b.slug];
    const related = meta?.related || ['/maintenance-service/', '/car-computer-diagnostics/', '/ac-repair-service/', '/specializations/', ...(b.post ? [b.post] : [])];
    out.push({
      path: `/${b.slug}/`, type: 'brand', nav_label: b.name, sort_order: order++,
      title: meta?.title || `${b.name} Service DIP`,
      meta_description: meta?.desc || `${b.name} service in Dubai Investment Park.`,
      h1: `${b.name} specialist service in Dubai Investment Park`,
      subtitle: `${b.group} car specialists in DIP 2`,
      card_image: brandLogos[b.slug] || null,
      content: {
        keywords: meta?.kw,
        related,
        intro: [`Independent ${b.name} service and repair in Dubai Investment Park — including ${b.models}. We diagnose first, use genuine or OEM-quality parts, and give a clear estimate before work starts.`],
        sections: [
          { heading: `${b.name} work we do`, bullets: ['Scheduled service — oil, filters, fluids and inspection', 'Engine and computer diagnostics', 'AC and cooling system repair', 'Brake, suspension and steering work', 'Electrical repair and battery replacement', 'Wheel alignment and tyre balancing'] },
          { heading: `What we check on ${b.name} cars in Dubai heat`, bullets: ul(b.issues) },
          { heading: 'Why choose Master Mechanics', bullets: WHY },
          { heading: 'Related', links: related },
          cta(`${b.name} service`),
        ],
      },
      faq: [
        { q: `How often should I service my ${b.name} in Dubai?`, a: `Follow your ${b.name} service indicator and owner’s manual. Dubai’s heat and dust can justify more frequent checks of fluids, filters, battery and cooling – we can advise based on your car and mileage.` },
        { q: `Do you use genuine parts for ${b.name} repairs?`, a: 'We use genuine or OEM-quality parts and explain your options in the estimate before work starts.' },
        { q: `Do I have to use the ${b.name} dealer to keep my car in good condition?`, a: 'Not necessarily. Keep your service records and use correct-specification parts and fluids. If your car is under warranty, check the terms with your dealer or warranty provider.' },
      ],
    });
  }

  for (const a of areas) {
    out.push({
      path: `/${a.slug}/`, type: 'location', nav_label: a.area, sort_order: order++,
      title: `Car Service & Repair in ${a.area.replace(' (JVC)', '')} | Master Mechanics`,
      meta_description: `Car servicing, repair, AC, brakes and diagnostics for drivers in ${a.area}. Master Mechanics, Dubai Investment Park – genuine parts, clear pricing.`,
      h1: a.h1 || `Car Service & Repair for ${a.area} Drivers`,
      subtitle: 'Master Mechanics Garage – Dubai Investment Park 2',
      content: {
        intro: [a.intro],
        sections: [
          { heading: 'Services', bullets: ['Car servicing and maintenance', 'Engine, gearbox and computer diagnostics', 'AC repair and cooling system service', 'Brake, suspension and tyre work', 'Electrical repair and battery replacement', 'Dent, scratch and paint repair'] },
          { heading: 'Brands we work on', paragraphs: ['German, European, Japanese and American cars – including BMW, Mercedes-Benz, Audi, Toyota, Nissan, Lexus, Honda, Ford, Chevrolet and GMC.'] },
          { heading: 'Why choose Master Mechanics', bullets: WHY },
          { heading: 'Find us', paragraphs: ['Dubai Investment Park – 2, Dubai, United Arab Emirates. Open Monday to Saturday, 9 AM to 7 PM.'] },
          cta('car service'),
        ],
      },
      faq: [
        { q: `Where is Master Mechanics from ${a.area}?`, a: 'Our workshop is in Dubai Investment Park 2, Dubai. Use the map link in the footer for directions.' },
        { q: `Can you collect my car from ${a.area}?`, a: 'We offer pick-up and drop-off – message us on WhatsApp with your location to confirm availability and timing.' },
        { q: 'Which car brands do you service?', a: 'German, European, Japanese and American vehicles, including BMW, Mercedes-Benz, Audi, Toyota, Nissan, Honda, Ford and Chevrolet.' },
      ],
    });
  }
  return out;
}
