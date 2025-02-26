class ProfileDTO {
    constructor(id, userId, name, lastName, bio, photoUrl, gender, createdAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.lastName = lastName;
        this.bio = bio;
        this.photoUrl = photoUrl;
        this.gender = gender;
        this.createdAt = createdAt;
    }
}

module.exports = ProfileDTO;  