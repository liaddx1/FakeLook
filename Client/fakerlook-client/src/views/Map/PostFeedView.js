import { useSelector } from "react-redux";
import Post from "../../components/Post";

const PostFeed = props => {
    const posts = useSelector(state => state.posts.posts);

    const renderPosts = () => {
        posts?.map((post, index) => <li key={post.id}><Post {...post} index={index} /></li>)
    }

    return (
        <div>
            <h1 className="text-center">Post Feed</h1>
            <ul>
                {renderPosts()}
            </ul>
        </div >
    );
}

export default PostFeed;