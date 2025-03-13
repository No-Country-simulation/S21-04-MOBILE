export default interface Post {
    id: number;
    userId?: number;
    name: string;
    time: string;
    imageURL: string;
    content: string;
    hashtags: string[];
    mediaUrl?: string
}