class PostDTO {
    constructor(id, type, userId, createdAt) {
        this.id = id;
        this.type = type; // "short" or "post"
        this.userId = userId;
        this.createdAt = createdAt;
    }
}  