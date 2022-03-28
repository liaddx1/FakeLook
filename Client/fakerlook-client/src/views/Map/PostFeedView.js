import Post from "../../components/Post";
import { useSelector } from "react-redux";

const PostFeed = props => {
    const posts = useSelector(state => state.posts.posts);

    const renderPosts = () => {
        // console.log(posts);
        return posts?.map((post, index) => <Post {...post} index={index} />)
    }

    return (
        <div>
            <h1 className="text-center">Posts Feed</h1>
            {!posts.length <= 0 ? renderPosts() : <h2 className="text-center">Loading Posts...</h2>}
        </div >
    );
}

export default PostFeed;