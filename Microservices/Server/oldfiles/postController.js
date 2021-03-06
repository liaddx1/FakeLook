class PostController{
    constructor(postRepository){
        this.postRepository = postRepository;
    }
    async getAllPosts(req,res){
        try{
          const result = await this.postRepository.getAllPosts(req);
          res.json(result.recordset);
        }
        catch(error){
            res.status(500)
            res.send(error.message)
        }
    }
    async addPost(req,res){
        try {
            const result = await this.postRepository.addPost(req);
            res.send(result.rowsAffected);        } 
        catch (error) {
            res.status(500)
            res.send(error.message)
      }
    }
    async getPost(req,res){
        try {
            const result = await this.postRepository.getPost(req);
            res.json(result.recordset);
        }
        catch{
            res.status(500)
            res.send(error.message)
        }
    }
    async searchPosts(req,res){
        try{
            const result = await this.postRepository.SearchPosts(req);
            res.json(result.recordset);
        }
        catch(error){
            res.status(500);
            res.send(error.message);
        }
    }
}

module.exports = PostController;