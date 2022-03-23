const httpService = require('../Services/httpService')
const commentRoute = `${process.env.BASEURL}:${process.env.COMMENTPORT}`;
const axios = require('axios');

class CommentController {

    async getAllComments(req, res) {
        try {
            await httpService.get(`${commentRoute}/getAllComments`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500)
            res.send(error.message) //make it send error.stack in dev
        }
    }
    async addComment(req, res) {
        try {
            await httpService.post(`${commentRoute}/addComment`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500)
            res.send(error.message) //make it send error.stack in dev
        }
    }

    async addCommentLike(req, res) {
        try {
            await httpService.post(`${commentRoute}/addLike`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500)
            res.send(error.message) //make it send error.stack in dev
        }
    }
    async removeCommentLike(req, res) {
        try {
            await httpService.delete(`${commentRoute}/removeLike`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500)
            res.send(error.message) //make it send error.stack in dev
        }
    }
}

module.exports = CommentController;