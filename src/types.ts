export interface Venue {
  id: string;
  name: string;
  type: string;
  distance: string;
  address: string;
  image: string;
  crowdLevel: 'Low' | 'Medium' | 'High';
  price: string;
  lat?: number;
  lng?: number;
}

export interface Game {
  id: string;
  venueId: string;
  venueName: string;
  sport: string;
  time: string;
  level: string;
  currentPlayers: number;
  maxPlayers: number;
  cost: string;
  creator: string;
  status: 'Pending' | 'Recruiting' | 'Locked' | 'InProgress' | 'To be Evaluated' | 'Closed';
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
}
