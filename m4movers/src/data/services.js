import {
  Home, Building2, Warehouse, Boxes, Package, Archive, Globe2, Truck,
  Building, PackageCheck, ClipboardList, Wrench, HardHat, Sofa, Container,
} from 'lucide-react'

export const services = [
  {
    slug: 'home-relocation',
    icon: Home,
    title: 'Home Relocation',
    short: 'Full-service household moves handled with care, start to finish.',
    description:
      'Our home relocation teams handle every room of your house — from fragile china to heavy wardrobes — with padded wrapping, labeled inventory, and careful loading so nothing shifts in transit.',
    benefits: ['Free pre-move survey', 'Padded furniture wrapping', 'Room-by-room inventory', 'Same-day delivery available'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'office-relocation',
    icon: Building2,
    title: 'Office Relocation',
    short: 'Minimise downtime with weekend and after-hours office moves.',
    description:
      'We plan office relocations around your business hours, disassembling workstations, safely moving IT equipment, and rebuilding your new office so your team is productive from day one.',
    benefits: ['Weekend & night moves', 'IT & server handling', 'Workstation reassembly', 'Dedicated move manager'],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'villa-moving',
    icon: Building,
    title: 'Villa Moving',
    short: 'Large-scale villa moves across Dubai, Abu Dhabi and Sharjah.',
    description:
      'Villa moves involve more rooms, more furniture, and often gardens or majlis areas. Our larger crews and trucks are sized to match, so your entire villa is packed and moved in one coordinated day.',
    benefits: ['Multi-truck coordination', 'Outdoor & majlis furniture', 'Chandelier & mirror handling', 'Full unpacking service'],
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'apartment-moving',
    icon: Container,
    title: 'Apartment Moving',
    short: 'Elevator-friendly moves built for Dubai\'s high-rise towers.',
    description:
      'We coordinate with building management for elevator bookings and loading-bay access, so your apartment move stays on schedule even in the busiest towers.',
    benefits: ['Building NOC assistance', 'Elevator scheduling', 'Compact-crew efficiency', 'Furniture protection wrap'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'furniture-moving',
    icon: Sofa,
    title: 'Furniture Moving',
    short: 'Single-item or bulk furniture transport, wrapped and secured.',
    description:
      'Whether it\'s one sofa or a full showroom order, our team wraps, straps, and transports furniture using padded blankets and shock-absorbing loading techniques.',
    benefits: ['Single-item pickups', 'Shock-absorbing straps', 'Assembly & disassembly', 'Bulk order transport'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'packing-services',
    icon: Package,
    title: 'Packing Services',
    short: 'Professional packing materials and techniques for every item.',
    description:
      'Our packers use high-grade boxes, bubble wrap, and crating for fragile or valuable items, labeling every box by room so unpacking at your new home is fast and organised.',
    benefits: ['Grade-A packing materials', 'Fragile item crating', 'Labeled box inventory', 'Optional unpacking add-on'],
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'storage-solutions',
    icon: Archive,
    title: 'Storage Solutions',
    short: 'Short and long-term storage in secure, climate-aware facilities.',
    description:
      'Need a gap between move-out and move-in? Our storage facilities keep your belongings secure, inventoried, and accessible for as long as you need.',
    benefits: ['Short & long-term plans', 'CCTV-monitored facility', 'Inventoried storage', 'Flexible access scheduling'],
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'international-relocation',
    icon: Globe2,
    title: 'International Relocation',
    short: 'Door-to-door international moves with full customs handling.',
    description:
      'Moving abroad or into the UAE? We manage export packing, freight, customs documentation, and delivery to your new address anywhere in the world.',
    benefits: ['Air & sea freight options', 'Customs documentation', 'Door-to-door tracking', 'Destination unpacking'],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'local-moving',
    icon: Truck,
    title: 'Local Moving',
    short: 'Same-day and next-day moves anywhere within the Emirates.',
    description:
      'For moves across town, our local teams offer flexible same-day and next-day scheduling, ideal for tenants working around lease dates.',
    benefits: ['Same-day scheduling', 'Transparent flat pricing', 'GPS-tracked trucks', 'No hidden fees'],
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'commercial-moving',
    icon: ClipboardList,
    title: 'Commercial Moving',
    short: 'Retail, clinic and showroom relocations with asset tracking.',
    description:
      'From retail fit-outs to clinic equipment, our commercial moving teams handle sensitive assets with tagged inventory and insured transport.',
    benefits: ['Tagged asset inventory', 'Insured equipment transport', 'Fit-out coordination', 'After-hours availability'],
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'warehouse-moving',
    icon: Warehouse,
    title: 'Warehouse Moving',
    short: 'Bulk pallet and racking relocation with forklift support.',
    description:
      'We relocate warehouse stock, racking, and pallets using forklifts and box trucks, with a full stock reconciliation before and after the move.',
    benefits: ['Forklift & pallet handling', 'Racking dismantling', 'Stock reconciliation', 'Scheduled bulk transport'],
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'loading-unloading',
    icon: Boxes,
    title: 'Loading & Unloading',
    short: 'Manpower-only service if you already have your own truck.',
    description:
      'Already rented a truck? Our loading and unloading crews will do the heavy lifting, wrapping, and stacking so you don\'t have to.',
    benefits: ['Hourly manpower booking', 'Heavy-item lifting', 'Careful truck stacking', 'No move-management needed'],
    image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'furniture-installation',
    icon: PackageCheck,
    title: 'Furniture Installation',
    short: 'Assembly of wardrobes, beds, office furniture and flat-packs.',
    description:
      'Our technicians assemble flat-pack and modular furniture at your new home or office, including wardrobes, beds, desks, and shelving units.',
    benefits: ['Flat-pack assembly', 'Wardrobe & bed setup', 'Office furniture build', 'Wall-mounting on request'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'handyman-services',
    icon: Wrench,
    title: 'Handyman Services',
    short: 'TV mounting, curtain fixing and small repairs after your move.',
    description:
      'Settle into your new place faster with our handyman add-on — TV mounting, curtain rods, shelving, and small fixture repairs.',
    benefits: ['TV & mirror mounting', 'Curtain rod fitting', 'Shelving installation', 'Minor repairs'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'movers-with-packing-material',
    icon: HardHat,
    title: 'Movers with Packing Material',
    short: 'All-inclusive moving crew plus boxes, tape and wrap supplied.',
    description:
      'Our all-inclusive package brings the crew and every packing material you need — boxes, tape, bubble wrap, and furniture covers — in one flat rate.',
    benefits: ['All materials included', 'No separate purchases', 'Flat-rate pricing', 'Leftover material pickup'],
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop',
  },
]
