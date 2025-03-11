import { create } from 'zustand';
import { clipsFeatured } from '../hardcode/clips';
import Clip from '../interfaces/clip-interface';
import Post from '../interfaces/post-interface';
import Profile from '../interfaces/profille-interface';

export interface GlobalStore {
    // usuario logueado
    profile: Profile | null
    // lista de seguidores
    following: string[]
    // agregar seguido
    addFollowing: (id: string) => void
    // dejar de seguir
    removeFollowing: (id: string) => void
    // publicaciones que le gustaron
    likedPosts: string[]
    // agregar like o lo quita si ya existe
    toggleLikePost: (id: string) => void
    // comentarios que le gustaron
    likedComments: string[]
    // 
    toggleLikeComment: (id: string) => void

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

export const useStore = create((set) => ({
    profile: null,
    following: [],
    // agregar usuario siguiendo
    addFollowing: (id: string) =>
        set((state: GlobalStore) => ({
            following: state.following.includes(id)
                ? state.following
                : [...state.following, id]
        })),
    // dejar de seguir
    removeFollowing: (id: string) =>
        set((state: GlobalStore) => ({
            following: state.following.filter(userId => userId !== id)
        })),
    likedPosts: [],
    toggleLikePost: (id: string) =>
        set((state: GlobalStore) => ({
            likedPosts: state.likedPosts.includes(id)
                ? state.likedPosts.filter((postId) => postId !== id)
                : [...state.likedPosts, id]
        })),
    likedComments: [],
    toggleLikeComment: (id: string) =>
        set((state: GlobalStore) => ({
            likedComments: state.likedComments.includes(id)
                ? state.likedComments.filter((commentId) => commentId !== id)
                : [...state.likedComments, id]
        })),


    clipsFeatured: clipsFeatured,

    setProfile: (profile: Profile) => set({ profile }),
    clearProfile: () => set({ profile: null }),

}));