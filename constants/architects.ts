export const architects = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    specialty: 'Residential Architecture',
    rating: 4.9,
    reviews: 24,
    location: 'Makati City',
    image: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    following: 12,
    followers: 156,
    projects: 18,
    licenseNumber: 'AR-10001',
    experience: 8,
    email: 'carlos.mendoza@example.com',
    phone: '+63 912 345 6789',
    portfolio: [
      {
        id: 1,
        title: 'Modern Villa',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        title: 'Family Home',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 3,
        title: 'Townhouse',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'Maria Santos',
        rating: 5,
        date: 'June 15, 2025',
        comment: 'Carlos designed our dream home perfectly. His attention to detail and understanding of our needs was exceptional.'
      },
      {
        id: 2,
        clientName: 'John Rivera',
        rating: 5,
        date: 'May 20, 2025',
        comment: 'Professional and creative. The project was completed on time and exceeded our expectations.'
      }
    ]
  },
  {
    id: 2,
    name: 'Anna Reyes',
    specialty: 'Interior Design',
    rating: 4.7,
    reviews: 18,
    location: 'Quezon City',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: false,
    following: 8,
    followers: 89,
    projects: 12,
    licenseNumber: 'AR-10002',
    experience: 5,
    email: 'anna.reyes@example.com',
    phone: '+63 917 234 5678',
    portfolio: [
      {
        id: 1,
        title: 'Modern Office',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        title: 'Luxury Apartment',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'Lisa Chen',
        rating: 5,
        date: 'July 2, 2025',
        comment: 'Anna transformed our space beautifully. Her design sense is impeccable.'
      }
    ]
  },
  {
    id: 3,
    name: 'Miguel Santos',
    specialty: 'Commercial Architecture',
    rating: 4.8,
    reviews: 31,
    location: 'Taguig City',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    following: 15,
    followers: 234,
    projects: 28,
    licenseNumber: 'AR-10003',
    experience: 12,
    email: 'miguel.santos@example.com',
    phone: '+63 918 345 6789',
    portfolio: [
      {
        id: 1,
        title: 'Office Complex',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        title: 'Shopping Center',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'Corporate Client',
        rating: 5,
        date: 'June 28, 2025',
        comment: 'Miguel delivered an outstanding commercial space that perfectly fits our business needs.'
      }
    ]
  },
  {
    id: 4,
    name: 'Sofia Lim',
    specialty: 'Landscape Architecture',
    rating: 4.6,
    reviews: 15,
    location: 'Pasig City',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    following: 6,
    followers: 78,
    projects: 14,
    licenseNumber: 'AR-10004',
    experience: 6,
    email: 'sofia.lim@example.com',
    phone: '+63 919 456 7890',
    portfolio: [
      {
        id: 1,
        title: 'Garden Design',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'Garden Owner',
        rating: 5,
        date: 'July 1, 2025',
        comment: 'Sofia created a beautiful landscape design for our property.'
      }
    ]
  },
  {
    id: 5,
    name: 'Rafael Cruz',
    specialty: 'Industrial Architecture',
    rating: 4.5,
    reviews: 22,
    location: 'Muntinlupa City',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: false,
    following: 9,
    followers: 112,
    projects: 19,
    licenseNumber: 'AR-10005',
    experience: 10,
    email: 'rafael.cruz@example.com',
    phone: '+63 920 567 8901',
    portfolio: [
      {
        id: 1,
        title: 'Factory Design',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'Industrial Client',
        rating: 4,
        date: 'June 10, 2025',
        comment: 'Good industrial design solutions. Professional service.'
      }
    ]
  },
  {
    id: 6,
    name: 'Isabella Garcia',
    specialty: 'Institutional Architecture',
    rating: 4.9,
    reviews: 28,
    location: 'Paranaque City',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    following: 18,
    followers: 267,
    projects: 32,
    licenseNumber: 'AR-10006',
    experience: 14,
    email: 'isabella.garcia@example.com',
    phone: '+63 921 678 9012',
    portfolio: [
      {
        id: 1,
        title: 'School Building',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'School Board',
        rating: 5,
        date: 'May 15, 2025',
        comment: 'Isabella designed an excellent educational facility that serves our community well.'
      }
    ]
  },
  {
    id: 7,
    name: 'Diego Martinez',
    specialty: 'Heritage Architecture',
    rating: 4.7,
    reviews: 19,
    location: 'Las Pinas City',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: false,
    following: 11,
    followers: 145,
    projects: 16,
    licenseNumber: 'AR-10007',
    experience: 9,
    email: 'diego.martinez@example.com',
    phone: '+63 922 789 0123',
    portfolio: [
      {
        id: 1,
        title: 'Heritage Restoration',
        image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'Heritage Foundation',
        rating: 5,
        date: 'April 20, 2025',
        comment: 'Diego expertly restored our historic building while preserving its character.'
      }
    ]
  },
  {
    id: 8,
    name: 'Maria Fernandez',
    specialty: 'Urban Planning',
    rating: 4.8,
    reviews: 25,
    location: 'Marikina City',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    following: 22,
    followers: 198,
    projects: 21,
    licenseNumber: 'AR-10008',
    experience: 11,
    email: 'maria.fernandez@example.com',
    phone: '+63 923 890 1234',
    portfolio: [
      {
        id: 1,
        title: 'City Development',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'City Council',
        rating: 5,
        date: 'March 30, 2025',
        comment: 'Maria provided excellent urban planning solutions for our city development project.'
      }
    ]
  },
  {
    id: 9,
    name: 'Antonio Dela Cruz',
    specialty: 'Green Architecture',
    rating: 4.6,
    reviews: 17,
    location: 'Caloocan City',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    following: 7,
    followers: 92,
    projects: 13,
    licenseNumber: 'AR-10009',
    experience: 7,
    email: 'antonio.delacruz@example.com',
    phone: '+63 924 901 2345',
    portfolio: [
      {
        id: 1,
        title: 'Eco Building',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'Eco Client',
        rating: 5,
        date: 'February 25, 2025',
        comment: 'Antonio designed a sustainable building that exceeded our environmental goals.'
      }
    ]
  },
  {
    id: 10,
    name: 'Chelsi Hontiveros',
    specialty: 'Sustainable Architecture',
    rating: 4.9,
    reviews: 33,
    location: 'Makati City',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    following: 6,
    followers: 248,
    projects: 24,
    licenseNumber: 'AR-12345',
    experience: 8,
    email: 'chelsi.hontiveros@example.com',
    phone: '+63 912 345 6789',
    portfolio: [
      {
        id: 1,
        title: 'Sustainable Home',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        title: 'Green Office',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 3,
        title: 'Eco Complex',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    clientReviews: [
      {
        id: 1,
        clientName: 'Green Client',
        rating: 4,
        date: 'July 1, 2025',
        comment: 'Great architect to work with. Very professional and attentive to details. The project was completed on time and within budget.'
      },
      {
        id: 2,
        clientName: 'Eco Family',
        rating: 5,
        date: 'June 15, 2025',
        comment: 'Chelsi designed our sustainable home perfectly. Her expertise in green architecture is outstanding.'
      },
      {
        id: 3,
        clientName: 'Corporate Green',
        rating: 5,
        date: 'May 30, 2025',
        comment: 'Excellent sustainable design solutions. Highly recommended for eco-friendly projects.'
      }
    ]
  }
];