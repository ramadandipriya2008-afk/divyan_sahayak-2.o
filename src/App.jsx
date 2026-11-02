import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  IconWheelchair,
  IconCrutches,
  IconWalker,
  IconDonations,
  IconInventory,
  IconStatus,
  IconPurchase,
  IconNGO,
  IconBell,
  IconResale,
  IconProfile,
  IconLogout,
  IconSearch,
  IconShieldCheck,
  IconCheck,
  IconEdit,
  IconTrash,
  IconZap,
  IconTruck,
  IconMenu,
  IconChevronLeft,
  IconChevronRight,
  IconIdCard,
  IconBadgeCheck,
  IconHearingAid
} from "./components/Icons";
import { translations, getTranslation } from "./translations";

const initialDevices = [
  { id:"DS-D-24072", name:"Reciprocal folding walking frame", category:"Walker", condition:"Working", state:"Andhra Pradesh", district:"Vijayawada", date:"29 Oct 2026", status:"Allocated & Delivered", qty:2, stage:7, image:"/images/walker_folding.png" },
  { id:"DS-D-24073", name:"Four-wheel rollator with seat & brakes", category:"Walker", condition:"Repairable", state:"Telangana", district:"Warangal", date:"30 Oct 2026", status:"Refurbishment in Progress", qty:1, stage:5, image:"/images/walker_rollator.png" },
  { id:"DS-D-24074", name:"Discreet in-the-canal digital hearing aid", category:"Hearing Aid", condition:"Working", state:"Telangana", district:"Secunderabad", date:"31 Oct 2026", status:"Technical Inspection", qty:1, stage:4, image:"/images/hearing_aid_digital.jpg" },
  { id:"DS-D-24076", name:"Standard chrome hospital wheelchair", category:"Wheelchair", condition:"Working", state:"Telangana", district:"Hyderabad", date:"02 Nov 2026", status:"Allocated & Delivered", qty:2, stage:7, image:"/images/wheelchair_manual.png" },
  { id:"DS-D-24018", name:"Folding manual wheelchair", category:"Wheelchair", condition:"Repairable", state:"Telangana", district:"Hyderabad", date:"13 Oct 2026", status:"Inspection Pending", qty:1, stage:4, image:"/images/wheelchair_manual.png" },
  { id:"DS-D-24012", name:"Adjustable elbow crutches", category:"Crutches", condition:"Working", state:"Telangana", district:"Hyderabad", date:"08 Oct 2026", status:"Collection Scheduled", qty:2, stage:2, image:"/images/crutches_forearm.png" },
  { id:"DS-D-24025", name:"Digital BTE Hearing Aid", category:"Hearing Aid", condition:"Working", state:"Telangana", district:"Hyderabad", date:"15 Oct 2026", status:"Technical Inspection", qty:1, stage:4, image:"/images/hearing_aid_digital.jpg" },
  { id:"DS-D-24031", name:"Compact transit travel wheelchair", category:"Wheelchair", condition:"Working", state:"Telangana", district:"Secunderabad", date:"16 Oct 2026", status:"Refurbishment in Progress", qty:1, stage:5, image:"/images/wheelchair_transit.png" },
  { id:"DS-D-24036", name:"Standard reciprocal folding walker", category:"Walker", condition:"Working", state:"Telangana", district:"Warangal", date:"18 Oct 2026", status:"Quality Certified", qty:2, stage:6, image:"/images/walker_folding.png" },
  { id:"DS-D-24040", name:"Four-wheel rollator with padded seat", category:"Walker", condition:"Repairable", state:"Andhra Pradesh", district:"Vijayawada", date:"20 Oct 2026", status:"Hub Intake & Verification", qty:1, stage:3, image:"/images/walker_rollator.png" },
  { id:"DS-D-24045", name:"Underarm axillary crutches (pair)", category:"Crutches", condition:"Working", state:"Andhra Pradesh", district:"Visakhapatnam", date:"22 Oct 2026", status:"Collection Scheduled", qty:3, stage:2, image:"/images/crutches_axillary_pair.jpg" },
  { id:"DS-D-24049", name:"Rechargeable RIC Hearing Aid", category:"Hearing Aid", condition:"Working", state:"Telangana", district:"Hyderabad", date:"23 Oct 2026", status:"Allocated & Delivered", qty:1, stage:7, image:"/images/hearing_aid_rechargeable.jpg" },
  { id:"DS-D-24053", name:"Pediatric lightweight wheelchair", category:"Wheelchair", condition:"Working", state:"Telangana", district:"Khammam", date:"24 Oct 2026", status:"Submission Received", qty:1, stage:1, image:"/images/wheelchair_pediatric.jpg" },
  { id:"DS-D-24058", name:"Two-wheeled steerable walking frame", category:"Walker", condition:"Working", state:"Andhra Pradesh", district:"Guntur", date:"25 Oct 2026", status:"Technical Inspection", qty:2, stage:4, image:"/images/walker_steerable.jpg" },
  { id:"DS-D-24062", name:"High-back reclining wheelchair", category:"Wheelchair", condition:"Repairable", state:"Telangana", district:"Nizamabad", date:"26 Oct 2026", status:"Refurbishment in Progress", qty:1, stage:5, image:"/images/wheelchair_comfort.jpg" },
  { id:"DS-D-24067", name:"Shock-absorbing spring forearm crutches", category:"Crutches", condition:"Working", state:"Karnataka", district:"Bengaluru", date:"27 Oct 2026", status:"Quality Certified", qty:2, stage:6, image:"/images/crutches_spring.jpg" }
];
const listings = [
  {
    id: "RS-RESALE-01",
    name: "Triple-Chrome Carbon Steel Hospital Wheelchair",
    category: "Wheelchair",
    price: 4200,
    location: "Hyderabad, Telangana",
    material: "Triple-Chrome Plated Carbon Steel",
    size: "18\" Seat Width (Standard Adult)",
    desc: "Heavy-duty cross-brace hospital frame with self-propelling 24\" spoke wheels, solid puncture-proof tires, companion parking brake, and wipe-clean vinyl upholstery.",
    image: "/images/wheelchair_manual.png"
  },
  {
    id: "RS-RESALE-02",
    name: "Aircraft Aluminum Active Transit Wheelchair",
    category: "Wheelchair",
    price: 6800,
    location: "Secunderabad, Telangana",
    material: "Aircraft-Grade 7000 Anodized Aluminum",
    size: "16\" Seat Width (Compact Travel)",
    desc: "Ultra-compact travel transit frame with fold-down backrest, attendant loop handbrakes, and 8\" heavy-duty solid rubber casters.",
    image: "/images/wheelchair_transit.png"
  },
  {
    id: "RS-RESALE-03",
    name: "High-Modulus 3K Carbon-Fiber Active Wheelchair",
    category: "Wheelchair",
    price: 21500,
    location: "Bengaluru, Karnataka",
    material: "Multi-Ply 3K Carbon Fiber Monocoque",
    size: "16\" Seat Width · 6.9 kg Ultra-Light",
    desc: "State-of-the-art monocoque carbon-fiber active wheelchair with carbon side guards, quick-release sport wheels, and breathable mesh upholstery.",
    image: "/images/wheelchair_carbon.jpg"
  },
  {
    id: "RS-RESALE-04",
    name: "Aerospace Titanium Rigid Active Wheelchair",
    category: "Wheelchair",
    price: 18900,
    location: "Visakhapatnam, Andhra Pradesh",
    material: "Grade 9 Seamless Aerospace Titanium",
    size: "17\" Custom Active Fit · Minimalist Open Frame",
    desc: "Minimalist brushed aerospace titanium tubular chassis offering unmatched road vibration dampening, custom center-of-gravity balance, and high-performance spoked rear wheels.",
    image: "/images/wheelchair_titanium.jpg"
  },
  {
    id: "RS-RESALE-05",
    name: "AZ31B Magnesium Alloy Ergonomic Active Wheelchair",
    category: "Wheelchair",
    price: 15400,
    location: "Hyderabad, Telangana",
    material: "Ultra-Light AZ31B Magnesium Alloy Chassis",
    size: "16.5\" Ergonomic Ergofit Seating",
    desc: "Advanced magnesium alloy chassis weighing 33% less than aluminum with natural road-vibration absorption, ergonomic pressure-relief seating, and swift folding design.",
    image: "/images/wheelchair_active.jpg"
  },
  {
    id: "RS-RESALE-06",
    name: "Pediatric Youth Lightweight Wheelchair",
    category: "Wheelchair",
    price: 7900,
    location: "Warangal, Telangana",
    material: "Lightweight Hydroformed Aluminum Alloy",
    size: "14\" Seat Width (Pediatric / Youth)",
    desc: "Child-proportioned frame with flip-up desk armrests, quick-release rear wheels, swing-away anti-tippers, and padded pediatric safety belt.",
    image: "/images/wheelchair_pediatric.jpg"
  },
  {
    id: "RS-RESALE-07",
    name: "Adjustable Forearm Elbow Crutches (Pair)",
    category: "Crutches",
    price: 8500,
    location: "Hyderabad, Telangana",
    material: "Gunmetal Gray Aluminum Alloy",
    size: "Adult Adjustable (Height 4'10\" – 6'2\")",
    desc: "Molded ergonomic forearm cuffs with non-slip contour handgrips, dual push-button height adjustment, and reinforced rubber feet.",
    image: "/images/crutches_forearm.png"
  },
  {
    id: "RS-RESALE-08",
    name: "Carbon-Fiber Ultra-Light Ergonomic Forearm Crutches (Pair)",
    category: "Crutches",
    price: 2600,
    location: "Bengaluru, Karnataka",
    material: "Pure 3K Twill Carbon Fiber & Magnesium Cuffs",
    size: "Universal Height (Height 5'0\" – 6'4\")",
    desc: "Ultralight continuous carbon fiber construction weighing only 310 grams per unit, absorbing ground vibrations and relieving wrist strain.",
    image: "/images/crutches_forearm_pair.jpg"
  },
  {
    id: "RS-RESALE-09",
    name: "Axillary Underarm Crutches Pair · Standard Adult",
    category: "Crutches",
    price: 1300,
    location: "Vijayawada, Andhra Pradesh",
    material: "Extruded 6061-T6 Anodized Aluminum",
    size: "Standard Adult (Height 5'2\" – 5'10\")",
    desc: "Solid dual-bow aluminum struts with washable closed-cell foam underarm pads, push-pin handgrip adjustments, and suction ferrules.",
    image: "/images/crutches_axillary_pair.jpg"
  },
  {
    id: "RS-RESALE-10",
    name: "Heavy-Duty Hospital Axillary Underarm Crutches (Pair)",
    category: "Crutches",
    price: 600,
    location: "Visakhapatnam, Andhra Pradesh",
    material: "Heavy-Gauge Reinforced Aluminum",
    size: "Tall Adult (Height 5'10\" – 6'6\")",
    desc: "Reinforced bridge construction with extra-dense hypoallergenic underarm cushions, dual push-pins, and jumbo slip-resistant suction feet.",
    image: "/images/crutches_hospital.jpg"
  },
  {
    id: "RS-RESALE-11",
    name: "Shock-Absorbing Spring Forearm Crutches (Pair)",
    category: "Crutches",
    price: 7999,
    location: "Karimnagar, Telangana",
    material: "Titanium-Aluminum Composite & High-Tensile Spring",
    size: "Universal Adult (Height 5'0\" – 6'4\")",
    desc: "Internal coil spring suspension absorbing up to 40% of ground impact shock on wrists, elbows, and rotator cuffs.",
    image: "/images/crutches_spring.jpg"
  },
  {
    id: "RS-RESALE-12",
    name: "Pediatric Youth Underarm Crutches (Pair)",
    category: "Crutches",
    price: 1150,
    location: "Guntur, Andhra Pradesh",
    material: "Lightweight Anodized Aluminum",
    size: "Youth / Junior (Height 4'2\" – 5'2\")",
    desc: "Child-proportioned underarm struts with soft hypoallergenic foam pads, easy wing-nut adjustment, and high-traction rubber ferrules.",
    image: "/images/crutches_axillary_pair.jpg"
  },
  {
    id: "RS-RESALE-13",
    name: "Standard Reciprocal Stepping Folding Walker",
    category: "Walker",
    price: 1259,
    location: "Hyderabad, Telangana",
    material: "Bronze-Anodized Aircraft Aluminum",
    size: "Width 24\" · Height Adjustable 31\"–38\"",
    desc: "Articulated swivel frame allowing reciprocal step-by-step advance, 1-inch aluminum tubing, and non-marking rubber feet.",
    image: "/images/walker_folding.png"
  },
  {
    id: "RS-RESALE-14",
    name: "Two-Wheeled Steerable Walker with Rear Glides",
    category: "Walker",
    price: 2569,
    location: "Warangal, Telangana",
    material: "Lightweight Tubular Aluminum",
    size: "Doorway Width 23\" · 120 kg Load",
    desc: "Front 5\" solid rubber caster wheels for effortless forward rolling with rear anti-skid nylon glide skis for smooth outdoor travel.",
    image: "/images/walker_steerable.jpg"
  },
  {
    id: "RS-RESALE-15",
    name: "Deluxe Four-Wheel Rollator with Padded Rest Seat",
    category: "Walker",
    price: 3200,
    location: "Mysuru, Karnataka",
    material: "Cobalt-Coated Carbon Steel Frame",
    size: "Seat Width 16\" · 8\" Heavy Wheels",
    desc: "Four 8-inch all-terrain wheels, loop handbrake locks, padded rest seat with curved back support, and detachable under-seat basket.",
    image: "/images/walker_rollator_seat.jpg"
  },
  {
    id: "RS-RESALE-16",
    name: "Discreet In-The-Canal (ITC) Digital Hearing Aid",
    category: "Hearing Aid",
    price: 2800,
    location: "Hyderabad, Telangana",
    material: "Medical-Grade Hypoallergenic Acrylic Shell",
    size: "Custom Ear Canal Fit (Left / Right)",
    desc: "Miniaturized in-canal shell with rotary thumbwheel volume control, 12-channel speech clarity DSP, and moisture-resistant nano-coating.",
    image: "/images/hearing_aid_digital.jpg"
  },
  {
    id: "RS-RESALE-17",
    name: "Digital BTE Hearing Aid with Directional Mics",
    category: "Hearing Aid",
    price: 3800,
    location: "Visakhapatnam, Andhra Pradesh",
    material: "Sweat-Resistant ABS Composite",
    size: "Ergonomic Behind-The-Ear Casing",
    desc: "16-channel DSP sound processor with dual adaptive directional microphones, background noise suppression, and feedback cancellation.",
    image: "/images/hearing_aid_digital.jpg"
  },
  {
    id: "RS-RESALE-18",
    name: "Rechargeable RIC Hearing Aid with Charging Case",
    category: "Hearing Aid",
    price: 5400,
    location: "Secunderabad, Telangana",
    material: "Titanium Sound Tube & Soft Silicone",
    size: "Receiver-In-Canal · Miniature",
    desc: "Modern rechargeable in-canal receiver with magnetic desktop dock, 28 hours active use per charge, and Bluetooth audio compatibility.",
    image: "/images/hearing_aid_rechargeable.jpg"
  },
  {
    id: "RS-RESALE-19",
    name: "Multi-Memory Digital BTE Hearing Aid Pair",
    category: "Hearing Aid",
    price: 4900,
    location: "Nizamabad, Telangana",
    material: "Impact-Resistant Polycarbonate Shell",
    size: "Behind-The-Ear with Comfort Silicone Ear Tip",
    desc: "Programmable environmental noise-reduction modes, dual omni-directional microphones, and telephone telecoil support.",
    image: "/images/hearing_aid_bte.jpg"
  }
];
const initialNotices = [
  {title:"Donation received",body:"Your registered donation DS-D-24018 is in the inspection queue.",time:"Today · 9:40 AM",unread:true},
  {title:"Collection scheduled",body:"DS-D-24012 collection pickup window arranged with regional hub logistics coordinator.",time:"Yesterday",unread:true},
  {title:"Safety standards verified",body:"All refurbished assistive devices pass certified 7-stage quality checks before distribution.",time:"12 Oct",unread:false},
  {title:"Hub intake completed",body:"Equipment receipt and initial integrity inspection confirmed at regional hub.",time:"11 Oct",unread:false}
];
const getNavItems = (t) => [
  ["donations", IconDonations, t.navDonations],
  ["inventory", IconInventory, t.navInventory],
  ["status", IconStatus, t.navStatus],
  ["purchase", IconPurchase, t.navPurchase],
  ["requests", IconNGO, t.navRequests],
  ["notifications", IconBell, t.navNotifications],
  ["resale", IconResale, t.navResale],
  ["profile", IconProfile, t.navProfile]
];
const navItems = [
  ["donations", IconDonations, "My donations"],
  ["inventory", IconInventory, "Device inventory"],
  ["status", IconStatus, "Item status"],
  ["purchase", IconPurchase, "Purchase donated items"],
  ["requests", IconNGO, "NGO requests"],
  ["notifications", IconBell, "Notifications"],
  ["resale", IconResale, "Resale items"],
  ["profile", IconProfile, "Profile settings"]
];
const STAGES = [
  {
    step: 1,
    title: "Donation Submitted",
    short: "Submitted",
    statusText: "Submission received",
    desc: "Donor registered device details, condition report, and collection address.",
    detail: "Item specifications, condition report, and donor contact verified.",
    icon: "📝"
  },
  {
    step: 2,
    title: "Collection Scheduled",
    short: "Collection",
    statusText: "Collection Scheduled",
    desc: "Pickup window arranged with local volunteer or logistics coordinator.",
    detail: "Doorstep collection coordinated with district landmark confirmation.",
    icon: "🚚"
  },
  {
    step: 3,
    title: "Hub Intake & Verification",
    short: "Hub Intake",
    statusText: "Received at Hub",
    desc: "Device received at regional refurbishment center and barcoded.",
    detail: "Weight, serial number, and initial physical integrity verified.",
    icon: "📦"
  },
  {
    step: 4,
    title: "Technical Inspection",
    short: "Inspection",
    statusText: "Inspection Pending",
    desc: "Certified mobility technician performs comprehensive mechanical evaluation.",
    detail: "Frame stress test, wheel bearings, braking lock, and folding integrity.",
    icon: "🔍"
  },
  {
    step: 5,
    title: "Refurbishment & Sanitization",
    short: "Refurbishment",
    statusText: "Refurbishment in Progress",
    desc: "Repairs completed, worn parts renewed, deep hospital-grade sanitization.",
    detail: "Tire replacement, grip padding renewed, lubrication, and antimicrobial wash.",
    icon: "🛠️"
  },
  {
    step: 6,
    title: "Quality Certification",
    short: "Certification",
    statusText: "Quality Certified",
    desc: "Final load-bearing test passed; safety certification tag affixed.",
    detail: "Dual-technician sign-off certifying device meets mobility safety standards.",
    icon: "✅"
  },
  {
    step: 7,
    title: "Allocated & Delivered",
    short: "Allocated",
    statusText: "Allocated to Recipient",
    desc: "Matched to verified community NGO or direct beneficiary request.",
    detail: "Handover completed, custom fit verified, and mobility restored.",
    icon: "🤝"
  }
];

