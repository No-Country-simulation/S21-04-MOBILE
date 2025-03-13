import { create } from 'zustand';
import { clipsFeatured, clipsFollowing, clipsRock } from '../hardcode/clips';
import { IDEAS } from "../hardcode/ideas";
import Clip from '../interfaces/clip-interface';
import Post from '../interfaces/post-interface';
import Profile from '../interfaces/profille-interface';
import Idea from '../interfaces/idea-interface';
import { PROFILE } from '../hardcode/profile';
import { POSTS } from '../hardcode/posts';

export interface GlobalStore {
    // usuario logueado
    profile: Profile
    // lista de seguidores
    following: string[]
    // agregar seguido
    addFollowing: (id: string) => void
    // dejar de seguir
    removeFollowing: (id: string) => void
    // publicaciones que le gustaron
    likedPosts: string[]
    // agregar like o lo quita si ya existe publicaciones
    toggleLikePost: (id: string) => void
    // comentarios que le gustaron
    likedComments: string[]
    // agregar like o lo quita si ya existe comentario
    toggleLikeComment: (id: string) => void
    // comentarios que le gustaron
    likedClips: string[]
    // agregar like o lo quita si ya existe comentario
    toggleLikeClip: (id: string) => void
    // ideas
    ideas: Idea[]
    // agregar idea
    addIdea: (idea: Idea) => void
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

    addCommentToClip: (clipId: string, comment: { username: string, text: string, avatar: string }) => void
}

export const useStore = create((set) => ({
    profile: PROFILE,
    following: [40, 41, 42],
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
    likedClips: [],
    toggleLikeClip: (id: string) =>
        set((state: GlobalStore) => ({
            likedClips: state.likedClips.includes(id)
                ? state.likedClips.filter((clipId) => clipId !== id)
                : [...state.likedClips, id]
        })),
    ideas: IDEAS,
    addIdea: (idea: Idea) =>
        set((state: GlobalStore) => ({
            ideas: [...state.ideas, idea]
        })),

    clipsFeatured: clipsFeatured,
    clipsFollowing: clipsFollowing,
    clipsRock: clipsRock,

    postsFeatured: POSTS,
    // postsFollowing: POSTS.reverse(),

    addCommentToClip: (clipId: string, comment: { username: string, text: string, avatar: string }) =>
        set((state: GlobalStore) => ({
            clipsFeatured: state.clipsFeatured.map(clip =>
                clip.id === clipId
                    ? {
                        ...clip,
                        comments: [
                            ...clip.comments,
                            {
                                id: clip.comments.length + 1,
                                ...comment,
                                time: "Justo ahora",
                                likes: 0
                            }
                        ]
                    }
                    : clip
            )
        })),

    setProfile: (profile: Profile) => set({ profile }),
    clearProfile: () => set({ profile: null }),

}));