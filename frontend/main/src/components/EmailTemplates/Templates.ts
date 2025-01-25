export interface Template {
    id: string;
    title: string;
    description: string;
    industry: string;
    imageUrl: string;
    previewUrl: string;
  }
  
  export const templates: Template[] = [
    {
      id: '1',
      title: 'Product Launch Announcement',
      description: 'A sleek template for announcing new product launches with engaging visuals and clear CTAs.',
      industry: 'eCommerce',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      previewUrl: '#',
    },
    {
      id: '2',
      title: 'Seasonal Menu Update',
      description: 'Showcase your latest seasonal dishes with this appetizing email template.',
      industry: 'Restaurant',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
      previewUrl: '#',
    },
    {
      id: '3',
      title: 'Spa Day Promotion',
      description: 'Promote your spa services with this calming and inviting email design.',
      industry: 'Beauty',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
      previewUrl: '#',
    },
    {
      id: '4',
      title: 'Abandoned Cart Recovery',
      description: 'Bring customers back with this effective abandoned cart reminder template.',
      industry: 'eCommerce',
      imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
      previewUrl: '#',
    },
    {
      id: '5',
      title: 'Weekly Special Offers',
      description: 'Highlight your weekly deals and promotions with this eye-catching template.',
      industry: 'Restaurant',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      previewUrl: '#',
    },
    {
      id: '6',
      title: 'Beauty Workshop Invitation',
      description: 'Invite clients to exclusive beauty workshops and events with this template.',
      industry: 'Beauty',
      imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=800',
      previewUrl: '#',
    },
  ];