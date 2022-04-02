import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const serverCommentRoute = `${baseUrl}/posts`; //postId, /comments
const serverCommentLikeRoute = `${baseUrl}/posts/comments`; //commentId, /likes

const CommentService = {
  async getComments(postId, userId) {
    return await axios.get(`${serverCommentRoute}/${postId}/commets`,
      { headers: { 'authToken': `${localStorage.getItem('authToken')}` } });
  },

  async createComment(postId, userId, comment) {
    return (await axios.post(`${serverCommentRoute}/${postId}/comments`,
      { userId: userId, comment: comment },
      { headers: { 'authToken': `${localStorage.getItem('authToken')}` } })).data;
  },

  async addLike(commentId, userId) {
    return (await axios.put(`${serverCommentLikeRoute}/${commentId}/likes`, { userId: userId },
      { headers: { 'authToken': `${localStorage.getItem('authToken')}` } })).data;
  },

  async removeLike(commentId, userId) {
    return (await axios.delete(`${serverCommentLikeRoute}/${commentId}/likes`,
      { headers: { 'authToken': `${localStorage.getItem('authToken')}` } },
      { data: { userId: userId } })).data;
  },

};

export default CommentService;
