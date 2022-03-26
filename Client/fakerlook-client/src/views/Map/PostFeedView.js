import { useState } from "react";
import Post from "../../components/Post";
// import { useSelector } from "react-redux";

const PostFeed = props => {
    // const postsFromSelector = useSelector(state => state.posts.posts);
    const [posts, setPosts] = useState([]);

    const renderPosts = () => {
        posts?.map((post, index) => <li key={post.id}><Post {...post} index={index} /></li>)
    }

    return (
        <div>
            <h1 className="text-center">Post Feed</h1>
            <ul>
                {!posts.length <= 0 ? renderPosts() : <h2 className="text-center">No Posts To Show Yet</h2>}
            </ul>
        </div >
    );
}

export default PostFeed;