class PostOutput {
    constructor(userId, description, picture, latGPS, longGPS) {
        this.userId = userId;
        this.description = description;
        this.picture = picture;
        this.latGPS = latGPS;
        this.longGPS = longGPS;
    }

    validate() {
        if (this.description.length === 0)
            return [false, 'Description Cannot Be Empty!'];

        return [true, ''];
    }
}
export default PostOutput;