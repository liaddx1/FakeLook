import apiClient from '../../helpers/apiClient'

const serverRoute = "http://localhost:8080/api/auth/";

const UserService = {
  async LogIn(creds) {
    return await apiClient.post(serverRoute + "login", creds);
  },

  async Register(creds) {
    return await apiClient.post(serverRoute + "register", creds);
  },

  async getUserById(userId) {
    return await apiClient.get(`http://localhost:8080/api/users/${userId}`)
  },

  async getUserByEmail(email) {
    return await apiClient.get(`http://localhost:8080/api/unauthuser/getUserByEmail`, email)
  },

  async changePassword(creds) {
    return await apiClient.post(`http://localhost:8080/api/users/changePassword`, creds)
  }

};

export default UserService;
