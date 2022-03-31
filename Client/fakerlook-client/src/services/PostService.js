import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const serverPostRoute = `${baseUrl}/posts`;

const PostService = {
    async getAllPosts() {
        let myPosts = [];
        const tempResult = (await axios.get(`${serverPostRoute}/${localStorage.getItem('userId')}`,
        { headers: { 'authToken': `${localStorage.getItem('authToken')}` } })).data;
        tempResult.map((post) => {
            return (
                post.postLikes = { postId: post.postId, postLikeAmount: post.postLikeAmount, liked: post.liked},
                delete(post.postLikeAmount),
                delete(post.liked),
                myPosts.push(post)
                )
            });
        return myPosts;
    },

    async getPost(postId) {
        return (await axios.get(`${serverPostRoute}/${postId}`,
            { headers: { 'authToken': `${localStorage.getItem('authToken')}` } })).data;
    },

    async addPost(object) {
        return (await axios.post(`${serverPostRoute}`, object, 
        { headers: { 'authToken': `${localStorage.getItem('authToken')}` } })).data;
    },

    async searchPosts(creds) {
        return (await axios.get(`${serverPostRoute}/${creds}`)).data;
    },

};

export default PostService;
