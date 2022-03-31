const httpService = require('../Services/httpService')
const postRoute = `${process.env.BASE_URL}:${process.env.POST_LIKES_PORT}`;

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
            await httpService.post(`${postRoute}/addPostLike`, { userId: req.body.userId, ...req.params }).then((response) => {
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
            console.log({ userId: req.userId, ...req.params });
            await httpService.delete(`${postRoute}/deletePostLike`, { data: { userId: req.userId, ...req.params } }).then((response) => {
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
