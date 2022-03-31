import { useSelector } from "react-redux";

const Post = props => {
    const user = useSelector(state => state.users.users).find(u => u.id === props.userId);
    return (
        <div>
            <img src={props.picture} alt={`Picture Posted By ${user.name}`} />
            <p>Posted By: {user.name}</p>
            <p>Description: {props.description}</p>
        </div>
    );
}

export default Post;