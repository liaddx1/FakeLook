import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const serverAuthRoute = `${baseUrl}/auth`;
const serverUsersRoute = `${baseUrl}/users`;
const serverNoAuthRoute = `${baseUrl}/noAuthUser`;

const UserService = {
  async LogIn(creds) {
    return await axios.post(serverAuthRoute + "/login", creds);
  },

  async Register(creds) {
    return await axios.post(serverAuthRoute + "/register", creds);
  },

  async getUserById(userId) {
    return await axios.get(`${serverUsersRoute}/${userId}`, { headers: { 'authToken': `${localStorage.getItem('authToken')}` } });
  },

  async getAllUsers() {
    return (await axios.get(`${serverNoAuthRoute}/all`, { headers: { 'authToken': `${localStorage.getItem('authToken')}` } })).data;
  },

  async getUserByEmail(userEmail) {
    return (await axios.get(`${serverNoAuthRoute}/${userEmail}`)).data;
  },

  async changePassword(creds) {
    return await axios.post(`${serverNoAuthRoute}/changePassword`, creds);
  }

};

export default UserService;
