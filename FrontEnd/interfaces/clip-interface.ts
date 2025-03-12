export default interface Clip {
    id: string,
    videoURL: string,
    imageURL: string,
    username: string,
    name: string,
    content?: string,
    tags?: string[],
    comments: any[]
}