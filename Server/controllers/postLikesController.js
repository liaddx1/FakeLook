const httpService = require('../Services/httpService')
const postRoute = `${process.env.BASEURL}:${process.env.POSTPORT}`;
const axios = require('axios');

class PostLikesController {
    async getPostLikes(req, res) {
        try {
            await httpService.get(`${postRoute}/getPostLikes`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)        
        }
    }
    async addPostLike(req, res) {
        try {
            await httpService.post(`${postRoute}/addPostLike`, req.body).then((response) => {
                res.status(200).send(response.data);
            })
                .catch((error) => { console.log(error) })
        }
        catch (error) {
            res.status(500);
            res.send(error.message)        
        }
    } async removePostLike(req, res) {
        try {
            await httpService.delete(`${postRoute}/deletePostLike`, req.body).then((response) => {
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

module.exports = PostLikesController;
