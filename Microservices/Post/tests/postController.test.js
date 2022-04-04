const request = require("supertest");
const PostController = require("../controllers/postController.js");
const { mockRequest, mockResponse } = require("../utils/interceptor");

const getAllPosts = jest.fn();
const addPost = jest.fn();
const getPost = jest.fn();
const searchPosts = jest.fn();

getAllPosts.mockReturnValue({
  recordset: [
    {
      id: 1,
      content: "user",
    },
    {
      id: 2,
      content: "user2",
    },
  ],
});

addPost.mockReturnValue({
  id: 1,
  content: "user",
});

getPost.mockReturnValue({
  recordset: {
    id: 1,
    content: "user",
  },
});

searchPosts.mockReturnValue({
  recordset: {
    id: 1,
    content: "user",
  },
});

postController = new PostController({
  postService: {
    getAllPosts,
    addPost,
    getPost,
    searchPosts,
  },
});

describe("getallposts", () => {
  test("should get all posts", async () => {
    const expected = [
      {
        id: 1,
        content: "user",
      },
      {
        id: 2,
        content: "user2",
      },
    ];

    //make sure response is let
    //
    let req = mockRequest();
    let response = mockResponse();
    await postController.getAllPosts(req, response).then((res) => {
      response = JSON.parse(res);
    });
    expect(response).toEqual(expect.arrayContaining(expected));
  });
});


describe("getpost", () => {
  test("should fetch a post by id", async () => {
    //make sure response is let
    //
    let req = mockRequest();
    req.params.id = 1;
    let response = mockResponse();
    await postController.getPost(req, response).then((res) => {
      response = JSON.parse(res);
      console.log(res)
    });
    expect(response).toMatchObject(
      {
        id: 1,
        content: "user",
      },
    );
  });
});

describe("addPost", () => {
  test("should add a post and return id", async () => {
    //make sure response is let
    //
    let req = mockRequest();
    req.body.content = 'user';
    let response = mockResponse();
    await postController.addPost(req, response).then((res) => {
      response = JSON.parse(res);
      console.log(res)
    });
    expect(response).toMatchObject(
      {
        id: 1,
        content: "user",
      },
    );
  });
});