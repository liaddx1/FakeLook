import PostLikes from './PostLikesModel';
class PostModel {
    constructor(postId, description, lat, long, timePosted, firstName, lastName, userPic, userId, postLikeAmount, postCommentAmount, liked) {
        this.postId = postId;
        this.description = description;
        this.lat = lat;
        this.long = long;
        this.timePosted = timePosted;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userPic = userPic;
        this.postLikes = PostLikes;
        this.userId = userId;
        this.postLikeAmount = postLikeAmount;
        this.postCommentAmount = postCommentAmount; 
        this.liked = liked;
    }
}
export default PostModel;