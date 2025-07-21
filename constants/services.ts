export interface Material {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
  category: string;
}

export interface Service {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  isVerified: boolean;
  followers: number;
  description: string;
  phone: string;
  email: string;
  website: string;
  deliveryTime: string;
  deliveryFee: number;
  materials: Material[];
}

// Only showing 4 main stores as requested
export const services: Service[] = [
  {
    id: 1,
    name: 'BuildMart Philippines',
    category: 'Construction Materials',
    rating: 4.8,
    reviews: 156,
    location: 'Makati City',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    followers: 1240,
    description: 'Complete construction materials supplier with quality products and competitive prices.',
    phone: '+63 912 345 6789',
    email: 'info@buildmart.ph',
    website: 'www.buildmart.ph',
    deliveryTime: '2-3 days',
    deliveryFee: 150,
    materials: [
      { id: 1, name: 'Portland Cement', price: 280, unit: 'bag', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', description: 'High-quality Portland cement for construction', inStock: true, category: 'Cement' },
      { id: 2, name: 'Steel Rebar 12mm', price: 45, unit: 'pc', image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&h=300&fit=crop', description: 'Grade 40 steel reinforcement bar', inStock: true, category: 'Steel' },
      { id: 3, name: 'Ceramic Floor Tiles', price: 120, unit: 'sqm', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop', description: '600x600mm ceramic floor tiles', inStock: true, category: 'Tiles' },
      { id: 4, name: 'Latex Paint White', price: 850, unit: 'gallon', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop', description: 'Premium latex paint for interior walls', inStock: true, category: 'Paint' },
      { id: 5, name: 'Hollow Blocks 4"', price: 12, unit: 'pc', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', description: 'Standard 4-inch hollow concrete blocks', inStock: true, category: 'Blocks' },
      { id: 6, name: 'Roofing Sheets', price: 380, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Galvanized iron roofing sheets', inStock: true, category: 'Roofing' },
      { id: 7, name: 'PVC Pipes 4"', price: 180, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: '4-inch PVC drainage pipes', inStock: true, category: 'Plumbing' },
      { id: 8, name: 'Electrical Wire 12AWG', price: 85, unit: 'meter', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: 'THHN electrical wire 12AWG', inStock: true, category: 'Electrical' },
      { id: 9, name: 'Sand (Fine)', price: 1200, unit: 'cubic meter', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', description: 'Fine sand for construction', inStock: true, category: 'Aggregates' },
      { id: 10, name: 'Gravel', price: 1500, unit: 'cubic meter', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', description: 'Construction grade gravel', inStock: true, category: 'Aggregates' },
      { id: 11, name: 'Wood Lumber 2x4', price: 120, unit: 'pc', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop', description: '2x4 inches wood lumber', inStock: true, category: 'Wood' },
      { id: 12, name: 'Nails (Common)', price: 65, unit: 'kg', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Common construction nails', inStock: true, category: 'Hardware' },
      { id: 13, name: 'Door Handle Set', price: 450, unit: 'set', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', description: 'Stainless steel door handle set', inStock: true, category: 'Hardware' },
      { id: 14, name: 'Window Glass 5mm', price: 280, unit: 'sqm', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', description: 'Clear float glass 5mm thickness', inStock: true, category: 'Glass' },
      { id: 15, name: 'Insulation Foam', price: 320, unit: 'roll', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop', description: 'Thermal insulation foam roll', inStock: false, category: 'Insulation' }
    ]
  },
  {
    id: 2,
    name: 'Elite Hardware Store',
    category: 'Hardware & Tools',
    rating: 4.9,
    reviews: 89,
    location: 'Quezon City',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    followers: 856,
    description: 'Professional hardware and tools supplier for construction and home improvement.',
    phone: '+63 917 234 5678',
    email: 'contact@elitehardware.ph',
    website: 'www.elitehardware.ph',
    deliveryTime: '1-2 days',
    deliveryFee: 100,
    materials: [
      { id: 16, name: 'Hammer (16oz)', price: 280, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Professional claw hammer 16oz', inStock: true, category: 'Tools' },
      { id: 17, name: 'Screwdriver Set', price: 450, unit: 'set', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Complete screwdriver set with case', inStock: true, category: 'Tools' },
      { id: 18, name: 'Power Drill', price: 2800, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Cordless power drill with battery', inStock: true, category: 'Power Tools' },
      { id: 19, name: 'Measuring Tape 5m', price: 180, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: '5-meter steel measuring tape', inStock: true, category: 'Tools' },
      { id: 20, name: 'Safety Helmet', price: 320, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Construction safety helmet', inStock: true, category: 'Safety' },
      { id: 21, name: 'Work Gloves', price: 85, unit: 'pair', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Heavy-duty work gloves', inStock: true, category: 'Safety' },
      { id: 22, name: 'Level Tool 24"', price: 650, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: '24-inch aluminum level tool', inStock: true, category: 'Tools' },
      { id: 23, name: 'Circular Saw Blade', price: 380, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: '7.25" circular saw blade', inStock: true, category: 'Tools' },
      { id: 24, name: 'Extension Cord 20m', price: 850, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: '20-meter heavy-duty extension cord', inStock: true, category: 'Electrical' },
      { id: 25, name: 'Tool Box Large', price: 1200, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Large metal tool storage box', inStock: true, category: 'Storage' },
      { id: 26, name: 'Wrench Set', price: 680, unit: 'set', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Complete wrench set 8-24mm', inStock: true, category: 'Tools' },
      { id: 27, name: 'Pliers Set', price: 420, unit: 'set', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Professional pliers set', inStock: true, category: 'Tools' },
      { id: 28, name: 'Utility Knife', price: 120, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Heavy-duty utility knife', inStock: true, category: 'Tools' },
      { id: 29, name: 'Safety Goggles', price: 150, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Clear safety goggles', inStock: true, category: 'Safety' },
      { id: 30, name: 'Flashlight LED', price: 280, unit: 'pc', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop', description: 'Rechargeable LED flashlight', inStock: false, category: 'Tools' }
    ]
  },
  {
    id: 3,
    name: 'PowerTech Electrical',
    category: 'Electrical Supplies',
    rating: 4.7,
    reviews: 124,
    location: 'Taguig City',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    followers: 432,
    description: 'Licensed electrical supplies and equipment for residential and commercial projects.',
    phone: '+63 918 345 6789',
    email: 'service@powertech.ph',
    website: 'www.powertech.ph',
    deliveryTime: '1-3 days',
    deliveryFee: 120,
    materials: [
      { id: 31, name: 'Circuit Breaker 20A', price: 180, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: '20-amp single pole circuit breaker', inStock: true, category: 'Electrical' },
      { id: 32, name: 'Electrical Panel 12-way', price: 1200, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: '12-way electrical distribution panel', inStock: true, category: 'Electrical' },
      { id: 33, name: 'LED Bulb 12W', price: 85, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: '12W LED bulb daylight', inStock: true, category: 'Lighting' },
      { id: 34, name: 'Ceiling Fan 52"', price: 2800, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: '52-inch ceiling fan with remote', inStock: true, category: 'Lighting' },
      { id: 35, name: 'Wall Switch 1-gang', price: 45, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: 'Single gang wall switch', inStock: true, category: 'Electrical' },
      { id: 36, name: 'Electrical Outlet', price: 65, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: 'Standard electrical outlet', inStock: true, category: 'Electrical' },
      { id: 37, name: 'Conduit PVC 1/2"', price: 25, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: '1/2 inch PVC electrical conduit', inStock: true, category: 'Electrical' },
      { id: 38, name: 'Wire Nuts (Pack)', price: 35, unit: 'pack', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: 'Assorted wire nuts pack', inStock: true, category: 'Electrical' },
      { id: 39, name: 'Electrical Tape', price: 28, unit: 'roll', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: 'Black electrical insulation tape', inStock: true, category: 'Electrical' },
      { id: 40, name: 'Junction Box 4x4', price: 18, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: '4x4 inch electrical junction box', inStock: true, category: 'Electrical' },
      { id: 41, name: 'Fluorescent Tube 36W', price: 120, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: '36W T8 fluorescent tube', inStock: true, category: 'Lighting' },
      { id: 42, name: 'Motion Sensor Switch', price: 380, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: 'PIR motion sensor light switch', inStock: true, category: 'Electrical' },
      { id: 43, name: 'GFCI Outlet', price: 450, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: 'Ground fault circuit interrupter outlet', inStock: true, category: 'Electrical' },
      { id: 44, name: 'Voltage Tester', price: 280, unit: 'pc', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: 'Non-contact voltage tester', inStock: true, category: 'Tools' },
      { id: 45, name: 'Cable Ties (Pack)', price: 45, unit: 'pack', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop', description: 'Assorted cable ties pack', inStock: false, category: 'Electrical' }
    ]
  },
  {
    id: 4,
    name: 'AquaFlow Plumbing',
    category: 'Plumbing Supplies',
    rating: 4.6,
    reviews: 98,
    location: 'Pasig City',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    followers: 567,
    description: 'Complete plumbing supplies and fixtures for all your water and drainage needs.',
    phone: '+63 919 456 7890',
    email: 'info@aquaflow.ph',
    website: 'www.aquaflow.ph',
    deliveryTime: '2-4 days',
    deliveryFee: 180,
    materials: [
      { id: 46, name: 'Water Faucet Kitchen', price: 850, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: 'Stainless steel kitchen faucet', inStock: true, category: 'Fixtures' },
      { id: 47, name: 'Toilet Bowl Complete', price: 4500, unit: 'set', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: 'Complete toilet bowl with tank', inStock: true, category: 'Fixtures' },
      { id: 48, name: 'Shower Head Rain', price: 680, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: '8-inch rain shower head', inStock: true, category: 'Fixtures' },
      { id: 49, name: 'PVC Elbow 90° 4"', price: 35, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: '4-inch PVC 90-degree elbow', inStock: true, category: 'Fittings' },
      { id: 50, name: 'Water Heater 30L', price: 8500, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: '30-liter electric water heater', inStock: true, category: 'Appliances' },
      { id: 51, name: 'Sink Stainless 2-bowl', price: 2800, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: 'Double bowl stainless steel sink', inStock: true, category: 'Fixtures' },
      { id: 52, name: 'Pipe Wrench 12"', price: 450, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: '12-inch pipe wrench', inStock: true, category: 'Tools' },
      { id: 53, name: 'Ball Valve 1/2"', price: 85, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: '1/2 inch brass ball valve', inStock: true, category: 'Fittings' },
      { id: 54, name: 'Flexible Hose 1/2"', price: 120, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: '1/2 inch flexible water hose', inStock: true, category: 'Fittings' },
      { id: 55, name: 'Drain Cleaner Chemical', price: 180, unit: 'bottle', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: 'Professional drain cleaner', inStock: true, category: 'Chemicals' },
      { id: 56, name: 'Pipe Cutter 1/2-2"', price: 680, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: 'Pipe cutter for 1/2 to 2 inch pipes', inStock: true, category: 'Tools' },
      { id: 57, name: 'Toilet Paper Holder', price: 280, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: 'Stainless steel toilet paper holder', inStock: true, category: 'Accessories' },
      { id: 58, name: 'Water Pump 1HP', price: 5500, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: '1HP centrifugal water pump', inStock: true, category: 'Appliances' },
      { id: 59, name: 'Plumber\'s Putty', price: 85, unit: 'container', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: 'Waterproof plumber\'s putty', inStock: true, category: 'Sealants' },
      { id: 60, name: 'Pressure Gauge', price: 320, unit: 'pc', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop', description: 'Water pressure gauge 0-160 PSI', inStock: false, category: 'Tools' }
    ]
  }
];

export interface CartItem {
  material: Material;
  quantity: number;
  serviceId: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  address: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  estimatedDelivery: string;
  createdAt: Date;
}