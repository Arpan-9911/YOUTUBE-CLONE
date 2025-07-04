import YouTubeIcon from "./favicon.png";

const shorts = [
  { 
    _id: 'short1',
    title: 'Street Food in Delhi 🇮🇳',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 143000,
    createdAt: '2025-06-24T18:45:00Z'
  },
  {
    _id: 'short2',
    title: '5-Minute Morning Workout 💪',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    views: 82000,
    createdAt: '2025-06-26T07:10:00Z'
  },
  {
    _id: 'short3',
    title: 'Best Sunset Timelapse 🌇',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 56000,
    createdAt: '2025-06-27T17:00:00Z'
  },
  {
    _id: 'short4',
    title: 'This AI Tool Will Blow Your Mind 🤯',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    views: 197000,
    createdAt: '2025-06-29T14:25:00Z'
  },
  {
    _id: 'short5',
    title: 'Quick 3-Ingredient Recipe 🍽️',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 91000,
    createdAt: '2025-06-30T08:40:00Z'
  },
  {
    _id: 'short6',
    title: 'Fastest Typist in the World! ⌨️',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    views: 74000,
    createdAt: '2025-07-01T12:30:00Z'
  }
];

const videos = [
  {
    _id: 'video1',
    title: 'Day in the Life of a Software Engineer',
    description: 'Ever wondered what a day at Google looks like for an engineer? Watch this.',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    channelName: 'Life at Tech',
    views: 235000,
    likes: 12000,
    createdAt: '2025-05-15T09:30:00Z'
  },
  {
    _id: 'video2',
    title: 'How I Built My Portfolio Website from Scratch',
    description: 'Step-by-step guide on building a developer portfolio using React.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    channelName: 'CodeCraft',
    views: 148000,
    likes: 8900,
    createdAt: '2025-06-05T14:45:00Z',
    comments:[
      {
        _id: 'comment1',
        name: 'John Doe',
        message: 'Great video! Thanks for sharing.',
        createdAt: '2025-06-05T15:00:00Z'
      },
      {
        _id: 'comment2',
        name: 'Jane Smith',
        message: 'I learned a lot from this video. Thank you!',
        createdAt: '2025-06-05T15:30:00Z'
      }
    ]
  },
  {
    _id: 'video3',
    title: 'Exploring Varanasi’s Ganga Aarti 🌊',
    description: 'Spiritual vibes, rituals, and stunning visuals from the ghats.',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    channelName: 'CodeCraft',
    views: 186000,
    likes: 10200,
    createdAt: '2025-06-10T19:00:00Z'
  },
  {
    _id: 'video4',
    title: 'Top 5 Online Side Hustles in 2025 💼',
    description: 'Looking for ways to earn online? Here are 5 solid ideas.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    channelName: 'SmartMoney',
    views: 267000,
    likes: 15000,
    createdAt: '2025-06-20T11:15:00Z'
  },
  {
    _id: 'video5',
    title: 'Full Stack Developer Roadmap',
    description: 'Everything you need to learn in 2025 to become a full stack developer.',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    channelName: 'TechPath',
    views: 198000,
    likes: 13400,
    createdAt: '2025-06-22T16:00:00Z'
  },
  {
    _id: 'video6',
    title: 'Why You Should Visit Himachal Pradesh 🏔️',
    description: 'Nature, food, and adventure — here’s why Himachal should be your next trip.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    channelName: 'WanderLens',
    views: 142000,
    likes: 7800,
    createdAt: '2025-07-01T13:50:00Z'
  }
];

export default { YouTubeIcon, shorts, videos };