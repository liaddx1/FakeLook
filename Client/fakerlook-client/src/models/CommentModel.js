class Comment {
    constructor(commentContent, timeCommented, firstName, lastName, picture, userId,
        postId, commentId, commentLikeAmount, liked) {
        this.commentContent = commentContent;
        this.timeCommented = timeCommented;
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
        this.userId = userId;
        this.postId = postId;
        this.commentId = commentId;
        this.commentLikeAmount = commentLikeAmount;
        this.liked = liked;
    }
}

export default Comment;