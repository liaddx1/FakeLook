import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const serverPostRoute = `${baseUrl}/posts`;

const PostLikeService = {
    async addLike(postId, userId) {
        return (await axios.put(`${serverPostRoute}/${postId}/likes`, { userId: userId },
            { headers: { 'authToken': `${localStorage.getItem('authToken')}` } })).data;
    },

    async removeLike(postId, userId) {
        return (await axios.delete(`${serverPostRoute}/${postId}/likes`,
            { headers: { 'authToken': `${localStorage.getItem('authToken')}` } },
            { data: { userId: userId } })).data;
    },

};

export default PostLikeService;
