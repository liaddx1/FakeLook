const request = require("supertest");
const PostLikesController = require("../controllers/postLikesController.js");
const { mockRequest, mockResponse } = require("../utils/interceptor");

const addPostLike = jest.fn();
const removePostLike = jest.fn();

addPostLike.mockReturnValue({
  id: 1,
  likeNum: 2,
});

removePostLike.mockReturnValue({
  id: 1
});

postLikesController = new PostLikesController({
  postLikesService: {
    addPostLike,
    removePostLike,
  },
});

describe("add like to post", () => {
  test("should add like to post ", async () => {
    //make sure response is let
    //
    let req = mockRequest();
    req.body.id = 1;
    req.body.likeNum = 2;
    let response = mockResponse();
    await postLikesController.addPostLike(req, response).then((res) => {
      response = JSON.parse(res);
    });
    expect(response).toMatchObject({
        id: 1,
        likeNum: 2,
      });
  });
});
describe("add like to post", () => {
  test("should add like to post ", async () => {
    //make sure response is let
    //
    let req = mockRequest();
    req.body.id = 1;
    let response = mockResponse();
    await postLikesController.addPostLike(req, response).then((res) => {
      response = JSON.parse(res);
    });
    expect(response).toMatchObject({
        id: 1
      });
  });
});
