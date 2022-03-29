import { PostLikes } from "./PostLikesModel";
class Post {
    constructor(postId, description, lat, long, timePosted, firstName, lastName, userPic, userId, postLikeAmount, liked) {
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
        this.liked = liked;
    }
}
export default Post;