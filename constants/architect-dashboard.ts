export const architectDashboard = {
  stats: {
    activeProjects: 8,
    completed: 24,
    newInquiries: 3
  }
};

export const recentProjects = [
  {
    id: 1,
    title: 'Modern Villa Renovation',
    location: 'Makati City',
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    progress: 75
  },
  {
    id: 2,
    title: 'Commercial Office Design',
    location: 'BGC, Taguig',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    progress: 100
  },
  {
    id: 3,
    title: 'Residential Complex',
    location: 'Quezon City',
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    progress: 25
  },
  {
    id: 4,
    title: 'Sustainable Home',
    location: 'Pasig City',
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    progress: 60
  }
];

export const clientInquiries = [
  {
    id: 1,
    clientName: 'Maria Santos',
    clientId: 'client_001',
    isVerified: true,
    date: '2 hours ago',
    description: 'Looking for a modern residential design for a 3-bedroom house in Makati. Budget range: ₱2-3M.',
    projectType: 'Residential'
  },
  {
    id: 2,
    clientName: 'John Rivera',
    clientId: 'client_002',
    isVerified: false,
    date: '1 day ago',
    description: 'Need commercial space design for a new restaurant in BGC. Timeline: 3 months.',
    projectType: 'Commercial'
  },
  {
    id: 3,
    clientName: 'Lisa Chen',
    clientId: 'client_003',
    isVerified: true,
    date: '3 days ago',
    description: 'Interior renovation for a 2-story townhouse. Focus on sustainable materials.',
    projectType: 'Interior Design'
  }
];

export const partnerships = [
  {
    id: 1,
    companyName: 'BuildMart Philippines',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Premium construction materials and hardware supplies',
    website: 'https://buildmart.ph',
    category: 'Construction Materials'
  },
  {
    id: 2,
    companyName: 'TileWorld Premium',
    logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Premium tiles and flooring materials with installation',
    website: 'https://tileworld.ph',
    category: 'Tiles & Flooring'
  },
  {
    id: 3,
    companyName: 'SteelCraft Fabrication',
    logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Custom steel fabrication and metalwork solutions',
    website: 'https://steelcraft.ph',
    category: 'Steel Fabrication'
  },
  {
    id: 4,
    companyName: 'EcoStone Materials',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Sustainable and eco-friendly building materials',
    website: 'https://ecostone.com',
    category: 'Eco Materials'
  }
];