const CommentController = require("../controllers/commentController.js");
const { mockRequest, mockResponse } = require("../utils/interceptor");

const getAllComments = jest.fn();
const addComment = jest.fn();
const addCommentLike = jest.fn();
const removeCommentLike = jest.fn();

getAllComments.mockReturnValue({
  recordset: [
    {
      id: 1,
      content: "comment",
    },
    {
      id: 2,
      content: "comment2",
    },
  ]
});

addComment.mockReturnValue({
  id: 1,
  content: "comment",
});

addCommentLike.mockReturnValue({
  recordset: {
    id: 1,
    content: "user",
  },
});

removeCommentLike.mockReturnValue({
  recordset: {
    id: 1,
    content: "user",
  },
});

commentController = new CommentController({
  commentService: {
    getAllComments,
    addComment,
    addCommentLike,
    removeCommentLike,
  },
});

describe("get all comments", () => {
  test("should get all posts", async () => {
    const expected = [
      {
        id: 1,
        content: "comment",
      },
      {
        id: 2,
        content: "comment2",
      },
    ];

    //make sure response is let
    //
    let req = mockRequest();
    let response = mockResponse();
    await commentController.getAllComments(req, response).then((res) => {
      response = JSON.parse(res);
    });
    expect(response).toEqual(expect.arrayContaining(expected));
  });
});


describe("add comment", () => {
  test("should add a comment and return id", async () => {
    //make sure response is let
    //
    let req = mockRequest();
    req.body.content = 'user';
    let response = mockResponse();
    await commentController.addComment(req, response).then((res) => {
      response = JSON.parse(res);
      console.log(res)
    });
    expect(response).toMatchObject(
      {
        id: 1,
        content: "comment",
      },
    );
  });
});