const DEVICE_TYPES = [
  {
    id: "wheelchairs",
    category: "Wheelchair",
    title: "Wheelchairs",
    image: "/images/wheelchair_manual.png",
    icon: IconWheelchair,
    badge: "Primary Mobility Aid",
    summary: "Seated mobility devices restoring personal independence, clinical transit, and outdoor travel.",
    description: "Built for individuals with significant lower-limb mobility impairment, spinal injuries, or bilateral amputations. Engineered for structural rigidity, ease of vehicle transit, and comfortable ergonomic seating across multiple high-strength materials.",
    variants: [
      { name: "Standard Chrome Hospital Wheelchair", desc: "Heavy-duty triple-chrome cross-brace steel frame with self-propelling 24\" rear wheels and companion parking brakes." },
      { name: "Folding Manual Wheelchair", desc: "Dual cross-brace frame with self-propelling 24\" rear wheels and hand rims." },
      { name: "Transit Wheelchair", desc: "Lightweight compact frame with 8\" rear caster wheels and attendant handbrakes." },
      { name: "High-Modulus 3K Carbon-Fiber Sport Wheelchair", desc: "Monocoque carbon active chassis weighing under 7 kg for effortless independent propulsion." },
      { name: "Aerospace Titanium Rigid Active Wheelchair", desc: "Seamless Grade 9 titanium open frame with minimalist chassis absorbing road vibration." },
      { name: "Pediatric Junior Wheelchair", desc: "Compact 14\" seat width with flip-up armrests for growing children." }
    ],
    specs: [
      { label: "Weight Capacity", value: "100 – 135 kg" },
      { label: "Seat Width Options", value: "14\", 16\", 18\", 20\", 22\"" },
      { label: "Frame Materials", value: "Triple-chrome steel / Aircraft aluminum / 3K Carbon / Grade 9 Titanium" },
      { label: "Wheel Type", value: "Solid puncture-proof PU / Spoke rims" }
    ],
    checklist: [
      "Cross-brace weld integrity & frame alignment",
      "Dual rear-wheel parking brake locks",
      "Swing-away footrests & calf support straps",
      "Sanitized flame-retardant nylon upholstery"
    ]
  },
  {
    id: "crutches",
    category: "Crutches",
    title: "Crutches",
    image: "/images/crutches_forearm.png",
    icon: IconCrutches,
    badge: "Weight-Bearing Aid",
    summary: "Upper-body weight transfer supports for unilateral lower-limb injuries, post-surgery, or gait stability.",
    description: "Designed to shift body weight from an injured or affected leg to the torso and arms. Available in forearm elbow cuff, heavy-duty hospital underarm, and shock-absorbing spring configurations.",
    variants: [
      { name: "Adjustable Elbow / Forearm Crutches", desc: "Ergonomic molded arm cuff with contour grip and incremental height push-pins." },
      { name: "Carbon-Fiber Ultra-Lightweight Forearm Crutches", desc: "Continuous 3K twill carbon fiber construction weighing only 310 grams per unit." },
      { name: "Heavy-Duty Hospital Axillary Underarm Crutches", desc: "Extruded 6061-T6 dual aluminum struts with closed-cell washable foam pads." },
      { name: "Axillary (Underarm) Crutches", desc: "Padded foam underarm rests with dual aluminum struts and center handgrips." },
      { name: "Shock-Absorbing Spring-Tip Crutches", desc: "Internal spring mechanism reducing impact stress on wrists and shoulders." }
    ],
    specs: [
      { label: "Height Range", value: "4'6\" – 6'4\" (137 – 193 cm)" },
      { label: "Weight Capacity", value: "100 – 125 kg per pair" },
      { label: "Adjustment", value: "Push-button (1\" increments)" },
      { label: "Tip Material", value: "Reinforced non-slip natural rubber" }
    ],
    checklist: [
      "Positive-locking brass push-button security",
      "Arm cuff pivot rivets and structural tubing",
      "Ferrule tread depth & internal steel washer",
      "Hypoallergenic sanitized grip padding"
    ]
  },
  {
    id: "walkers",
    category: "Walker",
    title: "Walkers",
    image: "/images/walker_folding.png",
    icon: IconWalker,
    badge: "Balance & Gait Support",
    summary: "Four-point wide base frames providing multi-directional balance for elderly mobility and neurological rehabilitation.",
    description: "Provides maximum stability for individuals experiencing general balance loss, post-stroke recovery, or gait unsteadiness. Wide stance allows confidence without requiring heavy wrist grip.",
    variants: [
      { name: "Standard Reciprocal Folding Walker", desc: "Articulated side frames enabling alternating reciprocal step-forward movement." },
      { name: "Reciprocal Folding Walking Frame", desc: "Lightweight 1-inch aluminum frame with dual-release folding triggers." },
      { name: "Two-Wheeled Steerable Walker", desc: "Front 5\" caster wheels for smooth stride glide with rear non-skid rubber feet." },
      { name: "Four-Wheel Rollator with Rest Seat & Brakes", desc: "Padded rest seat, under-seat shopping basket, and loop handbrakes for outdoor walking." }
    ],
    specs: [
      { label: "Weight Capacity", value: "110 – 140 kg" },
      { label: "Base Width", value: "23\" – 26\" (doorway fit)" },
      { label: "Folded Depth", value: "4 inches (flat storage)" },
      { label: "Unit Weight", value: "2.4 – 6.5 kg lightweight alloy" }
    ],
    checklist: [
      "Center push-button folding latch rigidity",
      "Four-point rubber foot ferrule grip & traction",
      "Handle grip bonding & non-slip texture",
      "Wheel hub alignment and brake cable tension"
    ]
  },
  {
    id: "hearing_aids",
    category: "Hearing Aid",
    title: "Hearing Aids",
    image: "/images/hearing_aid_digital.jpg",
    icon: IconHearingAid,
    badge: "Auditory Assistive Aid",
    summary: "Digital acoustic sound processing devices restoring speech clarity, tone discrimination, and communication independence.",
    description: "Designed for individuals with mild to profound sensorineural or conductive hearing loss. Features digital multi-channel DSP noise suppression, feedback cancellation, and speech clarity enhancement.",
    variants: [
      { name: "Discreet Custom In-The-Canal (ITC) Aid", desc: "Miniaturized shell fitting directly in the ear canal with rotary volume thumbwheel and speech DSP." },
      { name: "Digital BTE (Behind-The-Ear) Aid", desc: "Ergonomic casing seated behind the ear with clear acoustic sound tube and directional microphones." },
      { name: "Rechargeable RIC (Receiver-In-Canal) with Charging Case", desc: "Miniature in-ear speaker with magnetic desktop charging dock and 28-hr runtime." },
      { name: "Multi-Memory Digital BTE Hearing Aid Pair", desc: "Binaural DSP processor with dual directional mics, background noise suppression, and telecoil." }
    ],
    specs: [
      { label: "Frequency Range", value: "200 Hz – 8,500 Hz" },
      { label: "Max Sound Output", value: "115 – 135 dB SPL" },
      { label: "Battery Life", value: "Lithium-ion rechargeable (28 hrs) / Size 13 Zinc-Air" },
      { label: "Digital Processing", value: "12 – 16 frequency channels" }
    ],
    checklist: [
      "Microphone frequency response & acoustic gain calibration",
      "Acoustic feedback and whistling suppression test",
      "Battery contact integrity and charging circuit test",
      "Ultrasonic cleaning, wax guard replacement & UV sanitization"
    ]
  }
];

const donatedStoreCatalog = [
  {
    id: "DON-BUY-01",
    donationId: "DS-D-24018",
    name: "Certified folding manual wheelchair",
    category: "Wheelchair",
    image: "/images/wheelchair_manual.png",
    handlingPrice: 1200,
    originalValue: 8500,
    condition: "Refurbished · Grade A",
    hub: "Hyderabad Regional Hub, Telangana",
    specs: "18\" seat width, dual rear parking brakes, fold-down footrests",
    cert: "Safety & Sanitization Certified",
    qtyAvailable: 2,
    donorNote: "Overhauled with new bearings and sanitized upholstery."
  },
  {
    id: "DON-BUY-02",
    donationId: "DS-D-24012",
    name: "Adjustable elbow crutches (pair)",
    category: "Crutches",
    image: "/images/crutches_forearm.png",
    handlingPrice: 350,
    originalValue: 1400,
    condition: "Refurbished · Grade A",
    hub: "Warangal Hub, Telangana",
    specs: "Lightweight aluminum, 10-step push-button height, ergonomic handgrips",
    cert: "Ferrule Grip Verified",
    qtyAvailable: 4,
    donorNote: "New natural rubber anti-skid suction ferrules fitted."
  },
  {
    id: "DON-BUY-03",
    donationId: "DS-D-23994",
    name: "Reciprocal folding walker",
    category: "Walker",
    image: "/images/walker_folding.png",
    handlingPrice: 550,
    originalValue: 2200,
    condition: "Refurbished · Grade A",
    hub: "Vijayawada Hub, Andhra Pradesh",
    specs: "Side-folding trigger, 130 kg capacity, height adjustable 32\"–39\"",
    cert: "Hinge Rigidity Certified",
    qtyAvailable: 3,
    donorNote: "Lubricated hinges, sanitized grips, new rubber feet."
  },
  {
    id: "DON-BUY-04",
    donationId: "DS-D-23910",
    name: "Four-wheel rollator with seat & brakes",
    category: "Walker",
    image: "/images/walker_rollator.png",
    handlingPrice: 1100,
    originalValue: 4500,
    condition: "Refurbished · Grade A",
    hub: "Secunderabad Hub, Telangana",
    specs: "Padded rest seat, under-seat storage basket, dual loop handbrakes",
    cert: "Brake & Load Certified",
    qtyAvailable: 1,
    donorNote: "Brake cables tensioned, wheel alignment checked."
  },
  {
    id: "DON-BUY-05",
    donationId: "DS-D-23845",
    name: "Compact transit attendant wheelchair",
    category: "Wheelchair",
    image: "/images/wheelchair_transit.png",
    handlingPrice: 950,
    originalValue: 6200,
    condition: "Refurbished · Grade A",
    hub: "Hyderabad Regional Hub, Telangana",
    specs: "Foldable backrest, 8-inch rear casters, companion handbrakes",
    cert: "Sanitization & Brake Verified",
    qtyAvailable: 2,
    donorNote: "Lightweight travel wheelchair; thoroughly steam-sanitized."
  },
  {
    id: "DON-BUY-06",
    donationId: "DS-D-23801",
    name: "Underarm axillary crutches (pair)",
    category: "Crutches",
    image: "/images/crutches_axillary_pair.jpg",
    handlingPrice: 280,
    originalValue: 1100,
    condition: "Refurbished · Grade A",
    hub: "Visakhapatnam Hub, Andhra Pradesh",
    specs: "Dual-strut aluminum frame, foam underarm pads, handgrip pins",
    cert: "Load Tested to 115 kg",
    qtyAvailable: 5,
    donorNote: "Brand new closed-cell foam pads and suction tips installed."
  },
  {
    id: "DON-BUY-07",
    donationId: "DS-D-23789",
    name: "Digital 12-channel BTE Hearing Aid",
    category: "Hearing Aid",
    image: "/images/hearing_aid_digital.jpg",
    handlingPrice: 450,
    originalValue: 7500,
    condition: "Refurbished · Grade A",
    hub: "Hyderabad Audiology Hub, Telangana",
    specs: "12 digital channels, noise reduction, feedback cancellation, size 13 zinc-air",
    cert: "Acoustically Calibrated & UV Sanitized",
    qtyAvailable: 6,
    donorNote: "Acoustic output calibrated to 125 dB with brand new earmold tubing and silicone domes."
  },
  {
    id: "DON-BUY-08",
    donationId: "DS-D-23740",
    name: "Rechargeable RIC Hearing Aid with Charging Case",
    category: "Hearing Aid",
    image: "/images/hearing_aid_rechargeable.jpg",
    handlingPrice: 850,
    originalValue: 14500,
    condition: "Refurbished · Grade A+",
    hub: "Visakhapatnam Hub, Andhra Pradesh",
    specs: "Lithium-ion magnetic charging dock, dual directional mics, 28-hr runtime",
    cert: "Battery & Audio Certified",
    qtyAvailable: 3,
    donorNote: "Barely used; battery capacity tested at 98%, complete with charging case and sterilized tips."
  },
  {
    id: "DON-BUY-09",
    donationId: "DS-D-23712",
    name: "Pediatric Lightweight Wheelchair (14\" Seat)",
    category: "Wheelchair",
    image: "/images/wheelchair_pediatric.jpg",
    handlingPrice: 950,
    originalValue: 9200,
    condition: "Refurbished · Grade A",
    hub: "Hyderabad Regional Hub, Telangana",
    specs: "14\" seat width, swing-away footrests, anti-tippers, child-safe push locks",
    cert: "Pediatric Ergonomics & Safety Verified",
    qtyAvailable: 3,
    donorNote: "Lightweight pediatric frame with new sanitized breathable seat upholstery."
  },
  {
    id: "DON-BUY-10",
    donationId: "DS-D-23680",
    name: "Mobile Commode & Transit Wheelchair",
    category: "Wheelchair",
    image: "/images/wheelchair_transit.png",
    handlingPrice: 1350,
    originalValue: 8800,
    condition: "Refurbished · Grade A+",
    hub: "Warangal Hub, Telangana",
    specs: "Removable pail with lid, water-resistant PU seat, 4-wheel lockable casters",
    cert: "Hospital Sanitized & Sealed",
    qtyAvailable: 2,
    donorNote: "Includes brand new sterilized bucket and sealed hygiene seat cushion."
  },
  {
    id: "DON-BUY-11",
    donationId: "DS-D-23645",
    name: "Quad Cane with Four-Point Wide Base",
    category: "Walker",
    image: "/images/crutches_forearm.png",
    handlingPrice: 290,
    originalValue: 1200,
    condition: "Refurbished · Grade A",
    hub: "Vijayawada Hub, Andhra Pradesh",
    specs: "Contoured offset handle, self-standing four-point base, 10-step height adjustment",
    cert: "Tread & Ferrule Verified",
    qtyAvailable: 7,
    donorNote: "Equipped with brand new steel-reinforced rubber base ferrules."
  },
  {
    id: "DON-BUY-12",
    donationId: "DS-D-23610",
    name: "Pediatric Folding Posture Walker",
    category: "Walker",
    image: "/images/walker_folding.png",
    handlingPrice: 650,
    originalValue: 3400,
    condition: "Refurbished · Grade A",
    hub: "Secunderabad Hub, Telangana",
    specs: "Lightweight youth frame, anterior handgrips, one-button quick fold mechanism",
    cert: "Hinge Rigidity & Height Tested",
    qtyAvailable: 4,
    donorNote: "Adjusted for growing youth; smooth folding action with non-marking tips."
  },
  {
    id: "DON-BUY-13",
    donationId: "DS-D-23588",
    name: "Standard Reciprocal Stepping Folding Walker",
    category: "Walker",
    image: "/images/walker_folding.png",
    handlingPrice: 520,
    originalValue: 2600,
    condition: "Refurbished · Grade A+",
    hub: "Visakhapatnam Hub, Andhra Pradesh",
    specs: "1-inch anodized aluminum tubing, dual-release folding paddle, non-slip contoured handgrips",
    cert: "Hinge Rigidity & Stability Certified",
    qtyAvailable: 3,
    donorNote: "Fully sanitized with new non-marking rubber feet and calibrated push-button height adjusters."
  },
  {
    id: "DON-BUY-14",
    donationId: "DS-D-23550",
    name: "Multi-Memory Digital BTE Hearing Aid Pair",
    category: "Hearing Aid",
    image: "/images/hearing_aid_bte.jpg",
    handlingPrice: 890,
    originalValue: 15000,
    condition: "Refurbished · Grade A+",
    hub: "Hyderabad Audiology Hub, Telangana",
    specs: "Binaural pair, 4 listening programs (speech, noise, outdoors, music), size 13 battery",
    cert: "Acoustically Calibrated & Ear-Matched",
    qtyAvailable: 4,
    donorNote: "Complete stereo pair with storage box, extra domes, and cleaning brush."
  }
];

