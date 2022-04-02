class CommentOutput {
    constructor(commentContent, firstName, lastName, userId, postId) {
        this.commentContent = commentContent;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
        this.postId = postId;
    }

    validate = () => {
        if (this.commentContent.length === 0)
            return [false, 'Comment Cannot Be Empty!'];

        if (this.firstName.length === 0)
            return [false, 'First Name Cannot Be Empty!'];

        if (this.lastName.length === 0)
            return [false, 'Last Name Cannot Be Empty!'];

        if (this.userId.length === 0)
            return [false, 'UserId Cannot Be Empty!'];

        if (this.postId.length === 0)
            return [false, 'PostId Cannot Be Empty!'];

        return [true, ''];
    }
}

export default CommentOutput;