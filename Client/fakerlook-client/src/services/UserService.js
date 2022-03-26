import axios from "axios";


const serverRoute = "http://localhost:8080/api/auth/";

const UserService = {
  async LogIn(creds) {
    return await axios.post(serverRoute + "login", creds);
  },

  async Register(creds) {
    return await axios.post(serverRoute + "register", creds);
  },

  async getUserById(userId) {
    return await axios.get(`http://localhost:8080/api/users/${userId}`, {
      headers: {
        'authToken': `${localStorage.getItem('authToken')}`
      }
    });
  },

  async getUserByEmail(userEmail) {
    return (await axios.get(`http://localhost:8080/api/noAuthUser/${userEmail}`)).data;
  },

  async changePassword(creds) {
    return await axios.post(`http://localhost:8080/api/noAuthUser/changePassword`, creds);
  }

};

export default UserService;
