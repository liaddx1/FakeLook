const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = process.env.KEY;
const container = require("../app-container");
const postService = container.resolve('postService');


class PostController {

    async getAllPosts(req,res){
        try{
          const result = await postService.getAllPosts(req);
          res.json(result.recordset);
        }
        catch(error){
            res.status(500)
            res.send(error.message)
        }
    }
    async addPost(req,res){
        try {
            const result = await postService.addPost(req);
            res.send(result.rowsAffected);        } 
        catch (error) {
            res.status(500)
            res.send(error.message)
      }
    }
    async getPost(req,res){
        try {
            const result = await postService.getPost(req);
            res.json(result.recordset);
        }
        catch{
            res.status(500)
            res.send(error.message)
        }
    }
    async searchPosts(req,res){
        try{
            const result = await postService.SearchPosts(req);
            res.json(result.recordset);
        }
        catch(error){
            res.status(500);
            res.send(error.message);
        }
    }
}

module.exports = PostController;