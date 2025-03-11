import { create } from 'zustand';
import { clipsFeatured } from '../hardcode/clips';
import Clip from '../interfaces/clip-interface';
import Post from '../interfaces/post-interface';
import Profile from '../interfaces/profille-interface';

export interface GlobalStore {
    // usuario logueado
    profile: Profile | null
    // publicaciones destacadas
    postsFeatured: Post[]
    // clips destacados
    clipsFeatured: Clip[]
    // publicaciones de seguidos
    postsFollowing: Post[]
    // clips de seguidos
    clipsFollowing: Clip[]
    // usuarios destacados
    usersFeatured: Profile[]
    // usuarios sugeridos
    usersSuggested: Profile[]
    // clips genero rock
    genreRock: Clip[]
    // clips genero rock
    genreJazz: Clip[]
    // clips genero rock
    genreCover: Clip[]
}

export const useGlobalStore = create((set) => ({
    profile: null,
    clipsFeatured: clipsFeatured,

    setProfile: (profile: Profile) => set({ profile }),
    clearProfile: () => set({ profile: null }),

}));