const USERS = [
  {
    isFollowing: false,
    id: 1,
    name: 'User Test',
    username: 'user_test',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam faucibus velit ante, eu facilisis nunc interdum non.',
    imageURL:
      'https://images.unsplash.com/photo-1593697972672-b1c1902219e4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Buenos Aires, Argentina',
    tags: ['Guitarrista', 'Productor/a', 'Beatmaker'],
    followers: 930,
    following: 15,
    links: [
      { name: 'Spotify', url: '' },
      { name: 'Sitio Web', url: '' },
      { name: 'YouTube', url: '' },
      { name: 'Instagram', url: '' },
      { name: 'Tiktok', url: '' },
    ],
    posts: [],
    clips:[]
  },
  {
    name: 'Mariana López',
    isFollowing: false,
    id: 2,
    username: 'mariana_lopez',
    bio: 'Cantante y compositora. Amante de la música acústica y el jazz. Trabajando en mi primer EP.',
    imageURL:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Madrid, España',
    tags: ['Cantante', 'Compositora', 'Jazz'],
    followers: 1200,
    following: 200,
    links: [
      { name: 'Spotify', url: '' },
      { name: 'Instagram', url: '' },
      { name: 'Bandcamp', url: '' },
    ],
    posts: [],
    clips:[]
  },
  {
    isFollowing: false,
    id: 3,
    name: 'Carlos Mendoza',
    username: 'carlosmendoza',
    bio: 'Baterista y percusionista. Amante del groove y la música experimental. Disponible para sesiones de grabación.',
    imageURL:
      'https://images.unsplash.com/photo-1590086782792-1eec42c5a3fe?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'CDMX, México',
    tags: ['Baterista', 'Percusionista', 'Experimental'],
    followers: 540,
    following: 120,
    links: [
      { name: 'Spotify', url: '' },
      { name: 'YouTube', url: '' },
      { name: 'SoundCloud', url: '' },
    ],
    posts: [],
    clips:[]
  },
  {
    isFollowing: false,
    id: 6,
    name: 'Sebastian Nievas',
    username: 'snievas',
    bio: 'Baterista y percusionista. Amante del groove y la música experimental. Disponible para sesiones de grabación.',
    imageURL: 'user2',
    location: 'CDMX, México',
    tags: ['Baterista', 'Percusionista', 'Experimental'],
    followers: 540,
    following: 120,
    links: [
      { name: 'Spotify', url: '' },
      { name: 'YouTube', url: '' },
      { name: 'SoundCloud', url: '' },
    ],
    posts: [],
    clips:[]
  },
  {
    isFollowing: false,
    id: 8,
    name: 'Lucía Fernández',
    username: 'luciaf_music',
    bio: 'Violinista clásica y exploradora del folk. Enseñando música a tiempo completo y tocando en una orquesta.',
    imageURL:
      'https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Santiago, Chile',
    tags: ['Violinista', 'Clásico', 'Folk'],
    followers: 875,
    following: 300,
    links: [
      { name: 'Instagram', url: '' },
      { name: 'Facebook', url: '' },
      { name: 'YouTube', url: '' },
    ],
    posts: [],
    clips:[]
  },
  {
    isFollowing: false,
    id: 4,
    name: 'Paula Prieto',
    username: 'paulaprieto',
    bio: 'Violinista clásica y exploradora del folk. Enseñando música a tiempo completo y tocando en una orquesta.',
    imageURL: 'user',
    location: 'Santiago, Chile',
    tags: ['Violinista', 'Clásico', 'Folk'],
    followers: 875,
    following: 300,
    links: [
      { name: 'Instagram', url: '' },
      { name: 'Facebook', url: '' },
      { name: 'YouTube', url: '' },
    ],
    posts: [],
    clips:[]
  },
];

export default USERS;