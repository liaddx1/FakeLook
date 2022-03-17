import apiClient from '../../helpers/apiClient'


const serverRoute = "/api/auth/";

const UserService = {
  async LogIn(creds) {
    const result = await apiClient.post(serverRoute + "login", creds);
    return result;
  },

  async Register(creds) {
    await apiClient.post(serverRoute + "register", creds);
  },


};

export default UserService;
