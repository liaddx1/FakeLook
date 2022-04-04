const httpService = require('../Services/httpService')
const commentRoute = `${process.env.BASE_URL}:${process.env.COMMENT_PORT}`;
const axios = require('axios');

class CommentController {

    async getAllComments(req, res) {
        try {
            await axios.get(`${commentRoute}/getAllComments/${req.params.postId}/${req.params.userId}`).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addComment(req, res) {
        try {
            await httpService.post(`${commentRoute}/addComment/${req.params.postId}`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500)
            res.send({ message: "Could not add your comment at this moment." })
        }
    }

    async addCommentLike(req, res) {
        try {
            await httpService.post(`${commentRoute}/addLike`, { userId: req.body.userId, ...req.params }).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500)
            res.send(error.message) 
        }
    }
    async removeCommentLike(req, res) {
        try {
            await httpService.delete(`${commentRoute}/removeLike`, { data: { userId: req.userId, ...req.params } }).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

module.exports = CommentController;