const initialNgoRequests = [
  {
    id: "NGO-REQ-01",
    org: "Sahaya Community Centre",
    state: "Telangana",
    district: "Hyderabad",
    contact: "coordinator@sahayacommunity.org · +91 98490 22334",
    coordinator: "K. Anuradha",
    regNo: "TS/HYD/2018/00482",
    equipment: "Wheelchairs & Crutches",
    qty: 5,
    purpose: "Mobility support for community outpatient clinic visitors and homebound elderly.",
    date: "12 Oct 2026",
    status: "Approved",
    verified: true
  },
  {
    id: "NGO-REQ-02",
    org: "Aastha Disability Welfare Foundation",
    state: "Telangana",
    district: "Secunderabad",
    contact: "support@aasthafoundation.org · +91 98491 55670",
    coordinator: "M. Rajeshwar",
    regNo: "TS/SCB/2019/01244",
    equipment: "Transit Attendant Wheelchairs",
    qty: 4,
    purpose: "Patient transit assistance for slum-cluster accessible transport van.",
    date: "14 Oct 2026",
    status: "Approved",
    verified: true
  },
  {
    id: "NGO-REQ-03",
    org: "Spoorthi Rehabilitation Trust",
    state: "Telangana",
    district: "Warangal",
    contact: "info@spoorthitrust.org · +91 98480 33219",
    coordinator: "Dr. P. Srinivas",
    regNo: "TS/WGL/2016/00812",
    equipment: "Reciprocal Folding Walkers",
    qty: 6,
    purpose: "Post-stroke neurological rehabilitation and physical therapy training camp.",
    date: "16 Oct 2026",
    status: "Under Review",
    verified: true
  },
  {
    id: "NGO-REQ-04",
    org: "Sneha Divyang Seva Samithi",
    state: "Telangana",
    district: "Karimnagar",
    contact: "snehadivyang@gmail.com · +91 97010 44521",
    coordinator: "B. Venkatesh",
    regNo: "TS/KRM/2020/00341",
    equipment: "Digital BTE Hearing Aids",
    qty: 4,
    purpose: "Acoustic rehabilitation for rural school children with congenital hearing impairment.",
    date: "18 Oct 2026",
    status: "Approved",
    verified: true
  },
  {
    id: "NGO-REQ-05",
    org: "Nethra Jyothi Welfare Society",
    state: "Telangana",
    district: "Nizamabad",
    contact: "nethrajyothi@yahoo.co.in · +91 94401 22345",
    coordinator: "G. Vani",
    regNo: "TS/NZB/2017/00569",
    equipment: "Adjustable Forearm Elbow Crutches",
    qty: 8,
    purpose: "Support for agrarian workers recovering from lower-limb fractures.",
    date: "19 Oct 2026",
    status: "Under Review",
    verified: true
  },
  {
    id: "NGO-REQ-06",
    org: "Amma Vodi Social Welfare Society",
    state: "Telangana",
    district: "Khammam",
    contact: "ammavodi.khammam@gmail.com · +91 98493 88712",
    coordinator: "K. Swaroopa",
    regNo: "TS/KHM/2018/00918",
    equipment: "High-Back Reclining Wheelchairs",
    qty: 2,
    purpose: "Care for quadriplegic and bedridden rural patients in palliative care hospice.",
    date: "20 Oct 2026",
    status: "Approved",
    verified: true
  },
  {
    id: "NGO-REQ-07",
    org: "Prerana Inclusive Mobility Hub",
    state: "Telangana",
    district: "Mahabubnagar",
    contact: "prerana.hub@gmail.com · +91 96180 55432",
    coordinator: "T. Naresh Kumar",
    regNo: "TS/MBN/2021/00192",
    equipment: "Four-Wheel Rollators with Rest Seat",
    qty: 5,
    purpose: "Independent mobility for rural senior citizens with arthritic joint stiffness.",
    date: "21 Oct 2026",
    status: "Under Review",
    verified: true
  },
  {
    id: "NGO-REQ-08",
    org: "Navajeevan Rehabilitation Centre",
    state: "Andhra Pradesh",
    district: "Vijayawada",
    contact: "contact@navajeevanrehab.org · +91 98481 77654",
    coordinator: "Fr. Thomas Varghese",
    regNo: "AP/VJA/2015/00234",
    equipment: "Folding Manual Wheelchairs",
    qty: 7,
    purpose: "Vocational training centre access for youth with lower extremity paralysis.",
    date: "22 Oct 2026",
    status: "Approved",
    verified: true
  },
  {
    id: "NGO-REQ-09",
    org: "Chaitanya Rural Disability Foundation",
    state: "Andhra Pradesh",
    district: "Guntur",
    contact: "chaitanya.disability@gmail.com · +91 94405 66789",
    coordinator: "V. Samba Siva Rao",
    regNo: "AP/GNT/2019/00645",
    equipment: "Axillary Underarm Crutches (pairs)",
    qty: 10,
    purpose: "Distribution at primary health sub-centres for seasonal trauma patients.",
    date: "23 Oct 2026",
    status: "Approved",
    verified: true
  },
  {
    id: "NGO-REQ-10",
    org: "Sankalp Divyangjan Society",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    contact: "sankalp.vizag@org.in · +91 98660 11234",
    coordinator: "S. Padmavathi",
    regNo: "AP/VSP/2017/00788",
    equipment: "Rechargeable RIC Hearing Aids",
    qty: 4,
    purpose: "Fisherfolk community hearing screening and free sound amplifier camp.",
    date: "24 Oct 2026",
    status: "Under Review",
    verified: true
  },
  {
    id: "NGO-REQ-11",
    org: "Suraksha Leprosy & Mobility Mission",
    state: "Andhra Pradesh",
    district: "Tirupati",
    contact: "suraksha.mission@tirupati.org · +91 98495 44321",
    coordinator: "Dr. B. Chandra Sekhar",
    regNo: "AP/TPT/2014/00115",
    equipment: "Two-Wheeled Steerable Walkers",
    qty: 4,
    purpose: "Gait re-training and foot-drop protection for recovering leprosy patients.",
    date: "25 Oct 2026",
    status: "Approved",
    verified: true
  },
  {
    id: "NGO-REQ-12",
    org: "Mitra Community Care Foundation",
    state: "Andhra Pradesh",
    district: "Kurnool",
    contact: "mitracare.kurnool@gmail.com · +91 97040 88901",
    coordinator: "R. Jayaprakash",
    regNo: "AP/KNL/2020/00452",
    equipment: "Folding Transit Wheelchairs",
    qty: 3,
    purpose: "Doorstep transport support for rural dialysis and chemocare patients.",
    date: "26 Oct 2026",
    status: "Under Review",
    verified: true
  },
  {
    id: "NGO-REQ-13",
    org: "Samarthya Special Mobility Center",
    state: "Andhra Pradesh",
    district: "Nellore",
    contact: "samarthya.nellore@gmail.com · +91 99890 22314",
    coordinator: "M. Subrahmanyam",
    regNo: "AP/NLR/2018/00389",
    equipment: "Pediatric Wheelchairs & Anterior Walkers",
    qty: 4,
    purpose: "Special school for children with cerebral palsy and spina bifida.",
    date: "27 Oct 2026",
    status: "Approved",
    verified: true
  },
  {
    id: "NGO-REQ-14",
    org: "Belaku Inclusive Institute",
    state: "Karnataka",
    district: "Bengaluru Rural",
    contact: "coordinator@belakuinstitute.org · +91 98450 66778",
    coordinator: "Smt. Shanta Gowda",
    regNo: "KA/BLR/2016/00984",
    equipment: "Forearm Crutches & Four-Wheel Rollators",
    qty: 6,
    purpose: "Suburban vocational integration for physically challenged young adults.",
    date: "28 Oct 2026",
    status: "Under Review",
    verified: true
  },
  {
    id: "NGO-REQ-15",
    org: "Karuna Child & Youth Disability Trust",
    state: "Karnataka",
    district: "Mysuru",
    contact: "karunatrust.mysuru@gmail.com · +91 98860 33445",
    coordinator: "H. Mahesh",
    regNo: "KA/MYS/2019/00512",
    equipment: "Pediatric Junior Folding Walkers",
    qty: 5,
    purpose: "Inclusive mainstream school transition for children with locomotor limitations.",
    date: "29 Oct 2026",
    status: "Approved",
    verified: true
  }
];

const initialPurchases = [
  {
    id: "ORD-94812",
    deviceId: "DS-D-24018",
    name: "Refurbished folding manual wheelchair",
    category: "Wheelchair",
    price: 1200,
    paymentMethod: "UPI / Online Payment",
    date: "18 Oct 2026",
    status: "Dispatched from Hub",
    eta: "Tomorrow by 4:00 PM",
    trackingId: "TRACK-HYD-58291",
    recipient: "Ramesh Kumar",
    address: "Plot 42, Hitech City Road, Hyderabad, Telangana - 500081"
  }
];

