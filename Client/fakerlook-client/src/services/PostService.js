import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const serverPostRoute = `${baseUrl}/posts`;
const serverNoAuthPostRoute = `${baseUrl}/noAuthPosts`;

const PostService = {
    async getAllPosts() {
        return (await axios.get(`${serverNoAuthPostRoute}/all`)).data;
    },

    async getPost(postId) {
        console.log(postId);
        return (await axios.get(`${serverPostRoute}/${postId}`)).data;
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
