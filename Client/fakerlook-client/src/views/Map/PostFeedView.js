import { useState } from "react";
import Post from "../../components/Post";
import { useSelector } from "react-redux";

const PostFeed = props => {
    const posts = useSelector(state => state.posts.filteredPosts);

    const renderPosts = () => {
        console.log(posts);
        return posts?.map((post) => <Post key={post.postId} {...post} />)
    }

    return (
        <div>
            <h1 className="text-center">Posts Feed</h1>
            {!posts.length <= 0 ? renderPosts() : <h2 className="text-center">No Posts To Answer Your Criteria.</h2>}
        </div >
    );
}

export default PostFeed;