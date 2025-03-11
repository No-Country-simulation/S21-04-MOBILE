import { create } from 'zustand';
import Post from '../interfaces/post-interface';
import Profile from '../interfaces/profille-interface';

export interface GlobalStore {
    // usuario logueado
    profile: Profile | null
    // publicaciones destacadas
    postsFeatured: Post[]
    // clips destacados
    clipsFeatured: { videoURL: string }[]
    // publicaciones de seguidos
    postsFollowing: Post[]    
    // clips de seguidos
    clipsFollowing: []
    // usuarios destacados
    usersFeatured: Profile[]
    // usuarios sugeridos
    usersSuggested: Profile[]
    // clips genero rock
    genreRock: []
    // clips genero rock
    genreJazz: []
    // clips genero rock
    genreCover: []
}

export const useGlobalStore = create((set) => ({
    profile: null,
    postsFeatured: [
        {
            videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_1.mp4"
        },
        {
            videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_2.mp4"
        },
        {
            videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_3.mp4"
        },
        {
            videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_4.mp4"
        },
        {
            videoURL: "https://storage.googleapis.com/nc-s21-04/clip_destacado_5.mp4"
        }
    ], 
    clips: [],

    setProfile: (profile: Profile) => set({ profile }),
    clearProfile: () => set({ profile: null }),

}));