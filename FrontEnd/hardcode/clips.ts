import Clip from "../interfaces/clip-interface";

export const CLIPS: Clip[] = [
    {
        id: "1",
        videoURL: 'https://storage.googleapis.com/roomies-2096e.appspot.com/6273835-uhd_2160_3840_30fps.mp4',
        imageURL: 'https://images.unsplash.com/photo-1593697972672-b1c1902219e4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'user_test',
        name: "User Test",
        content: "Lorem ipsut",
        tags: ["#Clip", "#Guitarra"]
    },
    {
        id: "1",
        videoURL: 'https://storage.googleapis.com/roomies-2096e.appspot.com/8103281-uhd_2160_4096_25fps.mp4',
        imageURL: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'mariana_lopez',
        name: "User Test",
        content: "Lorem ipsut",
        tags: ["#Clip", "#Guitarra"]
    },
    {
        id: "1",
        videoURL: 'https://storage.googleapis.com/roomies-2096e.appspot.com/8688875-hd_1080_1920_25fps.mp4',
        imageURL: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'carlosmendoza',
        name: "User Test",
        content: "Lorem ipsut",
        tags: ["#Clip", "#Guitarra"]
    },
    {
        id: "1",
        videoURL: 'https://storage.googleapis.com/roomies-2096e.appspot.com/9564078-uhd_2160_4096_25fps.mp4',
        imageURL: 'https://images.unsplash.com/photo-1590086782792-1eec42c5a3fe?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'carlosmendoza',
        name: "User Test",
        content: "Lorem ipsut",
        tags: ["#Clip", "#Guitarra"]
    },
    {
        id: "1",
        videoURL: 'https://storage.googleapis.com/roomies-2096e.appspot.com/6273835-uhd_2160_3840_30fps.mp4',
        imageURL: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: "mariana_lopez",
        name: "User Test",
        content: "Lorem ipsut",
        tags: ["#Clip", "#Guitarra"]
    },
];

export const clipsFeatured = [
    {
        id: "1",
        videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_1.mp4",
        imageURL: 'https://storage.googleapis.com/nc-s21-04/usuario_destacado_1.jpg',
        username: "anagarcia",
        name: "Ana García",
        content: "Me encanta la música y el arte.",
        tags: ["#Cover", "#Clip"],
        comments: [
            {
                id: 1,
                username: "Mariana Lou",
                text: "Me encanta! Gracias por compartir.",
                time: "5h",
                likes: 11,
                avatar: "https://randomuser.me/api/portraits/women/1.jpg"
            },
            {
                id: 2,
                username: "Ignacio Siena",
                text: "Qué energía en este videoclip! 🔥",
                time: "5h",
                likes: 8,
                avatar: "https://randomuser.me/api/portraits/men/2.jpg"
            },
            {
                id: 3,
                username: "Ramón Son",
                text: "La estética me encanta!",
                time: "5h",
                likes: 5,
                avatar: "https://randomuser.me/api/portraits/men/3.jpg"
            }
        ]
    },
    {
        id: "2",
        videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_2.mp4",
        imageURL: 'https://storage.googleapis.com/nc-s21-04/usuario_destacado_2.jpg',
        username: "pedroramirez",
        name: "Pedro Ramírez",
        content: "Descubriendo nuevos sonidos.",
        tags: ["#Improvisacion", "#Clip"]
    },
    {
        id: "3",
        videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_3.mp4",
        imageURL: 'https://storage.googleapis.com/nc-s21-04/usuario_destacado_3.jpg',
        username: "martinezlucia",
        name: "Lucía Martínez",
        content: "",
        tags: ["#Clip"]
    },
    {
        id: "4",
        videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_4.mp4",
        imageURL: 'https://storage.googleapis.com/nc-s21-04/usuario_destacado_4.jpg',
        username: "juan_p",
        name: "Juan Pérez",
        content: "Comparto mi experiencia en mi último show",
        tags: ["#Single", "#Show", "#Clip"]
    },
    {
        id: "5",
        videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_5.mp4",
        imageURL: 'https://storage.googleapis.com/nc-s21-04/usuario_destacado_5.jpg',
        username: "marialopez",
        name: "María López",
        content: "Música y viajes.",
        tags: []
    }
];