const money = n => "₹" + Number(n).toLocaleString("en-IN");
const read = (key, fallback) => { try { const v=localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };

const defaultProfile = {
  name: "Suresh Kumar",
  email: "suresh.kumar@example.org",
  mobile: "+91 98490 54321",
  state: "Telangana",
  district: "Hyderabad",
  pin: "500034",
  type: "Donor",
  address: "Road No. 12, Banjara Hills"
};

const sampleUdidHolders = [
  {
    udid: "TG0120119950012345",
    name: "Ramesh Kumar",
    disabilityType: "Locomotor Disability",
    disabilityPercent: 75,
    email: "ramesh.udid@example.org",
    mobile: "+91 98490 12345",
    state: "Telangana",
    district: "Hyderabad",
    pin: "500001",
    address: "H.No. 4-12/A, Koti, Hyderabad",
    requiredAid: "Certified Manual Wheelchair"
  },
  {
    udid: "AP0420219980092143",
    name: "Anitha Reddy",
    disabilityType: "Orthopedic Impairment",
    disabilityPercent: 60,
    email: "anitha.udid@example.org",
    mobile: "+91 98480 54321",
    state: "Andhra Pradesh",
    district: "Vijayawada",
    pin: "520002",
    address: "Plot 18, Governorpet, Vijayawada",
    requiredAid: "Folding Walking Frame"
  }
];

export default function App() {
  const [profile,setProfile] = useState(()=>read("ds-profile",defaultProfile));
  const [isAuthenticated,setIsAuthenticated] = useState(()=>Boolean(read("ds-authenticated",false)));
  const [authMode,setAuthMode] = useState("signup");
  const [authPortal,setAuthPortal] = useState(()=>{
    if (typeof window !== "undefined" && window.location.hash.toLowerCase().includes("udid")) return "udid";
    return "general";
  });
  const [udidPreview,setUdidPreview] = useState({
    udid: "TG0120119950012345",
    name: "Ramesh Kumar",
    disability: "Locomotor Disability (75%)"
  });
  const [page,setPage] = useState("donations");
  const [devices,setDevices] = useState(() => {
    const saved = read("ds-devices", null);
    if (!saved) return initialDevices;
    const cleaned = saved.filter(d => !d.name.toLowerCase().includes("blade") && d.category !== "Prosthetics");
    const requiredIds = ["DS-D-24072", "DS-D-24073", "DS-D-24074", "DS-D-24076"];
    const hasRequired = requiredIds.every(id => cleaned.some(d => d.id === id));
    return hasRequired ? cleaned : initialDevices;
  });
  const [selectedDeviceType, setSelectedDeviceType] = useState(null);
  const [selectedStatusDevice, setSelectedStatusDevice] = useState(null);
  const [ngoRequests, setNgoRequests] = useState(() => read("ds-ngos", initialNgoRequests));
  const [ngoSearch, setNgoSearch] = useState("");
  const [ngoStateFilter, setNgoStateFilter] = useState("All states");
  const [notices,setNotices] = useState(()=>read("ds-notices",initialNotices));
  const [search,setSearch] = useState("");
  const [toast,setToast] = useState("");
  const [modal,setModal] = useState("");
  const [editingDevice,setEditingDevice] = useState(null);
  const [category,setCategory] = useState("All categories");
  const [sort,setSort] = useState("Lowest price");
  const [statusFilter,setStatusFilter] = useState("All statuses");
  const [inventoryCondition,setInventoryCondition] = useState("All conditions");
  const [stageFilter,setStageFilter] = useState("All stages");
  const [deviceTypeFilter,setDeviceTypeFilter] = useState("All device types");
  const [inventoryTab,setInventoryTab] = useState("items");
  const [inventorySearch,setInventorySearch] = useState("");
  const [purchases,setPurchases] = useState(()=>read("ds-purchases",initialPurchases));
  const [purchasingItem,setPurchasingItem] = useState(null);
  const [purchaseTab,setPurchaseTab] = useState("available");
  const [purchaseCategory,setPurchaseCategory] = useState("All categories");
  const [purchaseSearch,setPurchaseSearch] = useState("");
  const [language,setLanguage] = useState(()=>read("ds-language","English"));
  const [largeText,setLargeText] = useState(false);
  const [highContrast,setHighContrast] = useState(false);
  const [sidebarCollapsed,setSidebarCollapsed] = useState(()=>read("ds-sidebar-collapsed",false));
  const [profileTab,setProfileTab] = useState("profile");

  useEffect(()=>{localStorage.setItem("ds-devices",JSON.stringify(devices));},[devices]);
  useEffect(()=>{localStorage.setItem("ds-ngos",JSON.stringify(ngoRequests));},[ngoRequests]);
  useEffect(()=>{localStorage.setItem("ds-notices",JSON.stringify(notices));},[notices]);
  useEffect(()=>{localStorage.setItem("ds-purchases",JSON.stringify(purchases));},[purchases]);
  useEffect(()=>{localStorage.setItem("ds-sidebar-collapsed",JSON.stringify(sidebarCollapsed));},[sidebarCollapsed]);
  useEffect(()=>{localStorage.setItem("ds-language",JSON.stringify(language));},[language]);
  useEffect(()=>{if(profile)localStorage.setItem("ds-profile",JSON.stringify(profile));else localStorage.removeItem("ds-profile");},[profile]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(""),2800);return ()=>clearTimeout(t);},[toast]);

  const t = useMemo(() => translations[language] || translations.English, [language]);
  const currentNavItems = useMemo(() => getNavItems(t, profile), [t, profile]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    const msg = (translations[newLang] || translations.English).langChangedToast || `Language switched to ${newLang}`;
    setToast(msg);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = (typeof window !== "undefined" ? window.location.hash : "").toLowerCase();
      if (hash.includes("udid")) {
        setAuthPortal("udid");
      } else if (hash.includes("general")) {
        setAuthPortal("general");
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const switchPortal = (p) => {
    setAuthPortal(p);
    if (typeof window !== "undefined") {
      window.location.hash = p === "udid" ? "udid" : "general";
    }
  };

  const unread = notices.filter(n=>n.unread).length;
  const visibleListings = useMemo(()=>listings.filter(x=>(x.name+" "+x.category+" "+x.id+" "+x.location).toLowerCase().includes(search.toLowerCase())&&(category==="All categories"||x.category===category)).sort((a,b)=>sort==="Highest price"?b.price-a.price:a.price-b.price),[search,category,sort]);
  const visibleDonations = devices.filter(d=>(d.name+" "+d.id+" "+d.status).toLowerCase().includes(search.toLowerCase()));
  const filteredInventory = useMemo(() => devices.filter(d => 
    (category === "All categories" || d.category === category) &&
    (inventoryCondition === "All conditions" || d.condition === inventoryCondition) &&
    (stageFilter === "All stages" || String(d.stage) === String(stageFilter))
  ), [devices, category, inventoryCondition, stageFilter]);
  const visibleDeviceTypes = useMemo(() => DEVICE_TYPES.filter(t => 
    deviceTypeFilter === "All device types" || t.title === deviceTypeFilter || t.category === deviceTypeFilter
  ), [deviceTypeFilter]);
  const availablePurchases = useMemo(() => donatedStoreCatalog.filter(item => {
    const matchesCat = purchaseCategory === "All categories" || item.category === purchaseCategory;
    const matchesSearch = (item.name + " " + item.category + " " + item.hub + " " + item.donationId).toLowerCase().includes(purchaseSearch.toLowerCase());
    return matchesCat && matchesSearch;
  }), [purchaseCategory, purchaseSearch]);
  const filteredInventoryItems = useMemo(() => donatedStoreCatalog.filter(item => {
    const matchesCat = deviceTypeFilter === "All device types" ||
      item.category.toLowerCase().includes(deviceTypeFilter.toLowerCase()) ||
      (deviceTypeFilter === "Wheelchairs" && item.category === "Wheelchair") ||
      (deviceTypeFilter === "Walkers" && item.category === "Walker") ||
      (deviceTypeFilter === "Crutches" && item.category === "Crutches") ||
      (deviceTypeFilter === "Hearing Aids" && item.category === "Hearing Aid");
    const matchesSearch = (item.name + " " + item.category + " " + item.specs + " " + item.hub + " " + item.donationId).toLowerCase().includes(inventorySearch.toLowerCase());
    return matchesCat && matchesSearch;
  }), [deviceTypeFilter, inventorySearch]);
  const title = currentNavItems.find(n=>n[0]===page)?.[2] || t.dashboard;
  const go = p => {setSelectedStatusDevice(null);setSelectedDeviceType(null);if(p==="upgrade"){setPage("profile");setProfileTab("upgrade");}else{setPage(p);}setSearch("");setCategory("All categories");setStageFilter("All stages");setDeviceTypeFilter("All device types");setPurchaseCategory("All categories");setPurchaseSearch("");setInventorySearch("");window.scrollTo({top:0,behavior:"smooth"});};

  function submitPurchase(e){
    e.preventDefault();
    if(!purchasingItem) return;
    const f = new FormData(e.currentTarget);
    const orderId = "ORD-" + Math.floor(10000 + Math.random() * 89999);
    const paymentMethod = String(f.get("paymentMethod") || "");
    const isFree = paymentMethod.includes("UDID");
    const trackingId = "TRACK-HYD-" + Math.floor(10000 + Math.random() * 89999);
    const price = isFree ? 0 : (purchasingItem.handlingPrice || 0);

    const newOrder = {
      id: orderId,
      deviceId: purchasingItem.donationId || purchasingItem.id,
      name: purchasingItem.name,
      category: purchasingItem.category,
      price,
      paymentMethod,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Dispatched from Hub",
      eta: "Within 2-3 working days",
      trackingId,
      recipient: f.get("name"),
      address: `${f.get("address")}, ${f.get("district")}, ${f.get("state")} - ${f.get("pin")}`
    };

    setPurchases(prev => [newOrder, ...prev]);
    setNotices(prev => [{
      title: `Order confirmed: ${orderId}`,
      body: `Your request for "${purchasingItem.name}" has been placed. Tracking ID: ${trackingId}.`,
      time: "Just now",
      unread: true
    }, ...prev]);

    setPurchasingItem(null);
    setPurchaseTab("orders");
    setToast(`Order ${orderId} confirmed! Check 'My Orders' tab.`);
  }

  function updateDeviceStage(deviceId, newStage) {
    if (newStage < 1 || newStage > 7) return;
    const stageObj = STAGES.find(s => s.step === newStage);
    setDevices(prev => prev.map(d => {
      if (d.id !== deviceId) return d;
      return {
        ...d,
        stage: newStage,
        status: stageObj ? stageObj.statusText : d.status
      };
    }));
    setToast(`Stage updated to Step ${newStage}: ${stageObj?.title}`);
  }

  function submitSignup(e){
    e.preventDefault();
    const f=new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const mobile = String(f.get("mobile") || "").trim();
    const password = String(f.get("password") || "");
    const confirmPassword = String(f.get("confirmPassword") || "");

    if (!name) {
      setToast("Please enter your Full Name.");
      return;
    }
    if (!email) {
      setToast("Please enter your Email address.");
      return;
    }
    if (!mobile) {
      setToast("Please enter your Phone number.");
      return;
    }
    if (!password) {
      setToast("Please create a password.");
      return;
    }
    if (password.length < 6) {
      setToast("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setToast("Passwords do not match! Please check Confirm Password.");
      return;
    }

    const newProf = {
      name,
      email,
      mobile,
      password,
      type: "Donor",
      state: "Telangana",
      district: "",
      pin: "",
      address: "",
      isProfileUpgraded: false
    };
    setProfile(newProf);
    setIsAuthenticated(true);
    localStorage.setItem("ds-authenticated","true");
    setPage("donations");
    setToast(`Welcome to Divyang-Sahayak, ${newProf.name}!`);
  }

  function submitLogin(e){
    e.preventDefault();
    const f=new FormData(e.currentTarget);
    const loginId=f.get("loginId")||"suresh.kumar@example.org";
    const existing=read("ds-profile",null);
    const loggedProf = existing || {
      name: loginId.includes("@") ? (loginId.split("@")[0].replace("."," ")) : "Demo Donor",
      email: loginId.includes("@") ? loginId : "donor@example.org",
      mobile: !loginId.includes("@") ? loginId : "+91 98490 54321",
      state: "Telangana",
      district: "Hyderabad",
      pin: "500034",
      type: "Donor",
      address: "Road No. 12, Banjara Hills"
    };
    setProfile(loggedProf);
    setIsAuthenticated(true);
    localStorage.setItem("ds-authenticated","true");
    setPage("donations");
    setToast(`Welcome back, ${loggedProf.name}!`);
  }

  function quickLogin(role = "Donor"){
    const demoProf = {
      name: role === "Donor" ? "Suresh Kumar" : role === "NGO" ? "Sahaya Foundation" : "Ramesh Babu",
      email: "suresh.kumar@example.org",
      mobile: "+91 98490 54321",
      state: "Telangana",
      district: "Hyderabad",
      pin: "500034",
      type: role,
      address: "Road No. 12, Banjara Hills, Hyderabad"
    };
    setProfile(demoProf);
    setIsAuthenticated(true);
    localStorage.setItem("ds-authenticated","true");
    setPage("donations");
    setToast(`Logged in as ${demoProf.name} (${demoProf.type})`);
  }

  function quickUdidLogin(holder){
    const prof = {
      name: holder.name,
      email: holder.email,
      mobile: holder.mobile,
      state: holder.state,
      district: holder.district,
      pin: holder.pin,
      type: "Divyangjan Beneficiary",
      address: holder.address,
      udid: holder.udid,
      disabilityType: holder.disabilityType,
      disabilityPercent: holder.disabilityPercent,
      requiredAid: holder.requiredAid,
      isUdidVerified: true
    };
    setProfile(prof);
    setIsAuthenticated(true);
    localStorage.setItem("ds-authenticated","true");
    setPage("purchase");
    setToast(`Welcome ${prof.name}! Verified UDID ${prof.udid} (100% Free Claim Eligible)`);
  }

  function submitUdidLogin(e){
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const rawUdid = String(f.get("udidNumber") || "").trim().toUpperCase();
    if (!rawUdid) {
      setToast("Please enter your UDID Card Number.");
      return;
    }
    const matched = sampleUdidHolders.find(u => u.udid.toUpperCase() === rawUdid);
    const existing = read("ds-profile", null);

    let prof;
    if (existing && existing.udid && existing.udid.toUpperCase() === rawUdid) {
      prof = existing;
    } else if (matched) {
      prof = {
        ...matched,
        type: "Divyangjan Beneficiary",
        isUdidVerified: true,
        isProfileUpgraded: true
      };
    } else {
      prof = {
        udid: rawUdid,
        name: "Divyangjan Cardholder",
        email: "",
        mobile: "",
        state: "Telangana",
        district: "",
        pin: "",
        address: "",
        disabilityType: "Locomotor Disability",
        disabilityPercent: 75,
        requiredAid: "Certified Manual Wheelchair",
        type: "Divyangjan Beneficiary",
        isUdidVerified: true,
        isProfileUpgraded: false
      };
    }

    setProfile(prof);
    setIsAuthenticated(true);
    localStorage.setItem("ds-authenticated","true");
    if (!prof.isProfileUpgraded) {
      setPage("profile");
      setProfileTab("upgrade");
      setToast(`Welcome ${prof.name}! Please complete the Upgrade Profile option in Profile Settings to activate 100% free mobility aid claims.`);
    } else {
      setPage("purchase");
      setToast(`Welcome back, ${prof.name}! UDID: ${prof.udid} verified.`);
    }
  }

  function submitUdidSignup(e){
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const rawUdid = String(f.get("udidNumber") || "").trim().toUpperCase();
    const name = String(f.get("name") || "").trim();
    const password = String(f.get("password") || "");
    const confirmPassword = String(f.get("confirmPassword") || "");

    if (!rawUdid) {
      setToast("Please enter your UDID Card Number.");
      return;
    }
    if (!name) {
      setToast("Please enter your Full Name.");
      return;
    }
    if (!password) {
      setToast("Please create a password.");
      return;
    }
    if (password.length < 6) {
      setToast("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setToast("Passwords do not match! Please verify Confirm Password.");
      return;
    }

    // Auto-match test holder if applicable, otherwise initialize pending upgrade
    const matched = sampleUdidHolders.find(u => u.udid.toUpperCase() === rawUdid);

    const newProf = {
      name,
      udid: rawUdid,
      password,
      type: "Divyangjan Beneficiary",
      isUdidVerified: true,
      isProfileUpgraded: false,
      // Remaining details to be filled in "Upgrade Profile"
      email: matched?.email || "",
      mobile: matched?.mobile || "",
      state: matched?.state || "Telangana",
      district: matched?.district || "",
      pin: matched?.pin || "",
      address: matched?.address || "",
      disabilityType: matched?.disabilityType || "Locomotor Disability",
      disabilityPercent: matched?.disabilityPercent || 75,
      requiredAid: matched?.requiredAid || "Certified Manual Wheelchair"
    };

    setProfile(newProf);
    setIsAuthenticated(true);
    localStorage.setItem("ds-authenticated","true");
    setPage("profile");
    setProfileTab("upgrade");
    setToast(`Account created for ${newProf.name}! Please complete the remaining details in Upgrade Profile.`);
  }

  function submitUpgradeProfile(e){
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const updated = {
      ...profile,
      name: f.get("name") ? String(f.get("name")).trim() : (profile?.name || "Divyangjan Cardholder"),
      udid: f.get("udidNumber") ? String(f.get("udidNumber")).trim().toUpperCase() : (profile?.udid || ""),
      mobile: String(f.get("mobile") || "").trim(),
      email: String(f.get("email") || "").trim(),
      disabilityType: String(f.get("disabilityType") || profile?.disabilityType || "Locomotor Disability"),
      disabilityPercent: Number(f.get("disabilityPercent") || profile?.disabilityPercent || 75),
      requiredAid: String(f.get("requiredAid") || profile?.requiredAid || "Certified Manual Wheelchair"),
      state: String(f.get("state") || profile?.state || "Telangana"),
      district: String(f.get("district") || "").trim(),
      pin: String(f.get("pin") || "").trim(),
      address: String(f.get("address") || "").trim(),
      type: "Divyangjan Beneficiary",
      isProfileUpgraded: true,
      isUdidVerified: true
    };
    setProfile(updated);
    localStorage.setItem("ds-profile", JSON.stringify(updated));
    setModal("");
    setToast("✓ Profile successfully upgraded! 100% Free Device Claim is now active.");
  }

  function enterAsGuest(){
    const guestProf = {
      name: "Guest Explorer",
      email: "guest@example.org",
      mobile: "+91 90000 00000",
      state: "Telangana",
      district: "Hyderabad",
      pin: "500001",
      type: "Donor",
      address: "Hyderabad Central"
    };
    setProfile(guestProf);
    setIsAuthenticated(true);
    localStorage.setItem("ds-authenticated","true");
    setPage("inventory");
    setToast("Exploring Divyang-Sahayak in Guest Mode.");
  }

  function handleLogout(){
    setIsAuthenticated(false);
    setProfile(defaultProfile);
    localStorage.removeItem("ds-authenticated");
    localStorage.removeItem("ds-profile");
    setAuthMode("login");
    setToast("You have been logged out.");
  }

  function submitProfile(e){
    e.preventDefault();
    const f=new FormData(e.currentTarget);
    setProfile(prev => ({
      ...prev,
      name: f.get("name") || prev?.name || "",
      email: f.get("email") || prev?.email || "",
      mobile: f.get("mobile") || prev?.mobile || "",
      type: f.get("type") || prev?.type || "Donor",
      state: f.get("state") || prev?.state || "Telangana",
      district: f.get("district") || prev?.district || "",
      pin: f.get("pin") || prev?.pin || "",
      address: f.get("address") || prev?.address || ""
    }));
    setToast("Profile settings saved successfully!");
  }
  function submitDonation(e){e.preventDefault();const f=new FormData(e.currentTarget);const id="DS-D-"+Math.floor(10000+Math.random()*89999);const cat=f.get("category");const img=cat==="Crutches"?"/images/crutches_forearm.png":cat==="Walker"?"/images/walker_folding.png":cat==="Hearing Aid"?"/images/hearing_aid_digital.jpg":"/images/wheelchair_manual.png";setDevices(prev=>[{id,name:f.get("name"),category:cat,condition:f.get("condition"),state:f.get("state"),district:f.get("district"),date:new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),status:"Submission received",qty:Number(f.get("qty")),stage:1,image:img},...prev]);setNotices(prev=>[{title:"Donation submitted",body:`Your donation ${id} has been registered and is scheduled for verification.`,time:"Just now",unread:true},...prev]);setModal("");setPage("donations");setToast("Donation saved successfully.");}
  function submitEditDonation(e){e.preventDefault();if(!editingDevice)return;const f=new FormData(e.currentTarget);const stageRaw=String(f.get("stage")||"");const stageNum=parseInt(stageRaw.split(" ")[0])||editingDevice.stage||1;const stageObj=STAGES.find(s=>s.step===stageNum);setDevices(prev=>prev.map(d=>{if(d.id!==editingDevice.id)return d;return {...d,name:f.get("name"),category:f.get("category"),condition:f.get("condition"),qty:Number(f.get("qty")),state:f.get("state"),district:f.get("district"),stage:stageNum,status:stageObj?stageObj.statusText:d.status};}));setToast(`Donation ${editingDevice.id} updated.`);setEditingDevice(null);}
  function deleteDonation(id,name){if(confirm(`Are you sure you want to delete donation "${name}" (${id})?`)){setDevices(prev=>prev.filter(d=>d.id!==id));setToast(`Donation ${id} deleted.`);}}
  function markAllRead(){setNotices(prev=>prev.map(n=>({...n,unread:false})));setToast("All notifications marked read.");}
  function resetDemo(){if(confirm("Reset sample data?")){setDevices(initialDevices);setNotices(initialNotices);handleLogout();setToast("Sample data reset.");}}
  const badge=(text,kind="")=><span className={`badge ${kind}`}>{text}</span>;
  const pageHeader=(kicker,heading,sub,action=null)=><><div className="eyebrow">{kicker}</div><div className="heading-row"><div><h1>{heading}</h1><p className="sub">{sub}</p></div>{action}</div></>;
  const deviceDetails=d=><div className="device-detail" key={d.id}><div className="device-emoji">{d.category==="Crutches"?<IconCrutches size={18}/>:d.category==="Walker"?<IconWalker size={18}/>:d.category==="Hearing Aid"?<IconHearingAid size={18}/>:<IconWheelchair size={18}/>}</div><div className="device-body"><div className="line">{badge(d.id)} {badge(d.status,d.stage>=4?"green":"")}</div><h3>{d.name}</h3><p>{d.category} · {d.condition} · qty {d.qty} · {d.district}, {d.state}</p><div className="progress"><span style={{width:`${d.stage/7*100}%`}}/></div><small>Current status: {d.status} · Stage {d.stage} of 7</small></div></div>;

  if (!isAuthenticated) {
    return (
      <div className={`standalone-auth-root ${largeText ? "large-text" : ""} ${highContrast ? "high-contrast" : ""}`}>
        <header className="standalone-auth-header">
          <div className="brand">
            <div className="logo"><IconWheelchair size={22} color="#ffffff" /></div>
            <div>
              <b>{t.brandName || "Divyang-Sahayak"}</b>
              <small>{t.brandSubtitle || "RESTORE INDEPENDENCE"}</small>
            </div>
          </div>

          <div className="auth-portal-selector">
            <button 
              type="button" 
              className={`auth-portal-btn ${authPortal === "general" ? "active" : ""}`}
              onClick={() => switchPortal("general")}
              title="Access donor, volunteer and general community portal"
            >
              <IconShieldCheck size={14} />
              <span>{t.generalPortal || "General / Donor Portal"}</span>
            </button>
            <button 
              type="button" 
              className={`auth-portal-btn ${authPortal === "udid" ? "active" : ""}`}
              onClick={() => switchPortal("udid")}
              title="Access Divyangjan beneficiary registration & free device claim with UDID"
            >
              <IconIdCard size={15} />
              <span>{t.udidPortal || "Divyangjan UDID Portal"}</span>
              <span className="udid-pill-badge">Govt Card</span>
            </button>
          </div>

          <div className="standalone-header-actions">
            <select value={language} onChange={e=>handleLanguageChange(e.target.value)}>
              <option value="English">English</option>
              <option value="తెలుగు">తెలుగు</option>
              <option value="हिन्दी">हिन्दी</option>
            </select>
            <button type="button" className="btn outline" onClick={enterAsGuest}>
              Explore as Guest →
            </button>
          </div>
        </header>

        <main className="standalone-auth-main">
          <div className="standalone-auth-card">
            {authPortal === "udid" ? (
              // =================== DEDICATED UDID PORTAL PAGE ===================
              <>
                <div className="standalone-auth-hero udid-hero-theme">
                  <div className="standalone-auth-hero-content">
                    <div className="udid-hero-badge">
                      <IconIdCard size={15} /> <span>Swavlamban UDID Beneficiary Portal</span>
                    </div>
                    <h2>{t.udidHeroTitle || "100% Free refurbished mobility devices with your UDID Card."}</h2>
                    <p>{t.udidHeroSub || "Dedicated government UDID-verified portal for Divyangjan across Telangana & Andhra Pradesh."}</p>

                    {/* Interactive Digital UDID Card Preview */}
                    <div className="udid-digital-card">
                      <div className="udid-card-top-row">
                        <span className="govt-tag">
                          <IconBadgeCheck size={13} color="#2fe0cc" />
                          <span>Govt of India · UDID Card</span>
                        </span>
                        <span className="udid-status-badge">
                          ✓ Verified Eligible
                        </span>
                      </div>
                      <div className="udid-card-main-content">
                        <div className="udid-card-avatar">
                          <IconWheelchair size={24} color="#ffffff" />
                        </div>
                        <div className="udid-card-info">
                          <div className="udid-card-number">{udidPreview.udid}</div>
                          <h4 className="udid-card-holder-name">{udidPreview.name}</h4>
                          <div className="udid-card-subtag">{udidPreview.disability}</div>
                        </div>
                      </div>
                      <div className="udid-card-footer">
                        <span>ENTITLEMENT: 100% FREE ASSISTIVE DEVICES</span>
                        <span>SWAVLAMBAN CARD</span>
                      </div>
                    </div>

                    <div className="auth-hero-features" style={{marginTop:"18px"}}>
                      <div className="hero-feature-item">
                        <span className="feature-check"><IconCheck size={14} /></span>
                        <span>Free for ≥40% Disability</span>
                      </div>
                      <div className="hero-feature-item">
                        <span className="feature-check"><IconShieldCheck size={14} /></span>
                        <span>7-Stage Certified Inspection</span>
                      </div>
                      <div className="hero-feature-item">
                        <span className="feature-check"><IconTruck size={14} /></span>
                        <span>Free Doorstep Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="standalone-auth-form-wrap">
                  <div className="auth-tab-switch">
                    <button 
                      type="button" 
                      className={`auth-tab-btn ${authMode === "login" ? "active" : ""}`}
                      onClick={() => setAuthMode("login")}
                    >
                      <IconIdCard size={14} style={{verticalAlign:"middle", marginRight:6}} />
                      {t.udidSignIn || "Sign In with UDID"}
                    </button>
                    <button 
                      type="button" 
                      className={`auth-tab-btn ${authMode === "signup" ? "active" : ""}`}
                      onClick={() => setAuthMode("signup")}
                    >
                      <IconBadgeCheck size={14} style={{verticalAlign:"middle", marginRight:6}} />
                      {t.udidSignUp || "Register with UDID"}
                    </button>
                  </div>

                  {authMode === "login" ? (
                    <form className="auth-form" onSubmit={submitUdidLogin}>
                      <div className="auth-form-head">
                        <h3>Divyangjan UDID Sign In</h3>
                        <p className="sub">Access your beneficiary portal, claim free mobility devices, and track deliveries using your 18-digit UDID card.</p>
                      </div>

                      <div className="quick-udid-section">
                        <span className="quick-udid-label">⚡ Instant Test UDID Cardholders:</span>
                        <div className="quick-udid-grid">
                          {sampleUdidHolders.map(holder => (
                            <button
                              key={holder.udid}
                              type="button"
                              className="quick-udid-card-btn"
                              onClick={() => {
                                setUdidPreview({
                                  udid: holder.udid,
                                  name: holder.name,
                                  disability: `${holder.disabilityType} (${holder.disabilityPercent}%)`
                                });
                                quickUdidLogin(holder);
                              }}
                            >
                              <b>♿ {holder.name}</b>
                              <code>{holder.udid}</code>
                              <small>{holder.district} · {holder.disabilityPercent}% {holder.disabilityType}</small>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Field 
                        label={t.udidNumberLabel || "UDID Card Number (18 Digits) *"} 
                        name="udidNumber" 
                        required 
                        placeholder={t.udidPlaceholder || "e.g. TG0120119950012345"} 
                        defaultValue={udidPreview.udid}
                        onChange={e => {
                          const val = e.target.value.toUpperCase();
                          setUdidPreview(prev => ({ ...prev, udid: val || "TG0120119950012345" }));
                        }}
                      />

                      <Field 
                        label="Password or Date of Birth *" 
                        name="password" 
                        required 
                        type="password" 
                        placeholder="Enter password or DD/MM/YYYY" 
                        defaultValue="password123" 
                      />

                      <div className="form-row-between">
                        <label className="check" style={{margin:0}}>
                          <input type="checkbox" defaultChecked /> Remember my UDID on this browser
                        </label>
                        <a className="forgot-link" onClick={() => setToast("Enter your 18-digit Swavlamban UDID card number or select an account.")}>
                          UDID help?
                        </a>
                      </div>

                      <button type="submit" className="btn primary full" style={{marginTop:"14px", padding:"12px"}}>
                        Verify UDID & Sign In to Beneficiary Portal →
                      </button>

                      <div className="auth-switch-prompt">
                        Don't have a UDID profile registered yet?{" "}
                        <button type="button" className="link-button" onClick={() => setAuthMode("signup")}>
                          Register your UDID card here
                        </button>
                      </div>

                      <div className="portal-switch-link-card" onClick={() => switchPortal("general")}>
                        <div className="switch-text">
                          <p>Are you a Donor, NGO or Volunteer? <b>General Portal</b></p>
                        </div>
                        <span className="switch-btn">Switch Portal →</span>
                      </div>
                    </form>
                  ) : (
                    <form className="auth-form" onSubmit={submitUdidSignup}>
                      <div className="auth-form-head">
                        <h3>Register with UDID</h3>
                        <p className="sub">Fast registration. Fill in your UDID number, full name, and password. You can complete all remaining disability, contact, and delivery details in Upgrade Profile after login.</p>
                      </div>

                      <div className="form-grid">
                        <Field 
                          label="UDID Card Number (18 Digits) *" 
                          name="udidNumber" 
                          required 
                          placeholder="e.g. TG0120119950012345" 
                          maxLength="18"
                          onChange={e => {
                            const val = e.target.value.toUpperCase();
                            setUdidPreview(prev => ({ ...prev, udid: val || "TG0120119950012345" }));
                          }}
                        />
                        <Field 
                          label="Name of User (as per UDID Card) *" 
                          name="name" 
                          required 
                          placeholder="Full Name as per UDID Card" 
                          onChange={e => {
                            const val = e.target.value;
                            setUdidPreview(prev => ({ ...prev, name: val || "Ramesh Kumar" }));
                          }}
                        />
                        <Field 
                          label="Password *" 
                          name="password" 
                          required 
                          type="password" 
                          minLength="6" 
                          placeholder="Create password (min 6 characters)" 
                        />
                        <Field 
                          label="Confirm Password *" 
                          name="confirmPassword" 
                          required 
                          type="password" 
                          minLength="6" 
                          placeholder="Re-enter password to confirm" 
                        />
                      </div>

                      <button type="submit" className="btn primary full" style={{padding:"12px", fontSize:"14px", fontWeight:"600", marginTop:"12px"}}>
                        Register UDID Account →
                      </button>

                      <div className="auth-switch-prompt">
                        Already have your UDID registered?{" "}
                        <button type="button" className="link-button" onClick={() => setAuthMode("login")}>
                          Sign in with UDID
                        </button>
                      </div>

                      <div className="portal-switch-link-card" onClick={() => switchPortal("general")}>
                        <div className="switch-text">
                          <p>Are you a Donor, NGO or Volunteer? <b>General Portal</b></p>
                        </div>
                        <span className="switch-btn">Switch Portal →</span>
                      </div>
                    </form>
                  )}
                </div>
              </>
            ) : (
              // =================== GENERAL ACCESS / DONOR PORTAL ===================
              <>
                <div className="standalone-auth-hero">
                  <img 
                    src="/images/auth_hero_lady.png" 
                    alt="Smiling elderly lady in wheelchair" 
                    className="standalone-auth-hero-bg" 
                  />
                  <div className="standalone-auth-hero-overlay"></div>
                  <div className="standalone-auth-hero-content">
                    <div className="auth-hero-badge">
                      <IconWheelchair size={15} /> <span>Restoring Mobility & Dignity</span>
                    </div>
                    <h2>Every device restored brings a smile back home.</h2>
                    <p>A transparent, community-led platform connecting donors, mobility equipment, and beneficiaries across Telangana and Andhra Pradesh.</p>
                    <div className="auth-hero-features">
                      <div className="hero-feature-item">
                        <span className="feature-check"><IconShieldCheck size={14} /></span>
                        <span>7-Stage Certified Inspection</span>
                      </div>
                      <div className="hero-feature-item">
                        <span className="feature-check"><IconCheck size={14} /></span>
                        <span>100% Free with UDID Card</span>
                      </div>
                      <div className="hero-feature-item">
                        <span className="feature-check"><IconTruck size={14} /></span>
                        <span>Doorstep Pickup & Hubs</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="standalone-auth-form-wrap">
                  <div className="auth-tab-switch">
                    <button 
                      type="button" 
                      className={`auth-tab-btn ${authMode === "signup" ? "active" : ""}`}
                      onClick={() => setAuthMode("signup")}
                    >
                      Create Account / Sign Up
                    </button>
                    <button 
                      type="button" 
                      className={`auth-tab-btn ${authMode === "login" ? "active" : ""}`}
                      onClick={() => setAuthMode("login")}
                    >
                      Sign In / Log In
                    </button>
                  </div>

                  {authMode === "login" ? (
                    <form className="auth-form" onSubmit={submitLogin}>
                      <div className="auth-form-head">
                        <h3>Welcome to Divyang-Sahayak</h3>
                        <p className="sub">Sign in to manage your donations, track items, or request mobility devices.</p>
                      </div>

                      <div className="quick-login-banner">
                        <span>Quick evaluator access:</span>
                        <button type="button" className="quick-login-btn" onClick={() => quickLogin("Donor")}>
                          <IconZap size={14} /> Instant Quick Login
                        </button>
                      </div>

                      <Field label="Email or Mobile Number *" name="loginId" required placeholder="you@example.com or +91 98490 00000" defaultValue="suresh.kumar@example.org" />
                      <Field label="Password *" name="password" required type="password" placeholder="Enter password" defaultValue="password123" />

                      <div className="form-row-between">
                        <label className="check" style={{margin:0}}>
                          <input type="checkbox" defaultChecked /> Remember me
                        </label>
                        <a className="forgot-link" onClick={() => setToast("Please enter your registered password or use Quick Login.")}>Need help?</a>
                      </div>

                      <button type="submit" className="btn primary full" style={{marginTop:"14px", padding:"12px"}}>
                        Log In to Dashboard →
                      </button>

                      <div className="auth-switch-prompt">
                        Don't have an account yet?{" "}
                        <button type="button" className="link-button" onClick={() => setAuthMode("signup")}>
                          Sign up here
                        </button>
                      </div>

                      <div className="portal-switch-link-card" onClick={() => switchPortal("udid")}>
                        <div className="switch-text">
                          <p>♿ Are you a Person with Disability? <b>UDID Portal</b></p>
                          <small style={{color:"#829690"}}>Sign in or register with your government UDID card for 100% free aids.</small>
                        </div>
                        <span className="switch-btn">Open UDID Portal →</span>
                      </div>
                    </form>
                  ) : (
                    <form className="auth-form" onSubmit={submitSignup}>
                      <div className="auth-form-head">
                        <h3>Create your account</h3>
                        <p className="sub">Register to donate, request, and track assistive mobility equipment.</p>
                      </div>

                      <div className="form-grid">
                        <Field label="Full Name *" name="name" required placeholder="e.g. Suresh Kumar" defaultValue="Suresh Kumar" />
                        <Field label="Email Address *" name="email" required type="email" placeholder="you@example.com" defaultValue="suresh.kumar@example.org" />
                        <Field label="Phone Number *" name="mobile" required placeholder="+91 98000 00000" defaultValue="+91 98490 54321" />
                        <Field label="Password *" name="password" required type="password" minLength="6" placeholder="At least 6 characters" defaultValue="password123" />
                        <Field label="Confirm Password *" name="confirmPassword" required type="password" minLength="6" placeholder="Re-enter password to confirm" defaultValue="password123" />
                      </div>

                      <div className="form-info-tip" style={{margin:"12px 0 16px", padding:"10px 14px", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:"8px", fontSize:"12px", color:"#166534", display:"flex", alignItems:"center", gap:"8px"}}>
                        <IconCheck size={16} color="#16a34a" />
                        <span>Address, state & account type can be updated in <b>Profile Settings</b> after sign-in.</span>
                      </div>

                      <label className="check">
                        <input type="checkbox" required defaultChecked /> I agree to the platform Terms of Service & Privacy Policy.
                      </label>

                      <button type="submit" className="btn primary full" style={{marginTop:"6px", padding:"12px", fontSize:"14px", fontWeight:"600"}}>
                        Create Account & Enter Dashboard →
                      </button>

                      <div className="auth-switch-prompt">
                        Already have an account?{" "}
                        <button type="button" className="link-button" onClick={() => setAuthMode("login")}>
                          Log in here
                        </button>
                      </div>

                      <div className="portal-switch-link-card" onClick={() => switchPortal("udid")}>
                        <div className="switch-text">
                          <p>♿ Are you a Person with Disability? <b>UDID Portal</b></p>
                          <small style={{color:"#829690"}}>Sign in or register with your government UDID card for 100% free aids.</small>
                        </div>
                        <span className="switch-btn">Open UDID Portal →</span>
                      </div>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </main>

        {toast && <div className="toast" role="status">{toast}</div>}
      </div>
    );
  }

  return <div className={`app ${sidebarCollapsed ? "sidebar-is-collapsed" : ""} ${largeText?"large-text":""} ${highContrast?"high-contrast":""}`}>
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-head">
        <div className="brand" title={`${t.brandName}: ${t.brandSubtitle}`}>
          <div className="logo"><IconWheelchair size={17} color="#ffffff" /></div>
          {!sidebarCollapsed && (
            <div className="brand-text">
              <b>{t.brandName}</b>
              <small>{t.brandSubtitle}</small>
            </div>
          )}
        </div>
        <button 
          type="button" 
          className="sidebar-collapse-btn" 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <IconChevronRight size={13} /> : <IconChevronLeft size={13} />}
        </button>
      </div>

      <nav>
        {currentNavItems.map(([id, IconComp, label]) => (
          <button 
            key={id} 
            className={page === id ? "active" : ""} 
            onClick={() => go(id)}
            title={label}
          >
            <span className="nav-icon"><IconComp size={15} /></span>
            <span className="nav-label-text">{label}</span>
            {id === "notifications" && unread > 0 && <em>{unread}</em>}
          </button>
        ))}
      </nav>

      {/* User name with profile icon at bottom of sidebar */}
      <div 
        className={`user-mini ${page === "profile" ? "active" : ""}`}
        onClick={() => go("profile")}
        title={`${profile?.name || defaultProfile.name} (${t.navProfile})`}
        role="button"
        tabIndex={0}
      >
        <div className="avatar" title={t.navProfile}>
          <IconProfile size={14} />
        </div>
        {!sidebarCollapsed && (
          <>
            <div className="user-mini-info">
              <b>{profile?.name || defaultProfile.name}</b>
              <small>{profile?.udid ? `♿ ${profile.udid.slice(0, 8)}… · ${profile?.disabilityPercent || 75}%` : `${profile?.type || "Donor"} · ${t.activeStatus}`}</small>
            </div>
            <span className="user-mini-arrow">
              <IconChevronRight size={12} />
            </span>
          </>
        )}
      </div>
    </aside>
    <main className="main">
      <header className="topbar">
        <div className="topbar-left">
          <button 
            type="button" 
            className="sidebar-toggle-btn" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar"
          >
            <IconMenu size={16} />
          </button>
          <div className="crumb">{title}<span> / {t.dashboard}</span></div>
        </div>
        <div className="top-actions">
          <div className="search-wrap">
            <IconSearch size={15} className="search-icon" />
            <input 
              className="global-search" 
              placeholder={t.searchPlaceholder} 
              value={search} 
              onChange={e=>setSearch(e.target.value)}
            />
          </div>
          <button 
            type="button" 
            className="btn profile-topbar-btn" 
            onClick={() => { setProfileTab("profile"); go("profile"); }}
            title="Profile Settings"
          >
            <IconProfile size={14} style={{verticalAlign:"middle", marginRight:5}} />
            Profile Settings
            {profile?.udid && !profile?.isProfileUpgraded && (
              <span style={{marginLeft:6, display:"inline-block", width:8, height:8, borderRadius:"50%", background:"#f59e0b"}} title="Pending profile upgrade" />
            )}
          </button>
          <button onClick={()=>go("notifications")} aria-label="Notifications" title={t.navNotifications}>
            <IconBell size={16} /> {unread > 0 && <em>{unread}</em>}
          </button>
          <select value={language} onChange={e=>handleLanguageChange(e.target.value)} aria-label="Language">
            <option value="English">English</option>
            <option value="తెలుగు">తెలుగు</option>
            <option value="हिन्दी">हिन्दी</option>
          </select>
          <button type="button" className="btn logout-topbar-btn" onClick={handleLogout} title={t.logout}>
            <IconLogout size={15} /> {t.logout}
          </button>
        </div>
      </header>
      <section className="content">
        {profile?.udid && !profile?.isProfileUpgraded && (page !== "profile" || profileTab !== "upgrade") && (
          <div className="upgrade-profile-banner">
            <div className="upgrade-banner-left">
              <div className="upgrade-banner-icon">
                <IconIdCard size={22} color="#08766d" />
              </div>
              <div>
                <h4>Upgrade Profile Option Available ({profile.udid})</h4>
                <p>You registered with your UDID No. & Name. Complete your remaining disability category and doorstep delivery address in Profile Settings to claim 100% free mobility equipment.</p>
              </div>
            </div>
            <button type="button" className="btn primary" onClick={() => { setProfileTab("upgrade"); go("profile"); }}>
              <IconBadgeCheck size={14} style={{verticalAlign:"middle", marginRight:4}} /> Go to Upgrade Profile →
            </button>
          </div>
        )}

        {page==="donations"&&<>{pageHeader(t.donationsEyebrow,t.donationsTitle,t.donationsSub,<button className="btn primary" onClick={()=>setModal("donate")}><IconDonations size={15} style={{marginRight:"6px",verticalAlign:"middle"}} /> {t.donateDeviceBtn}</button>)}<div className="panel"><div className="table-scroll"><table><thead><tr><th>DEVICE</th><th>DONATION ID</th><th>SUBMITTED</th><th>LOCATION</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>{visibleDonations.map(d=>(
                    <tr key={d.id}>
                      <td>
                        <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
                          <div style={{position:"relative", width:48, height:48, flexShrink:0}}>
                            <img 
                              src={d.image || (d.category === "Crutches" ? "/images/crutches_forearm.png" : d.category === "Walker" ? "/images/walker_folding.png" : d.category === "Hearing Aid" ? "/images/hearing_aid_digital.jpg" : "/images/wheelchair_manual.png")} 
                              alt={d.name} 
                              style={{width:48, height:48, objectFit:"contain", borderRadius:10, background:"#f8faf9", border:"1px solid #e2ece8", padding:3, display:"block"}}
                              onError={e => { e.target.style.display = "none"; }} 
                            />
                            <span 
                              title={d.category}
                              style={{position:"absolute", bottom:-4, right:-4, width:22, height:22, borderRadius:"50%", background:"#e6f7f2", border:"1.5px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", color:"#08766d", boxShadow:"0 1px 4px rgba(0,0,0,0.12)"}}
                            >
                              {d.category === "Crutches" ? <IconCrutches size={12} /> : d.category === "Walker" ? <IconWalker size={12} /> : d.category === "Hearing Aid" ? <IconHearingAid size={12} /> : <IconWheelchair size={12} />}
                            </span>
                          </div>
                          <div>
                            <b>{d.name}</b>
                            <small>{d.category} · {d.condition} · qty {d.qty}</small>
                          </div>
                        </div>
                      </td>
                      <td><code>{d.id}</code></td>
                      <td>{d.date}</td>
                      <td>{d.district}, {d.state}</td>
                      <td>{badge(d.status, d.stage>=6?"green":d.stage>=4?"gold":"")}</td>
                      <td>
                        <div className="actions" style={{margin:0,gap:"6px"}}>
                          <button type="button" className="btn" style={{padding:"6px 10px",fontSize:"11px",display:"inline-flex",alignItems:"center",gap:"5px"}} onClick={()=>setEditingDevice(d)} title="Edit donation"><IconEdit size={12} /> {t.edit}</button>
                          <button type="button" className="btn danger" style={{padding:"6px 10px",fontSize:"11px",display:"inline-flex",alignItems:"center",gap:"5px"}} onClick={()=>deleteDonation(d.id, d.name)} title="Delete donation"><IconTrash size={12} /> {t.delete}</button>
                        </div>
                      </td>
                    </tr>
                  ))}</tbody></table>{!visibleDonations.length&&<p className="empty">No donations match your search.</p>}</div></div></>}

        {page==="status"&&<>{pageHeader(t.statusEyebrow,t.statusTitle,t.statusSub)}
          {selectedStatusDevice ? (
            <div>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"18px", background:"#fff", padding:"14px 20px", borderRadius:"12px", border:"1px solid #e2ece8", flexWrap:"wrap", gap:"10px"}}>
                <button 
                  type="button" 
                  className="btn" 
                  onClick={()=>setSelectedStatusDevice(null)}
                  style={{display:"inline-flex", alignItems:"center", gap:"6px", fontWeight:"700"}}
                >
                  <IconChevronLeft size={16} /> Back to All Tracked Items
                </button>
                <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                  <span className="badge green">Viewing Item: <b>{selectedStatusDevice.id}</b></span>
                  <span className="badge gold">{selectedStatusDevice.category}</span>
                </div>
              </div>
              <DeviceTimeline 
                key={selectedStatusDevice.id} 
                device={devices.find(d => d.id === selectedStatusDevice.id) || selectedStatusDevice} 
                onUpdateStage={updateDeviceStage} 
              />
            </div>
          ) : (
            <>
              <div className="notice">ⓘ <b>Item Status & Lifecycle Tracking:</b> Click on any equipment item below to view and update its 7-stage refurbishment lifecycle timeline.</div>
              <div className="toolbar">
                <label>{t.filterStatus}
                  <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
                    <option>{t.allStatuses}</option>
                    {[...new Set(devices.map(d=>d.status))].map(s=><option key={s}>{s}</option>)}
                  </select>
                </label>
                <div style={{marginLeft:"auto", display:"flex", alignItems:"center", gap:"8px"}}>
                  <span className="badge green">{devices.filter(d=>statusFilter==="All statuses"||statusFilter===t.allStatuses||d.status===statusFilter).length} items tracked</span>
                  <small style={{color:"#667772"}}>Click any item card to open 7-stage timeline</small>
                </div>
              </div>

              <div className="cards" style={{gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:"18px"}}>
                {devices.filter(d=>statusFilter==="All statuses"||statusFilter===t.allStatuses||d.status===statusFilter).map(d => {
                  const currentStage = Number(d.stage) || 1;
                  const currentStageObj = STAGES.find(s => s.step === currentStage) || STAGES[0];
                  return (
                    <article 
                      className="listing" 
                      key={d.id} 
                      onClick={()=>setSelectedStatusDevice(d)}
                      style={{cursor:"pointer", display:"flex", flexDirection:"column", transition:"all 0.2s ease"}}
                    >
                      <div style={{display:"flex", alignItems:"center", gap:"14px", marginBottom:"12px"}}>
                        <div style={{position:"relative", width:62, height:62, flexShrink:0}}>
                          <img 
                            src={d.image || (d.category === "Crutches" ? "/images/crutches_forearm.png" : d.category === "Walker" ? "/images/walker_folding.png" : d.category === "Hearing Aid" ? "/images/hearing_aid_digital.jpg" : "/images/wheelchair_manual.png")} 
                            alt={d.name} 
                            style={{width:62, height:62, objectFit:"contain", borderRadius:10, background:"#f8faf9", border:"1px solid #e2ece8", padding:4, display:"block"}}
                            onError={e=>{e.target.style.display="none";}} 
                          />
                          <span 
                            title={d.category}
                            style={{position:"absolute", bottom:-3, right:-3, width:24, height:24, borderRadius:"50%", background:"#e6f7f2", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", color:"#08766d", boxShadow:"0 1px 4px rgba(0,0,0,0.15)"}}
                          >
                            {d.category === "Crutches" ? <IconCrutches size={13} /> : d.category === "Walker" ? <IconWalker size={13} /> : d.category === "Hearing Aid" ? <IconHearingAid size={13} /> : <IconWheelchair size={13} />}
                          </span>
                        </div>
                        <div style={{flex:1, minWidth:0}}>
                          <div className="line" style={{marginBottom:4}}>
                            <code>{d.id}</code>
                            {badge(d.status, currentStage>=6?"green":currentStage>=4?"gold":"")}
                          </div>
                          <h3 style={{fontSize:"16px", margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{d.name}</h3>
                          <small style={{color:"#71817e"}}>{d.category} · {d.condition} · qty {d.qty}</small>
                        </div>
                      </div>

                      <div style={{background:"#f8faf9", padding:"10px 12px", borderRadius:"10px", margin:"8px 0 14px", border:"1px solid #edf2ef"}}>
                        <div style={{display:"flex", justifyContent:"space-between", fontSize:"11px", fontWeight:"700", color:"#08766d", marginBottom:"6px"}}>
                          <span>Stage {currentStage} of 7</span>
                          <span>{currentStageObj.title}</span>
                        </div>
                        <div className="progress" style={{margin:0, height:6}}>
                          <span style={{width:`${(currentStage/7)*100}%`}}></span>
                        </div>
                      </div>

                      <div style={{fontSize:"11.5px", color:"#71817e", display:"flex", justifyContent:"space-between", marginBottom:"14px"}}>
                        <span>📍 {d.district}, {d.state}</span>
                        <span>📅 {d.date}</span>
                      </div>

                      <div style={{marginTop:"auto"}}>
                        <button 
                          type="button" 
                          className="btn primary full" 
                          style={{display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"9px 12px"}}
                          onClick={(e)=>{e.stopPropagation(); setSelectedStatusDevice(d);}}
                        >
                          <IconStatus size={14} /> View 7-Stage Timeline →
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              {!devices.filter(d=>statusFilter==="All statuses"||statusFilter===t.allStatuses||d.status===statusFilter).length && (
                <p className="panel empty">No items match your status filter.</p>
              )}
            </>
          )}
        </>}

        {page==="inventory"&&<>{pageHeader(t.inventoryEyebrow,t.inventoryTitle,t.inventorySub)}
          <div className="notice">ⓘ <b>Device Inventory Directory:</b> Explore all refurbished assistive devices in stock (from donation & purchase inventory), or inspect engineering specifications by category.</div>

          <div className="purchase-tabs" style={{marginBottom:"20px"}}>
            <button 
              type="button" 
              className={`purchase-tab-btn ${inventoryTab === "items" ? "active" : ""}`}
              onClick={() => setInventoryTab("items")}
            >
              📦 Available Inventory Items ({filteredInventoryItems.length})
            </button>
            <button 
              type="button" 
              className={`purchase-tab-btn ${inventoryTab === "categories" ? "active" : ""}`}
              onClick={() => setInventoryTab("categories")}
            >
              📋 Categories & Technical Specs ({visibleDeviceTypes.length})
            </button>
          </div>

          <div className="toolbar" style={{gap:"14px", alignItems:"center"}}>
            <label>{t.filterItemType}
              <select value={deviceTypeFilter} onChange={e=>setDeviceTypeFilter(e.target.value)}>
                <option>{t.allDeviceTypes}</option>
                <option value="Wheelchairs">{t.wheelchairs}</option>
                <option value="Crutches">{t.crutches}</option>
                <option value="Walkers">{t.walkers}</option>
                <option value="Hearing Aids">{t.hearingAids || "Hearing Aids"}</option>
              </select>
            </label>
            {inventoryTab === "items" && (
              <div style={{flex:1, minWidth:"220px"}}>
                <input 
                  placeholder="⌕ Search inventory items, models, hubs, specs…" 
                  value={inventorySearch} 
                  onChange={e=>setInventorySearch(e.target.value)} 
                />
              </div>
            )}
            <div style={{marginLeft:"auto", display:"flex", alignItems:"center", gap:"10px"}}>
              <span className="badge green">{inventoryTab === "items" ? `${filteredInventoryItems.length} items in inventory` : `${visibleDeviceTypes.length} supported categories`}</span>
              <button className="btn" onClick={()=>go("status")}><IconStatus size={14} style={{marginRight:"6px",verticalAlign:"middle"}} /> View in Item status →</button>
            </div>
          </div>

          {inventoryTab === "items" && (
            <div className="cards" style={{gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:"18px"}}>
              {filteredInventoryItems.map(item => (
                <article className="purchase-card" key={item.id} style={{display:"flex", flexDirection:"column"}}>
                  <div className="purchase-card-img-wrap" style={{position:"relative"}}>
                    <img src={item.image} alt={item.name} className="purchase-card-img" onError={(e)=>{e.target.style.display="none";}} />
                    <span 
                      title={item.category}
                      style={{position:"absolute", top:10, left:10, width:30, height:30, borderRadius:"50%", background:"#ffffff", border:"1.5px solid #e2ece8", display:"flex", alignItems:"center", justifyContent:"center", color:"#08766d", boxShadow:"0 2px 6px rgba(0,0,0,0.12)"}}
                    >
                      {item.category === "Crutches" ? <IconCrutches size={16} /> : item.category === "Walker" ? <IconWalker size={16} /> : item.category === "Hearing Aid" ? <IconHearingAid size={16} /> : <IconWheelchair size={16} />}
                    </span>
                  </div>

                  <div className="purchase-card-top" style={{marginTop:10}}>
                    <span className="badge green"><IconShieldCheck size={12} style={{marginRight:4, verticalAlign:"middle"}} />{item.cert}</span>
                    <span className="badge">{item.condition}</span>
                  </div>

                  <div className="purchase-donor-tag" style={{margin:"6px 0"}}>
                    <span>Donation ID: <b>{item.donationId}</b></span>
                    <span>·</span>
                    <span>Available: <b>{item.qtyAvailable} unit{item.qtyAvailable === 1 ? "" : "s"}</b></span>
                  </div>

                  <h3 style={{fontSize:"16px", margin:"4px 0 6px"}}>{item.name}</h3>
                  <div className="purchase-specs" style={{fontSize:"12px", color:"#4a635d", marginBottom:6}}>{item.specs}</div>
                  <div className="purchase-donor-note" style={{fontSize:"11.5px", fontStyle:"italic", color:"#607b74", marginBottom:8}}>“{item.donorNote}”</div>
                  <small style={{color:"#80938e", display:"block", marginBottom:12}}>📍 Dispatch Hub: {item.hub}</small>

                  <div className="purchase-price-box" style={{marginTop:"auto", marginBottom:12}}>
                    <div className="price-main-row">
                      <span className="price-amount">{money(item.handlingPrice)}</span>
                      <span className="price-original">{money(item.originalValue)}</span>
                      <span className="badge gold">Refurbished</span>
                    </div>
                    <span className="price-subsidy-note">✓ Or ₹0 {t.freeWithUdid}</span>
                  </div>

                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
                    <button 
                      type="button" 
                      className="btn primary" 
                      style={{padding:"9px 10px", fontSize:"12px", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:5}}
                      onClick={()=>{ setPurchasingItem(item); go("purchase"); }}
                    >
                      <IconPurchase size={14} /> Claim / Buy
                    </button>
                    <button 
                      type="button" 
                      className="btn" 
                      style={{padding:"9px 10px", fontSize:"12px", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:5}}
                      onClick={()=>{
                        const dev = devices.find(d => d.id === item.donationId) || { id: item.donationId, name: item.name, category: item.category, condition: item.condition, state: "Telangana", district: "Hyderabad", date: "Recent", status: "Quality Certified", qty: item.qtyAvailable, stage: 6, image: item.image };
                        setSelectedStatusDevice(dev);
                        go("status");
                      }}
                    >
                      <IconStatus size={14} /> View Status
                    </button>
                  </div>
                </article>
              ))}
              {!filteredInventoryItems.length && (
                <p className="panel empty" style={{gridColumn:"1/-1"}}>No inventory items match your search or category filter.</p>
              )}
            </div>
          )}

          {inventoryTab === "categories" && (
            <div className="device-types-grid">
              {visibleDeviceTypes.map(type => {
                const inStock = devices.filter(d => d.category.toLowerCase().includes(type.category.toLowerCase())).reduce((acc, curr) => acc + (Number(curr.qty) || 1), 0);
                const IconComp = typeof type.icon === "function" ? type.icon : IconWheelchair;
                return (
                  <div 
                    className="device-type-card" 
                    key={type.id}
                    style={{cursor:"pointer", display:"flex", flexDirection:"column"}}
                    onClick={()=>setSelectedDeviceType(type)}
                  >
                    <div className="type-card-header">
                      <div className="type-header-left">
                        <div className="device-emoji"><IconComp size={24} /></div>
                        <div>
                          <h3>{type.title}</h3>
                          <span className="badge gold">{type.badge}</span>
                        </div>
                      </div>
                    </div>

                    <div className="type-card-image-wrap" style={{marginBottom:"12px"}}>
                      <img src={type.image} alt={type.title} className="type-card-img" onError={(e)=>{e.target.style.display="none";}} />
                    </div>

                    <div className="type-counter-badge">
                      📦 <b>{inStock}</b> unit{inStock === 1 ? "" : "s"} tracked in system
                    </div>

                    <p className="type-card-summary" style={{margin:"0 0 16px", flex:1}}>{type.summary}</p>

                    <div className="type-card-actions" onClick={e=>e.stopPropagation()}>
                      <button 
                        type="button" 
                        className="btn primary" 
                        style={{flex:1, padding:"10px 14px", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"6px"}}
                        onClick={()=>setSelectedDeviceType(type)}
                      >
                        <IconSearch size={14} /> View Details & Specs →
                      </button>
                      <button 
                        type="button" 
                        className="btn" 
                        style={{padding:"10px 12px"}}
                        onClick={()=>setModal("donate")}
                        title={`Donate ${type.title}`}
                      >
                        <IconDonations size={14} style={{marginRight:"4px"}} /> Donate
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedDeviceType && (
            <Modal 
              title={`${selectedDeviceType.title}: Technical Specifications & Details`} 
              close={()=>setSelectedDeviceType(null)}
            >
              <div style={{padding:"4px 0"}}>
                <div style={{display:"flex", gap:"18px", alignItems:"center", marginBottom:"18px", flexWrap:"wrap"}}>
                  <img 
                    src={selectedDeviceType.image} 
                    alt={selectedDeviceType.title} 
                    style={{width:120, height:95, objectFit:"contain", borderRadius:12, background:"#f8faf9", border:"1px solid #e2ece8", padding:6}} 
                  />
                  <div style={{flex:1, minWidth:220}}>
                    <div className="line" style={{marginBottom:6}}>
                      <span className="badge gold">{selectedDeviceType.badge}</span>
                      <span className="badge green">{selectedDeviceType.category}</span>
                    </div>
                    <h3 style={{margin:"0 0 6px", fontSize:"20px"}}>{selectedDeviceType.title}</h3>
                    <p style={{margin:0, fontSize:"12.5px", color:"#4a635d"}}>{selectedDeviceType.summary}</p>
                  </div>
                </div>

                <p style={{fontSize:"13px", color:"#37474f", lineHeight:"1.6", marginBottom:"18px"}}>
                  {selectedDeviceType.description}
                </p>

                <div className="type-section-title" style={{fontSize:"13px", fontWeight:"700", color:"#0d5f52", margin:"16px 0 10px"}}>
                  📋 Common Models & Configurations
                </div>
                <div style={{display:"grid", gap:"8px", marginBottom:"18px"}}>
                  {selectedDeviceType.variants.map((v, i) => (
                    <div key={i} style={{background:"#f8faf9", padding:"10px 14px", borderRadius:"10px", border:"1px solid #e7eeeb"}}>
                      <b style={{color:"#1e332f"}}>{v.name}</b>
                      <div style={{fontSize:"12px", color:"#546e7a", marginTop:"3px"}}>{v.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="type-section-title" style={{fontSize:"13px", fontWeight:"700", color:"#0d5f52", margin:"16px 0 10px"}}>
                  📦 Refurbished Stock Items in this Category ({donatedStoreCatalog.filter(d => d.category.toLowerCase().includes(selectedDeviceType.category.toLowerCase())).length} items)
                </div>
                <div style={{display:"grid", gap:"8px", marginBottom:"18px"}}>
                  {donatedStoreCatalog.filter(d => d.category.toLowerCase().includes(selectedDeviceType.category.toLowerCase())).map(item => (
                    <div key={item.id} style={{background:"#f0fbf7", padding:"10px 14px", borderRadius:"10px", border:"1px solid #c9eee5", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px"}}>
                      <div>
                        <b style={{color:"#08766d"}}>{item.name}</b>
                        <div style={{fontSize:"11.5px", color:"#546e7a", marginTop:"2px"}}>{item.specs} · Refurbished at: {item.hub}</div>
                      </div>
                      <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                        <span className="badge green">{item.condition}</span>
                        <span style={{fontWeight:"700", fontSize:"12.5px", color:"#08766d"}}>{money(item.handlingPrice)}</span>
                        <button type="button" className="btn primary" style={{padding:"6px 10px", fontSize:"11px"}} onClick={()=>{ setSelectedDeviceType(null); setPurchasingItem(item); go("purchase"); }}>Claim / Buy</button>
                      </div>
                    </div>
                  ))}
                  {!donatedStoreCatalog.filter(d => d.category.toLowerCase().includes(selectedDeviceType.category.toLowerCase())).length && (
                    <p style={{fontSize:"12px", color:"#78909c", margin:0}}>No items currently in stock for this category.</p>
                  )}
                </div>

                <div className="type-section-title" style={{fontSize:"13px", fontWeight:"700", color:"#0d5f52", margin:"16px 0 10px"}}>
                  ⚙️ Technical Engineering Specifications
                </div>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"18px"}}>
                  {selectedDeviceType.specs.map((s, i) => (
                    <div key={i} style={{background:"#f0fbf7", padding:"9px 12px", borderRadius:"8px", border:"1px solid #c9eee5"}}>
                      <small style={{display:"block", color:"#08766d", fontWeight:"700", fontSize:"10.5px", textTransform:"uppercase"}}>{s.label}</small>
                      <span style={{fontWeight:"600", fontSize:"12.5px", color:"#143d36"}}>{s.value}</span>
                    </div>
                  ))}
                </div>

                <div className="type-section-title" style={{fontSize:"13px", fontWeight:"700", color:"#0d5f52", margin:"16px 0 10px"}}>
                  🛡️ 7-Stage Safety & Quality Criteria
                </div>
                <ul style={{paddingLeft:"20px", fontSize:"12.5px", color:"#37474f", lineHeight:"1.7", marginBottom:"22px"}}>
                  {selectedDeviceType.checklist.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="actions" style={{display:"flex", gap:"10px", borderTop:"1px solid #e7eeeb", paddingTop:"16px"}}>
                  <button 
                    type="button" 
                    className="btn primary" 
                    onClick={()=>{setSelectedDeviceType(null);setModal("donate");}}
                  >
                    <IconDonations size={15} style={{marginRight:6, verticalAlign:"middle"}} /> Donate {selectedDeviceType.title}
                  </button>
                  <button 
                    type="button" 
                    className="btn" 
                    onClick={()=>{setSelectedDeviceType(null);go("status");}}
                  >
                    <IconStatus size={14} style={{marginRight:6, verticalAlign:"middle"}} /> Track in Item status →
                  </button>
                  <button 
                    type="button" 
                    className="btn" 
                    onClick={()=>setSelectedDeviceType(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </>}

        {page==="purchase"&&<>{pageHeader(t.purchaseEyebrow,t.purchaseTitle,t.purchaseSub)}
          <div className="notice">ⓘ <b>Community Subsidized Store:</b> Donated items are provided at minimal refurbishment & sanitization handling charges, or <b>{t.freeWithUdid}</b>.</div>

          <div className="purchase-tabs">
            <button 
              type="button"
              className={`purchase-tab-btn ${purchaseTab==="available"?"active":""}`} 
              onClick={()=>setPurchaseTab("available")}
            >
              🏷 {t.availableItemsTab} ({availablePurchases.length})
            </button>
            <button 
              type="button"
              className={`purchase-tab-btn ${purchaseTab==="orders"?"active":""}`} 
              onClick={()=>setPurchaseTab("orders")}
            >
              📦 {t.purchasedOrdersTab} ({purchases.length})
            </button>
          </div>

          {purchaseTab==="available"&&<>
            <div className="toolbar">
              <label>{t.filterCategory}
                <select value={purchaseCategory} onChange={e=>setPurchaseCategory(e.target.value)}>
                  <option>{t.allCategories}</option>
                  <option value="Wheelchair">{t.wheelchair}</option>
                  <option value="Crutches">{t.crutches}</option>
                  <option value="Walker">{t.walker}</option>
                  <option value="Hearing Aid">{t.hearingAid || "Hearing Aid"}</option>
                </select>
              </label>
              <div style={{flex:1, minWidth:"200px"}}>
                <input 
                  placeholder="⌕ Search donated items, models, hubs…" 
                  value={purchaseSearch} 
                  onChange={e=>setPurchaseSearch(e.target.value)} 
                />
              </div>
            </div>

            <div className="purchase-grid">
              {availablePurchases.map(item => (
                <article className="purchase-card" key={item.id}>
                  <div className="purchase-card-img-wrap">
                    <img src={item.image} alt={item.name} className="purchase-card-img" onError={(e)=>{e.target.style.display="none";}} />
                  </div>

                  <div className="purchase-card-top">
                    <div className="device-emoji">
                      {item.category==="Crutches"?<IconCrutches size={22}/>:item.category==="Walker"?<IconWalker size={22}/>:item.category==="Hearing Aid"?<IconHearingAid size={22}/>:<IconWheelchair size={22}/>}
                    </div>
                    <span className="badge green"><IconShieldCheck size={12} style={{marginRight:"4px",verticalAlign:"middle"}} />{item.cert}</span>
                  </div>

                  <div className="purchase-donor-tag">
                    <span>From Donation: <b>{item.donationId}</b></span>
                    <span>·</span>
                    <span className="badge">{item.condition}</span>
                  </div>

                  <h3>{item.name}</h3>
                  <div className="purchase-specs">{item.specs}</div>
                  <div className="purchase-donor-note">“{item.donorNote}”</div>
                  <small style={{color:"#80938e", display:"block", marginBottom:"10px"}}>📍 Dispatch Hub: {item.hub}</small>

                  <div className="purchase-price-box">
                    <div className="price-main-row">
                      <span className="price-amount">{money(item.handlingPrice)}</span>
                      <span className="price-original">{money(item.originalValue)}</span>
                      <span className="badge gold">Save {Math.round((1 - item.handlingPrice/item.originalValue)*100)}%</span>
                    </div>
                    <span className="price-subsidy-note">✓ Or ₹0 {t.freeWithUdid}</span>
                  </div>

                  <button 
                    type="button" 
                    className="btn primary full" 
                    onClick={()=>setPurchasingItem(item)}
                  >
                    <IconPurchase size={16} style={{marginRight:"6px",verticalAlign:"middle"}} /> {t.buyClaimDevice}
                  </button>
                </article>
              ))}
              {!availablePurchases.length&&<p className="panel empty" style={{gridColumn:"1/-1"}}>No donated items match your search.</p>}
            </div>
          </>}

          {purchaseTab==="orders"&&<div className="orders-list">
            {purchases.map(ord => (
              <div className="order-card" key={ord.id}>
                <div className="order-card-main">
                  <div className="line" style={{marginBottom:"6px"}}>
                    <span className="badge">{ord.id}</span>
                    <span className="badge green">{ord.status}</span>
                    <span className="badge">{ord.category}</span>
                  </div>
                  <h3>{ord.name}</h3>
                  <p style={{margin:"4px 0", fontSize:"12px", color:"#596f6a"}}>
                    <strong>Recipient:</strong> {ord.recipient} · <strong>Ordered on:</strong> {ord.date}
                  </p>
                  <p style={{margin:"4px 0", fontSize:"12px", color:"#596f6a"}}>
                    <strong>Delivery Address:</strong> {ord.address}
                  </p>
                  <p style={{margin:"4px 0", fontSize:"12px", color:"#596f6a"}}>
                    <strong>Payment Method:</strong> {ord.paymentMethod} · <strong>Amount Paid:</strong> {money(ord.price)}
                  </p>
                </div>
                <div className="order-card-meta">
                  <div>
                    <small style={{display:"block", color:"#899b96", marginBottom:"4px"}}>TRACKING ID</small>
                    <span className="order-track-id">{ord.trackingId}</span>
                  </div>
                  <div style={{textAlign:"right", marginTop:"12px"}}>
                    <small style={{color:"#0d796e", fontWeight:"700", display:"block"}}>Estimated Delivery</small>
                    <b style={{fontSize:"13px"}}>{ord.eta}</b>
                  </div>
                </div>
              </div>
            ))}
            {!purchases.length&&<p className="panel empty">No purchase orders placed yet.</p>}
          </div>}
        </>}

        {page==="requests"&&<>{pageHeader(t.requestsEyebrow,t.requestsTitle,t.requestsSub,<button className="btn primary" onClick={()=>setModal("request")}><IconNGO size={15} style={{marginRight:"6px",verticalAlign:"middle"}} /> Request equipment</button>)}
          <div className="toolbar" style={{marginBottom:"18px"}}>
            <input 
              placeholder="Search by NGO name, district, or equipment..." 
              value={ngoSearch} 
              onChange={e=>setNgoSearch(e.target.value)}
              style={{maxWidth:360}}
            />
            <label>Filter by State:
              <select value={ngoStateFilter} onChange={e=>setNgoStateFilter(e.target.value)}>
                <option>All states</option>
                <option>Telangana</option>
                <option>Andhra Pradesh</option>
                <option>Karnataka</option>
              </select>
            </label>
            <div style={{marginLeft:"auto", display:"flex", alignItems:"center", gap:"10px"}}>
              <span className="badge green">15 Registered Partner NGOs</span>
            </div>
          </div>

          <div className="split">
            <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>
              {ngoRequests
                .filter(n => {
                  const matchSearch = (n.org + " " + n.district + " " + n.equipment + " " + n.coordinator).toLowerCase().includes(ngoSearch.toLowerCase());
                  const matchState = ngoStateFilter === "All states" || n.state === ngoStateFilter;
                  return matchSearch && matchState;
                })
                .map(ngo => (
                  <div className="panel" key={ngo.id} style={{marginBottom:0, padding:"20px"}}>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px", marginBottom:"10px", flexWrap:"wrap"}}>
                      <div>
                        <div className="line" style={{marginBottom:4}}>
                          <code>{ngo.regNo}</code>
                          <span className="badge green">✓ Verified NGO Partner</span>
                          <span className={`badge ${ngo.status === "Approved" ? "green" : "gold"}`}>{ngo.status}</span>
                        </div>
                        <h3 style={{margin:"0 0 4px", fontSize:"18px", color:"#1a2e2b"}}>{ngo.org}</h3>
                        <p style={{margin:0, fontSize:"12px", color:"#546e7a"}}>Service Area: <b>{ngo.district}, {ngo.state}</b> · Coordinator: {ngo.coordinator}</p>
                      </div>
                      <button 
                        type="button" 
                        className={`btn ${ngo.status === "Approved" ? "" : "primary"}`}
                        style={{padding:"8px 14px", fontSize:"12px"}}
                        onClick={() => {
                          const newStatus = ngo.status === "Approved" ? "Under Review" : "Approved";
                          setNgoRequests(prev => prev.map(item => item.id === ngo.id ? { ...item, status: newStatus } : item));
                          setToast(`Request for ${ngo.org} marked as ${newStatus}.`);
                        }}
                      >
                        {ngo.status === "Approved" ? "✓ Approved for Dispatch" : "Mark Reviewed / Approve"}
                      </button>
                    </div>

                    <div style={{background:"#f8faf9", padding:"12px 14px", borderRadius:"10px", border:"1px solid #e7eeeb", margin:"12px 0"}}>
                      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px", flexWrap:"wrap", gap:"8px"}}>
                        <span style={{fontSize:"12.5px", fontWeight:"700", color:"#08766d"}}>📦 Equipment Needed: {ngo.equipment}</span>
                        <span className="badge gold">Quantity: {ngo.qty} units</span>
                      </div>
                      <p style={{fontSize:"12px", color:"#425b55", margin:0, lineHeight:"1.5"}}>
                        {ngo.purpose}
                      </p>
                    </div>

                    <div style={{fontSize:"11.5px", color:"#78909c", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"6px"}}>
                      <span>📞 {ngo.contact}</span>
                      <span>📅 Requested: {ngo.date}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div>
              <div className="panel" style={{position:"sticky", top:"90px"}}>
                <div className="eyebrow" style={{color:"#08766d"}}>COMMUNITY ALLOCATIONS</div>
                <h3 style={{margin:"6px 0 10px"}}>15 Verified NGOs Empaneled</h3>
                <p>Divyang-Sahayak coordinates directly with registered disability rehabilitation trusts, palliative hospices, and rural community centres.</p>
                <hr style={{border:0, borderTop:"1px solid #e7eeeb", margin:"16px 0"}}/>
                <h4 style={{margin:"0 0 8px", fontSize:"13px"}}>Beneficiary Privacy Standards</h4>
                <p style={{fontSize:"12px", color:"#546e7a", lineHeight:"1.5", margin:"0 0 14px"}}>
                  Use district-level location for public lists. Exact home addresses and UDID certificates are shared only with dispatched logistics agents.
                </p>
                <div className="type-section-title" style={{fontSize:"12px", fontWeight:"700", color:"#08766d", margin:"14px 0 8px"}}>
                  Allocation Workflow
                </div>
                <div className="badge-wrap" style={{gap:"6px"}}>
                  {["1. Request Submitted", "2. Technician Review", "3. Inventory Match", "4. Doorstep Dispatch"].map(x => (
                    <span className="badge green" key={x}>{x}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>}

        {page==="notifications"&&<>{pageHeader(t.notificationsEyebrow,t.notificationsTitle,t.notificationsSub,<button className="btn" onClick={markAllRead}><IconCheck size={14} style={{marginRight:"4px",verticalAlign:"middle"}} /> Mark all read</button>)}<div className="panel">{notices.map((n,i)=><div className="notification" key={i}><div className="device-emoji small"><IconBell size={18} /></div><div className="notification-body"><div className="line"><b>{n.title}</b>{n.unread&&badge("Unread","green")}</div><p>{n.body}</p><small>{n.time}</small></div>{n.unread&&<button className="btn" onClick={()=>setNotices(prev=>prev.map((x,j)=>j===i?{...x,unread:false}:x))}><IconCheck size={13} style={{marginRight:"4px",verticalAlign:"middle"}} /> Read</button>}</div>)}</div></>}

        {page==="resale"&&<>{pageHeader(t.resaleEyebrow,t.resaleTitle,t.resaleSub)}<div className="notice">ⓘ <b>Refurbished Aids Catalog:</b> Certified pre-owned mobility aids inspected and tested by authorized technicians.</div><div className="panel filters"><div><input placeholder={t.searchPlaceholder} value={search} onChange={e=>setSearch(e.target.value)}/><small>{visibleListings.length} available listings</small></div><label>{t.filterCategory}<select value={category} onChange={e=>setCategory(e.target.value)}>{[t.allCategories,"Wheelchair","Crutches","Walker","Hearing Aid"].map(x=><option key={x}>{x}</option>)}</select></label><label>Sort by price<select value={sort} onChange={e=>setSort(e.target.value)}><option>Lowest price</option><option>Highest price</option></select></label></div><div className="cards">{visibleListings.map(i=><article className="listing" key={i.id}><div className="listing-card-img-wrap"><img src={i.image} alt={i.name} className="listing-card-img" onError={(e)=>{e.target.style.display="none";}} /></div><div className="listing-top"><div className="device-emoji">{i.category==="Crutches"?<IconCrutches size={22}/>:i.category==="Walker"?<IconWalker size={22}/>:i.category==="Hearing Aid"?<IconHearingAid size={22}/>:<IconWheelchair size={22}/>}</div>{badge("Certified Pre-owned","green")}</div><div className="eyebrow">{i.category.toUpperCase()} · {i.id}</div>
                <h3>{i.name}</h3>
                <div className="price">{money(i.price)}</div>
                <div className="line" style={{margin:"6px 0 8px", gap:"6px"}}>
                  {i.size && <span className="badge" style={{background:"#f0fdf9", color:"#08766d", border:"1px solid #bde5dc"}}>{i.size}</span>}
                  {i.material && <span className="badge" style={{background:"#f8faf9", color:"#455a64", border:"1px solid #cfd8dc"}}>{i.material}</span>}
                </div>
                <p>{badge("Sanitized & Tested","green")} <span className="muted">{i.location}</span></p>
                <p className="desc">{i.desc}</p><div className="actions"><button className="btn" onClick={()=>setToast(`${i.name}: Specifications verified. Hub dispatch available.`)}>{t.viewDetails}</button><button className="btn primary" onClick={()=>setToast("Your interest has been registered! A hub coordinator will contact you.")}>Register Interest</button></div></article>)}</div></>}

        {page==="profile"&&<>{pageHeader(t.profileEyebrow,t.profileTitle,t.profileSub)}
          <div className="profile-layout">
            <div className="panel" style={{flex:1}}>
              {/* Option switch tabs: Profile Settings (primary) and Upgrade Your Profile */}
              <div className="purchase-tabs" style={{marginBottom:"20px"}}>
                <button 
                  type="button" 
                  className={`purchase-tab-btn ${profileTab === "profile" ? "active" : ""}`}
                  onClick={() => setProfileTab("profile")}
                >
                  <IconProfile size={15} /> 👤 Profile Settings
                </button>
                <button 
                  type="button" 
                  className={`purchase-tab-btn ${profileTab === "upgrade" ? "active" : ""}`}
                  onClick={() => setProfileTab("upgrade")}
                  style={profileTab === "upgrade" ? {} : {borderColor:"#a3dfd1", background:"#f0fdf9", color:"#08766d"}}
                >
                  <IconBadgeCheck size={16} /> ⚡ Upgrade Your Profile
                  {profile?.udid && !profile?.isProfileUpgraded && <span style={{fontSize:"10px", background:"#d97706", color:"#fff", padding:"1px 7px", borderRadius:"10px", marginLeft:"6px"}}>Action Required</span>}
                </button>
              </div>

              {profileTab === "upgrade" ? (
                <>
                  <div className="upgrade-panel-header" style={{marginBottom:"18px"}}>
                    <div>
                      <div className="eyebrow">GOVERNMENT UDID BENEFICIARY</div>
                      <h2>Upgrade Your Profile</h2>
                      <p className="sub">
                        {profile?.isProfileUpgraded 
                          ? "✓ Your UDID beneficiary details are complete & verified for 100% free mobility aids." 
                          : "Complete your remaining contact, disability category, and doorstep delivery address to claim 100% free mobility equipment."}
                      </p>
                    </div>
                    <div>
                      <span className={`badge ${profile?.isProfileUpgraded ? "green" : "gold"}`}>
                        {profile?.isProfileUpgraded ? "✓ Profile Upgraded (Free Claim Active)" : "⚠️ Incomplete Details"}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={submitUpgradeProfile}>
                    <div className="notice" style={{background:"#f0fdf9", borderColor:"#a3dfd1", color:"#0d5f52", marginBottom:"18px"}}>
                      <strong>♿ Basic Credentials Saved:</strong> UDID Number: <b>{profile?.udid || "TG0120119950012345"}</b> · Registered Name: <b>{profile?.name}</b>
                    </div>

                    <div className="type-section-title" style={{margin:"14px 0 10px", fontSize:"13px", fontWeight:"700", color:"#0d5f52"}}>
                      📞 1. Contact Information
                    </div>
                    <div className="form-grid">
                      <Field label="Mobile / Phone Number (linked to UDID) *" name="mobile" required placeholder="e.g. +91 98490 12345" defaultValue={profile?.mobile||""} />
                      <Field label="Email Address (optional)" name="email" type="email" placeholder="e.g. you@example.org" defaultValue={profile?.email||""} />
                    </div>

                    <div className="type-section-title" style={{margin:"18px 0 10px", fontSize:"13px", fontWeight:"700", color:"#0d5f52"}}>
                      ♿ 2. Disability Category & Required Mobility Aid
                    </div>
                    <div className="form-grid">
                      <SelectField 
                        label="Disability Category *" 
                        name="disabilityType" 
                        options={[
                          "Locomotor Disability",
                          "Cerebral Palsy",
                          "Muscular Dystrophy",
                          "Amputation / Limb Deficiency",
                          "Visual Impairment",
                          "Hearing Impairment",
                          "Dwarfism",
                          "Multiple Disabilities"
                        ]} 
                        defaultValue={profile?.disabilityType || "Locomotor Disability"} 
                      />
                      <Field 
                        label="Disability Percentage (%) *" 
                        name="disabilityPercent" 
                        required 
                        type="number" 
                        min="40" 
                        max="100" 
                        placeholder="e.g. 75 (Minimum 40% for free claim)" 
                        defaultValue={profile?.disabilityPercent || 75} 
                      />
                      <SelectField 
                        label="Required Mobility Device *" 
                        name="requiredAid" 
                        wide
                        options={[
                          "Certified Manual Wheelchair",
                          "Transit Wheelchair",
                          "Folding Walking Frame",
                          "Four-Wheel Rollator",
                          "Forearm / Elbow Crutches (pair)",
                          "Underarm Auxiliary Crutches (pair)",
                          "Digital Hearing Aid (BTE / RIC)"
                        ]} 
                        defaultValue={profile?.requiredAid || "Certified Manual Wheelchair"} 
                      />
                    </div>

                    <div className="type-section-title" style={{margin:"18px 0 10px", fontSize:"13px", fontWeight:"700", color:"#0d5f52"}}>
                      📍 3. Doorstep Delivery Address
                    </div>
                    <div className="form-grid">
                      <SelectField label="State *" name="state" options={["Telangana","Andhra Pradesh","Karnataka","Other"]} defaultValue={profile?.state||"Telangana"} />
                      <Field label="District *" name="district" required placeholder="e.g. Hyderabad, Warangal, Vijayawada" defaultValue={profile?.district||""} />
                      <Field label="PIN Code *" name="pin" required pattern="[0-9]{6}" maxLength="6" placeholder="6 digits PIN" defaultValue={profile?.pin||""} />
                      <Field label="Complete Delivery Address & Landmark *" name="address" required placeholder="Door number, street, area, landmark for delivery agent" wide defaultValue={profile?.address||""} />
                    </div>

                    <div className="actions" style={{marginTop:"20px", display:"flex", alignItems:"center", gap:"12px"}}>
                      <button type="submit" className="btn primary" style={{padding:"11px 20px", fontSize:"13px"}}>
                        <IconCheck size={14} style={{marginRight:6, verticalAlign:"middle"}} /> Save & Upgrade Your Profile
                      </button>
                      <button type="button" className="btn" onClick={()=>go("purchase")}>
                        <IconPurchase size={14} style={{marginRight:4, verticalAlign:"middle"}} /> Claim Free Aid in Store →
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="upgrade-panel-header" style={{marginBottom:"18px"}}>
                    <div>
                      <div className="eyebrow">USER PROFILE</div>
                      <h2>General Profile Settings</h2>
                      <p className="sub">Manage your personal details, contact address, and account preferences.</p>
                    </div>
                    <div>
                      <span className="badge green">Active Account</span>
                    </div>
                  </div>

                  <div className="notice" style={{background:"#f0fdf9", borderColor:"#a3dfd1", color:"#0d5f52", marginBottom:"18px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px"}}>
                    <div>
                      <strong>♿ Are you a Person with Disability?</strong> You can upgrade your profile to claim 100% free mobility aids with your UDID Card.
                    </div>
                    <button type="button" className="btn primary" style={{padding:"6px 12px", fontSize:"12px"}} onClick={() => setProfileTab("upgrade")}>
                      <IconBadgeCheck size={14} style={{marginRight:4, verticalAlign:"middle"}} /> Switch to Upgrade Your Profile →
                    </button>
                  </div>

                  <form onSubmit={submitProfile}>
                    <div className="form-grid">
                      <Field label="Full Name *" name="name" required defaultValue={profile?.name||""} placeholder="Full Name" />
                      <Field label="Email Address *" name="email" type="email" required defaultValue={profile?.email||""} placeholder="you@example.com" />
                      <Field label="Phone / Mobile Number *" name="mobile" required placeholder="+91 98000 00000" defaultValue={profile?.mobile||""} />
                      <SelectField label="Account Type" name="type" options={["Donor","NGO","Recipient / caregiver","Volunteer","Divyangjan Beneficiary"]} defaultValue={profile?.type||"Donor"} />
                      <SelectField label="State *" name="state" options={["Telangana","Andhra Pradesh","Karnataka","Other"]} defaultValue={profile?.state||"Telangana"} />
                      <Field label="District *" name="district" required placeholder="e.g. Hyderabad" defaultValue={profile?.district||""} />
                      <Field label="PIN Code *" name="pin" required pattern="[0-9]{6}" maxLength="6" placeholder="6 digits" defaultValue={profile?.pin||""} />
                      <Field label="Complete Delivery Address *" name="address" required placeholder="Door number, street, area, landmark" wide defaultValue={profile?.address||""} />
                    </div>

                    <div className="actions" style={{marginTop:"20px", display:"flex", alignItems:"center", gap:"12px"}}>
                      <button type="submit" className="btn primary">
                        <IconCheck size={14} style={{marginRight:6, verticalAlign:"middle"}} /> Save Profile Settings
                      </button>
                      <button type="button" className="btn danger" onClick={handleLogout}>
                        <IconLogout size={14} style={{marginRight:4, verticalAlign:"middle"}} /> Logout
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            <div>
              {/* Prominent Upgrade Your Profile Option Card on right */}
              <div className="panel" style={{background:"linear-gradient(135deg, #f0fdf9 0%, #e6f7f2 100%)", borderColor:"#9de0d2", marginBottom:"18px"}}>
                <div className="eyebrow" style={{color:"#08766d"}}>BENEFICIARY ONBOARDING</div>
                <h3 style={{margin:"6px 0 8px", color:"#0a584f"}}>⚡ Upgrade Your Profile</h3>
                <p style={{color:"#3f665e", fontSize:"12px", lineHeight:"1.45", margin:"0 0 12px"}}>
                  {profile?.isProfileUpgraded 
                    ? "✓ Your UDID beneficiary details are verified. You are eligible for 100% free mobility equipment." 
                    : "Complete your disability details, linked mobile number, and doorstep delivery address to claim free aids."}
                </p>
                <button 
                  type="button" 
                  className="btn primary full" 
                  onClick={() => setProfileTab("upgrade")}
                  style={{display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"10px 14px", fontWeight:"700"}}
                >
                  <IconBadgeCheck size={16} /> Upgrade Your Profile Option →
                </button>
              </div>

              <div className="panel">
                <h3>Account & Security</h3>
                <p><b>Role:</b> {profile?.type || "Donor"}</p>
                <p><b>Status:</b> <span className="badge green">Verified & Active</span></p>
                <button className="btn" style={{marginTop:"8px"}} onClick={()=>setToast("Password reset link sent to your registered email.")}>Reset Password</button>
              </div>

              <div className="panel">
                <h3>Language & Accessibility</h3>
                <label>Language
                  <select value={language} onChange={e=>handleLanguageChange(e.target.value)}>
                    <option value="English">English</option>
                    <option value="తెలుగు">తెలుగు</option>
                    <option value="हिन्दी">हिन्दी</option>
                  </select>
                </label>
                <label className="check"><input type="checkbox" checked={largeText} onChange={e=>setLargeText(e.target.checked)}/> {t.largerText}</label>
                <label className="check"><input type="checkbox" checked={highContrast} onChange={e=>setHighContrast(e.target.checked)}/> {t.higherContrast}</label>
              </div>
            </div>
          </div>
        </>}
        <footer className="footer"><span>About</span><span>How it works</span><span>Contact</span><span>FAQs</span><span>Privacy</span><span>Terms</span><span>Accessibility</span><span>Report an issue</span></footer>
      </section>
    </main>
    {modal==="donate"&&<Modal title="Donate a device" close={()=>setModal("")}><form onSubmit={submitDonation}><div className="form-grid"><Field label="Device name *" name="name" required placeholder="e.g. Manual wheelchair"/><SelectField label="Category" name="category" options={["Wheelchair","Crutches","Walker","Hearing Aid","Other"]}/><SelectField label="Condition" name="condition" options={["Working","Repairable","Needs inspection"]}/><Field label="Quantity *" name="qty" type="number" min="1" required defaultValue="1"/><SelectField label="State" name="state" options={["Telangana","Andhra Pradesh","Karnataka","Other"]}/><Field label="District *" name="district" required placeholder="District"/></div><div className="actions"><button className="btn primary"><IconDonations size={15} style={{marginRight:"6px",verticalAlign:"middle"}} /> Save donation</button><button type="button" className="btn" onClick={()=>setModal("")}>Cancel</button></div></form></Modal>}
    {modal==="request"&&<Modal title="Request equipment" close={()=>setModal("")}><form onSubmit={e=>{e.preventDefault();setModal("");setToast("Equipment request registered successfully. Our logistics coordinator will review it.");}}><Field label="Organization name *" name="org" required/><SelectField label="Equipment needed" name="equipment" options={["Wheelchair","Crutches","Walker","Hearing Aid"]}/><Field label="Quantity *" name="qty" type="number" min="1" required defaultValue="1"/><Field label="District *" name="district" required/><button className="btn primary"><IconNGO size={15} style={{marginRight:"6px",verticalAlign:"middle"}} /> Submit request</button></form></Modal>}
    {editingDevice&&<Modal title={`Edit donation: ${editingDevice.id}`} close={()=>setEditingDevice(null)}><form onSubmit={submitEditDonation}><div className="notice">Editing donation record <b>{editingDevice.id}</b>.</div><div className="form-grid"><Field label="Device name *" name="name" required defaultValue={editingDevice.name}/><SelectField label="Category" name="category" options={["Wheelchair","Crutches","Walker","Hearing Aid","Other"]} defaultValue={editingDevice.category}/><SelectField label="Condition" name="condition" options={["Working","Repairable","Needs inspection"]} defaultValue={editingDevice.condition}/><Field label="Quantity *" name="qty" type="number" min="1" required defaultValue={editingDevice.qty}/><SelectField label="State" name="state" options={["Telangana","Andhra Pradesh","Karnataka","Other"]} defaultValue={editingDevice.state}/><Field label="District *" name="district" required defaultValue={editingDevice.district}/><SelectField label="Lifecycle Stage" name="stage" options={STAGES.map(s=>`${s.step} - ${s.title}`)} defaultValue={`${editingDevice.stage||1} - ${STAGES.find(s=>s.step===(editingDevice.stage||1))?.title||""}`} wide/></div><div className="actions"><button className="btn primary"><IconCheck size={15} style={{marginRight:"6px",verticalAlign:"middle"}} /> Save changes</button><button type="button" className="btn" onClick={()=>setEditingDevice(null)}>Cancel</button></div></form></Modal>}
    {purchasingItem&&<Modal title={`Purchase / Claim: ${purchasingItem.name}`} close={()=>setPurchasingItem(null)}><form onSubmit={submitPurchase}><div className="notice"><b>Donation Origin:</b> {purchasingItem.donationId} · Refurbished & certified at {purchasingItem.hub}.</div><div className="form-grid"><Field label="Recipient Full Name *" name="name" required placeholder="Full name" defaultValue={profile?.name}/><Field label="Mobile Number *" name="mobile" required placeholder="+91 90000 00000" defaultValue={profile?.mobile}/><SelectField label="State *" name="state" options={["Telangana","Andhra Pradesh","Karnataka","Other"]} defaultValue={profile?.state||"Telangana"}/><Field label="District *" name="district" required placeholder="District" defaultValue={profile?.district}/><Field label="PIN Code *" name="pin" required pattern="[0-9]{6}" maxLength="6" placeholder="6 digits" defaultValue={profile?.pin}/><SelectField label="Payment / Subsidy Mode *" name="paymentMethod" options={[`Subsidized handling fee (${money(purchasingItem.handlingPrice)} via UPI / Netbanking)`,"100% Free with UDID Disability Certificate",`Cash on Delivery upon physical inspection (${money(purchasingItem.handlingPrice)})`]} wide defaultValue={profile?.udid ? "100% Free with UDID Disability Certificate" : undefined}/><Field label="UDID Disability Card No. (if claiming 100% free)" name="udid" placeholder="e.g. TG12345678901234" wide defaultValue={profile?.udid||""}/><Field label="Complete Delivery Address *" name="address" required placeholder="House/Flat, street, landmark" wide defaultValue={profile?.address}/></div><div className="actions"><button className="btn primary">Confirm order →</button><button type="button" className="btn" onClick={()=>setPurchasingItem(null)}>Cancel</button></div></form></Modal>}
    {modal==="upgradeProfile"&&<Modal title={`Upgrade Profile: Beneficiary & Disability Details ${profile?.udid ? `(${profile.udid})` : ""}`} close={()=>setModal("")}>
      <form onSubmit={submitUpgradeProfile}>
        <div className="notice" style={{background:"#f0fdf9", borderColor:"#a3dfd1", color:"#0d5f52"}}>
          ⓘ <b>Upgrade Beneficiary Profile:</b> Complete the remaining contact, disability verification, and doorstep delivery details below to qualify for 100% free refurbished equipment.
        </div>
        <div className="form-grid">
          <Field label="UDID Card Number" name="udidNumber" defaultValue={profile?.udid || "TG0120119950012345"} placeholder="e.g. TG0120119950012345" />
          <Field label="Name of User (as per UDID Card) *" name="name" required defaultValue={profile?.name || ""} placeholder="Full Name" />
          <Field label="Mobile Number (linked to UDID) *" name="mobile" required placeholder="+91 98000 00000" defaultValue={profile?.mobile || ""} />
          <Field label="Email Address (optional)" name="email" type="email" placeholder="you@example.com" defaultValue={profile?.email || ""} />
          <SelectField 
            label="Disability Category *" 
            name="disabilityType" 
            options={[
              "Locomotor Disability",
              "Cerebral Palsy",
              "Muscular Dystrophy",
              "Amputation / Limb Deficiency",
              "Dwarfism",
              "Visual Impairment",
              "Hearing Impairment",
              "Multiple Disabilities"
            ]} 
            defaultValue={profile?.disabilityType || "Locomotor Disability"} 
          />
          <Field 
            label="Disability Percentage (%) *" 
            name="disabilityPercent" 
            required 
            type="number" 
            min="40" 
            max="100" 
            placeholder="e.g. 75" 
            defaultValue={profile?.disabilityPercent || 75} 
          />
          <SelectField 
            label="Required Mobility Device *" 
            name="requiredAid" 
            options={[
              "Certified Manual Wheelchair",
              "Transit Wheelchair",
              "Folding Walking Frame",
              "Four-Wheel Rollator",
              "Forearm / Elbow Crutches (pair)",
              "Underarm Auxiliary Crutches (pair)",
              "Digital Hearing Aid (BTE / RIC)"
            ]} 
            defaultValue={profile?.requiredAid || "Certified Manual Wheelchair"} 
          />
          <SelectField label="State *" name="state" options={["Telangana","Andhra Pradesh","Karnataka","Other"]} defaultValue={profile?.state || "Telangana"} />
          <Field label="District *" name="district" required placeholder="e.g. Hyderabad" defaultValue={profile?.district || ""} />
          <Field label="PIN code *" name="pin" required pattern="[0-9]{6}" maxLength="6" placeholder="6 digits" defaultValue={profile?.pin || ""} />
          <Field label="Complete Delivery Address *" name="address" required placeholder="Door number, street, landmark for doorstep delivery" wide defaultValue={profile?.address || ""} />
        </div>
        <div className="actions" style={{marginTop:"18px"}}>
          <button type="submit" className="btn primary">
            <IconCheck size={14} style={{marginRight:6, verticalAlign:"middle"}} /> Save & Upgrade Profile
          </button>
          <button type="button" className="btn" onClick={()=>setModal("")}>Cancel</button>
        </div>
      </form>
    </Modal>}
    {toast&&<div className="toast" role="status">{toast}</div>}
  </div>;
}
function Field({label,name,wide=false,...props}){return <label className={`field ${wide?"wide":""}`}>{label}<input name={name} {...props}/></label>}
function SelectField({label,name,options,wide=false,defaultValue}){return <label className={`field ${wide?"wide":""}`}>{label}<select name={name} defaultValue={defaultValue||options[0]}>{options.map(o=><option key={o}>{o}</option>)}</select></label>}
function Modal({title,close,children}){return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)close();}}><div className="modal"><div className="modal-title"><h2>{title}</h2><button className="btn" onClick={close} type="button">✕</button></div>{children}</div></div>}

function DeviceTimeline({ device, onUpdateStage }) {
  const currentStage = Number(device.stage) || 1;

  return (
    <div className="device-timeline-wrapper" key={device.id}>
      <div className="timeline-header-card">
        <div className="timeline-device-main">
          <div style={{position:"relative", width:68, height:68, flexShrink:0}}>
            <img 
              src={device.image || (device.category === "Crutches" ? "/images/crutches_forearm.png" : device.category === "Walker" ? "/images/walker_folding.png" : device.category === "Hearing Aid" ? "/images/hearing_aid_digital.jpg" : "/images/wheelchair_manual.png")} 
              alt={device.name} 
              className="device-thumb-img" 
              style={{width:68, height:68, objectFit:"contain", borderRadius:10, background:"#f8faf9", border:"1px solid #e2ece8", padding:4, display:"block"}}
              onError={(e)=>{e.target.style.display="none";}} 
            />
            <span 
              title={device.category}
              style={{position:"absolute", bottom:-3, right:-3, width:24, height:24, borderRadius:"50%", background:"#e6f7f2", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", color:"#08766d", boxShadow:"0 1px 4px rgba(0,0,0,0.15)"}}
            >
              {device.category === "Crutches" ? <IconCrutches size={13} /> : device.category === "Walker" ? <IconWalker size={13} /> : device.category === "Hearing Aid" ? <IconHearingAid size={13} /> : <IconWheelchair size={13} />}
            </span>
          </div>
          <div className="timeline-device-title">
            <div className="line">
              <span className="badge">{device.id}</span>
              <span className={`badge ${currentStage >= 6 ? "green" : currentStage >= 4 ? "gold" : ""}`}>
                {device.status}
              </span>
              <span className="badge">Stage {currentStage} of 7</span>
            </div>
            <h3>{device.name}</h3>
            <p className="timeline-meta">
              <span><strong>Category:</strong> {device.category}</span>
              <span><strong>Condition:</strong> {device.condition}</span>
              <span><strong>Quantity:</strong> {device.qty}</span>
              <span><strong>Location:</strong> {device.district}, {device.state}</span>
              <span><strong>Submitted:</strong> {device.date}</span>
            </p>
          </div>
        </div>

        <div className="timeline-stage-controls">
          <button 
            type="button"
            className="btn" 
            disabled={currentStage <= 1}
            onClick={() => onUpdateStage(device.id, currentStage - 1)}
            title="Step back to previous stage"
          >
            ← Previous stage
          </button>
          <button 
            type="button"
            className="btn primary" 
            disabled={currentStage >= 7}
            onClick={() => onUpdateStage(device.id, currentStage + 1)}
            title="Advance to next stage"
          >
            Advance stage →
          </button>
        </div>
      </div>

      {/* Horizontal Pipeline Stepper */}
      <div className="stepper-bar-container">
        <div className="stepper-track">
          {STAGES.map((s) => {
            const isCompleted = s.step < currentStage;
            const isCurrent = s.step === currentStage;
            const isPending = s.step > currentStage;
            return (
              <div 
                key={s.step} 
                className={`stepper-node ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""} ${isPending ? "pending" : ""}`}
                onClick={() => onUpdateStage(device.id, s.step)}
                title={`Jump directly to Step ${s.step}: ${s.title}`}
              >
                <div className="stepper-dot">
                  {isCompleted ? "✓" : s.step}
                </div>
                <div className="stepper-label">{s.short}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vertical Timeline Flow */}
      <div className="timeline-vertical-flow">
        <div className="timeline-vertical-spine" />
        {STAGES.map((stage) => {
          const isCompleted = stage.step < currentStage;
          const isCurrent = stage.step === currentStage;
          const isPending = stage.step > currentStage;

          return (
            <div 
              key={stage.step} 
              className={`timeline-entry ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""} ${isPending ? "pending" : ""}`}
              onClick={() => onUpdateStage(device.id, stage.step)}
              title={`Click to set stage to: ${stage.title}`}
            >
              <div className="timeline-marker">
                <div className="marker-icon">
                  {isCompleted ? "✓" : isCurrent ? "●" : stage.step}
                </div>
              </div>
              <div className="timeline-content-bubble">
                <div className="bubble-top">
                  <h4 className="bubble-title">{stage.icon} Step {stage.step}: {stage.title}</h4>
                  <span className={`badge ${isCompleted ? "green" : isCurrent ? "gold" : ""}`}>
                    {isCompleted ? "✓ Completed" : isCurrent ? "▶ Current Stage" : "Upcoming"}
                  </span>
                </div>
                <p className="bubble-desc">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
