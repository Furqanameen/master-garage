// Specific service pages to bring the public catalogue to ~40 unique jobs.
// Each page has its own intent (not a copy of a sibling). Claims stay within
// what the live workshop already offers: diagnostics, genuine/OEM parts,
// estimates, DIP 2, pick-up on request. No invented prices or ratings.

export const extraServices = [
  { slug: 'car-radiator-repair', label: 'Radiator Repair', h1: 'Car Radiator Repair in Dubai Investment Park',
    intro: 'A blocked or leaking radiator is a common reason cars overheat in DIP. We pressure-test the cooling system, repair or replace the radiator and refill with the correct coolant for your make.',
    signs: ['Temperature gauge climbing in traffic', 'Coolant puddle under the car', 'Sweet smell from the engine bay', 'Heater blowing cold while the engine runs hot', 'Low coolant with no obvious leak'],
    does: ['Cooling-system pressure and leak test', 'Radiator repair or replacement', 'Coolant flush and refill to spec', 'Fan, hose and cap check'],
    faq: [
      { q: 'Can a radiator be repaired or must it be replaced?', a: 'Small leaks can sometimes be repaired. Cracked tanks, heavy corrosion or internal blockage usually need a replacement. We inspect and explain first.' },
      { q: 'Is tap water OK in the radiator?', a: 'No. Use the coolant type your manufacturer specifies. Wrong mix causes corrosion and overheating in Dubai heat.' },
    ], related: ['/car-overheating-repair/', '/water-pump-replacement/', '/coolant-flush-service/', '/engine-repair-service/'] },

  { slug: 'car-overheating-repair', label: 'Overheating Repair', h1: 'Car Overheating Repair in Dubai Investment Park',
    intro: 'Dubai heat plus stop-start traffic is hard on cooling systems. If your gauge rises or steam appears, we diagnose the cause — radiator, water pump, thermostat, fans or a head issue — before any parts go on.',
    signs: ['Needle in the red or a high-temp warning', 'Steam from under the bonnet', 'Loss of power when the engine is hot', 'Coolant warning light', 'Heater not working'],
    does: ['Cooling-system diagnosis on the lift and with scan tools', 'Thermostat, fan, radiator and pump checks', 'Repair of the confirmed cause', 'Road test to confirm stable temperature'],
    faq: [
      { q: 'Is it safe to drive an overheating car?', a: 'Stop as soon as it is safe. Driving on can warp the head or damage the engine. Call us or have the car recovered.' },
      { q: 'Why does my car overheat only in traffic?', a: 'Often a fan, viscous coupling or a partly blocked radiator. We test the system under load rather than guessing.' },
    ], related: ['/car-radiator-repair/', '/water-pump-replacement/', '/thermostat-replacement/', '/engine-repair-service/'] },

  { slug: 'water-pump-replacement', label: 'Water Pump', h1: 'Water Pump Replacement in Dubai Investment Park',
    intro: 'The water pump moves coolant through the engine. A leaking or noisy pump is a frequent finding on German and Japanese cars in DIP heat. We replace it with genuine or OEM-quality parts and bleed the system.',
    signs: ['Coolant drip from the pump weep hole', 'Whine or grind from the front of the engine', 'Overheating with a full radiator', 'Play in the pump pulley', 'Steam after a short drive'],
    does: ['Confirm pump leak or bearing wear', 'Water-pump replacement', 'Belt and tensioner check where the pump is belt-driven', 'Coolant refill and bleed'],
    faq: [
      { q: 'Should the timing belt be changed with the pump?', a: 'If the pump is driven by the timing belt, many cars replace both together. We advise based on mileage and access.' },
      { q: 'How long does a water pump last in Dubai?', a: 'Heat and old coolant shorten life. Have cooling parts checked at major service rather than waiting for a leak.' },
    ], related: ['/timing-belt-replacement/', '/car-overheating-repair/', '/coolant-flush-service/', '/engine-repair-service/'] },

  { slug: 'thermostat-replacement', label: 'Thermostat', h1: 'Car Thermostat Replacement in Dubai Investment Park',
    intro: 'A stuck thermostat either overheats the engine or keeps it too cold. We test opening temperature, replace the thermostat and verify the cooling cycle on a road test.',
    signs: ['Engine slow to reach temperature', 'Overheating with a cool radiator hose', 'Heater output that comes and goes', 'Temperature gauge jumping', 'Coolant warning after a short trip'],
    does: ['Thermostat and cooling-system test', 'Thermostat housing inspection', 'Replacement with the correct spec part', 'Bleed and temperature check'],
    faq: [
      { q: 'Can I just remove the thermostat?', a: 'No. The engine needs a controlled temperature for oil, emissions and cabin heat. We fit the correct thermostat.' },
    ], related: ['/car-overheating-repair/', '/water-pump-replacement/', '/car-radiator-repair/', '/engine-repair-service/'] },

  { slug: 'coolant-flush-service', label: 'Coolant Flush', h1: 'Coolant Flush & Antifreeze Service in DIP',
    intro: 'Old coolant turns acidic and clogs radiators. A flush replaces degraded fluid, protects the water pump and aluminium parts, and is part of keeping cars reliable in DIP summers.',
    signs: ['Rusty or sludgy coolant', 'Service interval due for coolant', 'Unexplained temperature rise', 'Heater weak at idle', 'Recent radiator or pump work'],
    does: ['Drain, flush and refill to manufacturer spec', 'Cap, hose and leak check', 'Bleed air from the system', 'Record the next interval'],
    faq: [
      { q: 'How often should coolant be changed?', a: 'Follow the handbook. In Dubai, many cars benefit from a check at major service even if the interval looks long.' },
    ], related: ['/car-radiator-repair/', '/water-pump-replacement/', '/maintenance-service/', '/major-car-service/'] },

  { slug: 'timing-belt-replacement', label: 'Timing Belt', h1: 'Timing Belt Replacement in Dubai Investment Park',
    intro: 'A broken timing belt can destroy an engine. We replace belts, tensioners and, where the job requires it, the water pump — using the interval for your model, not a guess.',
    signs: ['Belt interval reached by km or years', 'Tick or rattle from the timing cover', 'Oil leak onto the belt', 'Engine will not start after a snap', 'Handbook service due for belt or chain inspection'],
    does: ['Confirm belt or chain type for your engine', 'Timing-belt kit replacement', 'Water-pump and seal replacement when the job opens that area', 'Timing set and road test'],
    faq: [
      { q: 'Do all cars have a timing belt?', a: 'Some use a chain. We check your engine code and only recommend a belt job when you actually have a belt.' },
      { q: 'What happens if a belt snaps?', a: 'On interference engines it can bend valves. Do not drive if you hear a snap or the engine stops suddenly.' },
    ], related: ['/water-pump-replacement/', '/engine-repair-service/', '/engine-overhaul-service/', '/major-car-service/'] },

  { slug: 'spark-plug-replacement', label: 'Spark Plugs', h1: 'Spark Plug Replacement in Dubai Investment Park',
    intro: 'Worn plugs cause misfires, hard starts and higher fuel use. We fit the correct heat-range plugs for your engine, check coils and clear any misfire codes.',
    signs: ['Rough idle or hesitation', 'Hard cold start', 'Misfire or check-engine light', 'Worse fuel economy', 'Service due for plugs'],
    does: ['Remove and inspect plugs', 'Fit OEM-spec plugs torqued correctly', 'Coil and lead check', 'Scan and road test'],
    faq: [
      { q: 'How often should spark plugs be changed?', a: 'It depends on iridium, platinum or copper plugs and your handbook. Dubai short trips can foul plugs earlier.' },
    ], related: ['/check-engine-light-diagnostics/', '/injector-cleaning-service/', '/minor-car-service/', '/engine-repair-service/'] },

  { slug: 'clutch-repair-service', label: 'Clutch Repair', h1: 'Clutch Repair & Replacement in Dubai Investment Park',
    intro: 'A slipping or heavy clutch is unsafe in traffic. We inspect the disc, pressure plate, flywheel and hydraulics on manual cars and quote before the gearbox comes out.',
    signs: ['Engine revs rise without speed', 'Burning smell after hills or traffic', 'High or low biting point', 'Grinding into gear', 'Spongy clutch pedal'],
    does: ['Clutch operation and leak check', 'Disc, plate and bearing replacement when worn', 'Flywheel inspection', 'Hydraulics and cable check'],
    faq: [
      { q: 'How long does a clutch last?', a: 'Driving style and traffic matter more than km. We inspect rather than replacing on a fixed schedule.' },
      { q: 'Do you repair automatic clutches?', a: 'Dual-clutch and auto jobs are diagnosed on the gearbox page. This page is for conventional manual clutches.' },
    ], related: ['/car-gearbox-transmission-service/', '/repair-service/', '/engine-repair-service/'] },

  { slug: 'alternator-repair', label: 'Alternator Repair', h1: 'Car Alternator Repair in Dubai Investment Park',
    intro: 'If the battery light is on or electrics dim at idle, the alternator may not be charging. We test output, replace or repair the unit, and confirm the battery is not the real fault.',
    signs: ['Battery warning light', 'Dim lights at idle', 'Battery that dies after a jump', 'Whine from the alternator', 'Electrical gremlins that come and go'],
    does: ['Charging-system voltage and current test', 'Belt and pulley check', 'Alternator repair or replacement', 'Battery health test'],
    faq: [
      { q: 'Is it the battery or the alternator?', a: 'A load test on both answers that. Replacing only the battery when the alternator is weak means another breakdown.' },
    ], related: ['/car-battery-replacement/', '/starter-motor-repair/', '/car-electrical-repair/', '/serpentine-belt-replacement/'] },

  { slug: 'starter-motor-repair', label: 'Starter Motor', h1: 'Starter Motor Repair in Dubai Investment Park',
    intro: 'A click and no crank is often the starter, a weak battery or a seized engine. We test in that order and repair or replace the starter so you are not stranded in DIP.',
    signs: ['Single click when you turn the key', 'Slow crank that used to be fast', 'Starter stays engaged', 'Intermittent no-start', 'Burnt smell after trying to start'],
    does: ['Battery and starter draw test', 'Solenoid and wiring check', 'Starter repair or replacement', 'Flywheel ring-gear inspection when the starter is off'],
    faq: [
      { q: 'Can heat kill a starter?', a: 'Yes. Heat soak after a drive is a common no-start in Dubai. We test hot and cold when the fault is intermittent.' },
    ], related: ['/car-battery-replacement/', '/alternator-repair/', '/car-electrical-repair/', '/car-key-programming/'] },

  { slug: 'shock-absorber-replacement', label: 'Shock Absorbers', h1: 'Shock Absorber Replacement in Dubai Investment Park',
    intro: 'Worn shocks make the car bounce, dive and wear tyres. We inspect fronts and rears, replace in pairs where needed, and align the wheels afterwards.',
    signs: ['Bouncy ride over speed bumps', 'Nose-dive under braking', 'Oil on the shock body', 'Uneven tyre wear', 'Knock over potholes'],
    does: ['Shock and spring inspection on the lift', 'Replacement in axle pairs when worn', 'Mount and bump-stop check', 'Wheel alignment after the job'],
    faq: [
      { q: 'Do I change all four shocks?', a: 'Not always. We measure and replace the worn axle. Mixing a new shock with a dead one on the same axle is a poor ride.' },
    ], related: ['/suspension-and-steering-repair/', '/wheel-alignment-and-tire-balancing/', '/car-tyre-replacement/', '/power-steering-repair/'] },

  { slug: 'power-steering-repair', label: 'Power Steering', h1: 'Power Steering Repair in Dubai Investment Park',
    intro: 'Heavy or noisy steering is a safety issue. We check fluid, pumps, racks and electric-assist systems, then repair the confirmed leak or fault.',
    signs: ['Steering heavy at parking speeds', 'Whine when you turn the wheel', 'Fluid leak at the rack or pump', 'Steering wheel shake', 'Assistance that cuts in and out'],
    does: ['Fluid level and leak inspection', 'Pump, rack and hose test on hydraulic systems', 'Scan of electric power-steering modules', 'Repair and alignment if the rack is disturbed'],
    faq: [
      { q: 'Can I top up any power-steering fluid?', a: 'Use the spec on the cap or handbook. The wrong fluid damages seals. We can confirm the type for your car.' },
    ], related: ['/suspension-and-steering-repair/', '/shock-absorber-replacement/', '/wheel-alignment-and-tire-balancing/', '/car-electrical-repair/'] },

  { slug: 'exhaust-system-repair', label: 'Exhaust Repair', h1: 'Car Exhaust Repair in Dubai Investment Park',
    intro: 'A blowing exhaust is loud, can fail an RTA check and wastes fuel. We inspect manifolds, flex pipes, silencers and sensors, then repair or replace the damaged section.',
    signs: ['Loud roar under acceleration', 'Rattle under the car', 'Exhaust smell in the cabin', 'Sooty leak at a joint', 'Failed emissions-related inspection'],
    does: ['Lift inspection of the full exhaust', 'Flex-pipe, box and hanger repair', 'Lambda / sensor check when codes are stored', 'Clamp or weld repair where it is sound'],
    faq: [
      { q: 'Do you replace the whole exhaust?', a: 'Only if the system is rusted through. We replace the failed section when the rest is serviceable.' },
    ], related: ['/rta-vehicle-inspection-service/', '/check-engine-light-diagnostics/', '/engine-repair-service/', '/injector-cleaning-service/'] },

  { slug: 'throttle-body-cleaning', label: 'Throttle Body', h1: 'Throttle Body Cleaning in Dubai Investment Park',
    intro: 'Carbon on the throttle body causes a hunting idle and flat spots. Direct-injection engines in Dubai dust pick this up. We clean the bore, reset adaptations and scan afterwards.',
    signs: ['Uneven idle', 'Sticking throttle when you first press the pedal', 'Stall at junctions', 'Drop in fuel economy', 'Idle-control related fault codes'],
    does: ['Remove or in-situ clean as the model allows', 'Idle relearn / adaptation', 'Intake inspection', 'Scan to confirm codes are gone'],
    faq: [
      { q: 'Is this the same as injector cleaning?', a: 'No. Injector cleaning is the fuel side. Throttle-body cleaning is the air valve. Many cars need both over time.' },
    ], related: ['/injector-cleaning-service/', '/spark-plug-replacement/', '/check-engine-light-diagnostics/', '/maintenance-service/'] },

  { slug: 'engine-overhaul-service', label: 'Engine Overhaul', h1: 'Car Engine Overhaul in Dubai Investment Park',
    intro: 'When bearings, rings or a head are worn, a patch will not last. The workshop already offers engine overhauls: we inspect, quote the work, and rebuild or replace only what the engine needs.',
    signs: ['Heavy knocking from the block', 'Blue or white smoke that does not clear', 'Very low compression', 'Metal in the oil', 'Repeated overheating after cooling repairs'],
    does: ['Compression, leak-down and oil analysis as needed', 'Strip and inspect on the bench', 'Machine work and parts quoted before rebuild', 'Refit, fluids, timing and road test'],
    faq: [
      { q: 'Is an overhaul cheaper than a used engine?', a: 'It depends on the engine and what is damaged. We quote both paths when a used unit is a realistic option.' },
      { q: 'How long does an overhaul take?', a: 'It is not a same-day job. We give a time once the engine is inspected, not before.' },
    ], related: ['/engine-repair-service/', '/timing-belt-replacement/', '/car-overheating-repair/', '/car-computer-diagnostics/'] },

  { slug: 'car-key-programming', label: 'Key Programming', h1: 'Car Key Programming in Dubai Investment Park',
    intro: 'Lost keys, a new remote or a replaced module often need coding. We program keys and remotes for supported makes in DIP after we confirm the car’s immobiliser type.',
    signs: ['Spare key does not start the car', 'Remote lock failed after a battery change', 'New key needed after loss', 'Immobiliser light stays on', 'Module replaced that needs coding'],
    does: ['Identify immobiliser and key type', 'Program additional or replacement keys where supported', 'Remote pairing', 'Test lock, unlock and start'],
    faq: [
      { q: 'Can you cut a mechanical key only?', a: 'A blade without programming will not start most modern cars. We explain what your model needs before you buy a blank.' },
      { q: 'Do you cover every make?', a: 'We cover the German, Japanese, American and European cars we service. Confirm your model on WhatsApp first.' },
    ], related: ['/ecu-programming-service/', '/car-electrical-repair/', '/starter-motor-repair/', '/car-computer-diagnostics/'] },

  { slug: 'serpentine-belt-replacement', label: 'Drive Belt', h1: 'Serpentine Belt Replacement in Dubai Investment Park',
    intro: 'A cracked drive belt takes out the alternator, water pump or AC compressor. We inspect belts and tensioners at service and replace them before they snap in traffic.',
    signs: ['Squeal on cold start or with AC on', 'Cracks or glaze on the belt', 'Battery or temperature warning after a snap', 'Wobbling tensioner', 'Belt dust in the engine bay'],
    does: ['Belt and tensioner inspection', 'Serpentine or accessory-belt replacement', 'Pulley check', 'Accessory test after fitment'],
    faq: [
      { q: 'Is this the same as a timing belt?', a: 'No. The serpentine belt drives accessories. The timing belt drives the camshafts. See the timing-belt page for that job.' },
    ], related: ['/timing-belt-replacement/', '/alternator-repair/', '/ac-repair-service/', '/water-pump-replacement/'] },

  { slug: 'minor-car-service', label: 'Minor Service', h1: 'Minor Car Service in Dubai Investment Park',
    intro: 'A minor service is oil, filter and a safety check — the interval most DIP cars hit between majors. We use spec oil, inspect brakes and fluids, and tell you what can wait.',
    signs: ['Oil-service light or km interval due', 'Six months since the last oil change', 'You want a check before a long trip', 'New to the workshop and want a baseline'],
    does: ['Engine oil and oil filter', 'Fluid top-ups and visual inspection', 'Lights, brakes and tyre check', 'Written notes on anything due soon'],
    faq: [
      { q: 'What is the difference between minor and major?', a: 'Minor is oil, filter and inspection. Major adds plugs, cabin/air filters, brake fluid or coolant when your schedule calls for them. See the major-service page.' },
    ], related: ['/major-car-service/', '/oil-change-service/', '/maintenance-service/', '/spark-plug-replacement/'] },

  { slug: 'major-car-service', label: 'Major Service', h1: 'Major Car Service in Dubai Investment Park',
    intro: 'A major service is the deeper interval: oil, filters, plugs where due, brake fluid or coolant checks, and a full inspection. We follow your make’s schedule, not a one-size list.',
    signs: ['Major-service indicator or handbook km', 'Two or more years since a full service', 'You want filters, plugs and fluids done together', 'Preparing the car for RTA renewal'],
    does: ['Oil, oil filter, air and cabin filters as specified', 'Spark plugs when due', 'Brake, coolant and gearbox-fluid checks', 'Multi-point inspection and report'],
    faq: [
      { q: 'Do you use genuine filters?', a: 'Genuine or OEM-quality, explained on the estimate before we start.' },
    ], related: ['/minor-car-service/', '/maintenance-service/', '/rta-vehicle-inspection-service/', '/specializations/'] },

  { slug: 'brake-fluid-change', label: 'Brake Fluid Change', h1: 'Brake Fluid Change in Dubai Investment Park',
    intro: 'Brake fluid absorbs water and boils under heat. We test moisture, flush the system and bleed to a firm pedal — a small job that protects ABS valves and calipers.',
    signs: ['Soft or sinking pedal', 'Fluid darker than champagne', 'Interval due (often two years)', 'ABS light after old fluid', 'Recent pad job without a flush'],
    does: ['Moisture or boiling-point check', 'Flush and bleed all corners', 'Reservoir clean and correct spec fluid', 'Pedal and warning-light check'],
    faq: [
      { q: 'Can I mix brake-fluid types?', a: 'No. DOT 3, 4 and 5.1 are not all interchangeable. We use the spec on the cap.' },
    ], related: ['/car-brake-service/', '/car-brake-pad-replacement/', '/major-car-service/', '/rta-vehicle-inspection-service/'] },
];
