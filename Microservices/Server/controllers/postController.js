const httpService = require('../Services/httpService')
const postRoute = `${process.env.BASE_URL}:${process.env.POST_PORT}`;
const axios = require('axios');
class PostController {
    async getAllPosts(req, res) {
        try {
            await axios.get(`${postRoute}/getAllPosts/${req.params.userId}`).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)
        }
    }
    async addPost(req, res) {
        try {
            await httpService.post(`${postRoute}/addPost`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send({ message: error.message })
        }
    }
    async getPost(req, res) {
        try {
            await httpService.get(`${postRoute}/getPost/${req.params.postId}`).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)
        }
    }
    async searchPosts(req, res) {
        try {
            await httpService.post(`${postRoute}/searchPost`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)
        }
    }
}

module.exports = PostController;