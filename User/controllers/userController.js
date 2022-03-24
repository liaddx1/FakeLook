class UserController {
    constructor({ userService }) {
        this.userService = userService;
    }

    async getAllUsers(req, res) {
        try {
            const result = await this.userService.getAllUsers();
            return JSON.stringify(result.recordset);
        }
        catch (error) {
            console.log(`There Was a Problem Getting The Users. error: ${error.message}`);
            return (`Failed to Get Users, error: ${error.message}`);
        }
    }
    async changeUserPicture(req, res) {
        try {
            const result = await this.userService.ChangeUserPicture(req);
            return JSON.stringify(result.rowsAffected);
        }
        catch (error) {
            console.log(`There Was a Problem Changing Picture. error: ${error.message}`);
            return (`Failed to change picture, error: ${error.message}`);
        }
    }
    async searchUsers(req, res) {
        try {
            const result = await this.userService.SearchUsers(req);
            return JSON.stringify(result.recordset);
        }
        catch (error) {
            console.log(`There Was a Problem Searching Users. error: ${error.message}`);
            return (`Failed to Search , error: ${error.message}`);
        }
    }

    async getUserById(req, res) {
        try {
            const result = await this.userService.getUserById(req);
            return JSON.stringify(result.recordset);
        }
        catch (error) {
            console.log(`There Was a Problem Getting User. error: ${error.message}`);
            return (`Failed to get user, error: ${error.message}`);
        }
    }
    async changePassword(req, res) {
        try {
            let hashedPassword = bcrypt.hashSync(req.body.password);
            req.body.password = hashedPassword;
            const result = await this.userService.changePassword(req);
            return JSON.stringify(result.rowsAffected);
        }
        catch (error) {
            console.log(`There Was a Problem Changing Password. error: ${error.message}`);
            return (`Failed to Change Password, error: ${error.message}`);
        }
    }

    async changePassword(req, res) {
        try {
            const result = await this.userService.changePassword(req);
            return JSON.stringify(result.rowsAffected);
        }
        catch (error) {
            console.log(`There Was a Problem Changing Password. error: ${error.message}`);
            return (`Failed to Change Password, error: ${error.message}`);
        }
    }

    async getUserByEmail(req, res) {
        try {
            return JSON.stringify(await this.userService.getUserByEmail(req));
        }
        catch (error) {
            console.log(`There Was a Problem Getting The User. error: ${error.message}`);
            return (`Failed to Get The User, error: ${error.message}`);
        }
    }
}

module.exports = UserController;