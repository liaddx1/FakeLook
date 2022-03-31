const request = require("supertest");
const UserController = require("../controllers/userController.js");
const { mockRequest, mockResponse } = require("../utils/interceptor");

const getAllUsers = jest.fn();
const userLogIn = jest.fn();
const getUserById = jest.fn();
const getUserByEmail = jest.fn();
const SearchUsers = jest.fn();
const changePassword = jest.fn();
const ChangeUserPicture = jest.fn();
const addUser = jest.fn();

getAllUsers.mockReturnValue({
  recordset: [
    {
      id: 1,
      name: "user",
      email: "user@example.com",
    },
    {
      id: 2,
      name: "user",
      email: "user@example.com",
    },
  ],
});

getUserById.mockReturnValue({
  id: 1,
  name: "user",
  email: "user@example.com",
});

getUserByEmail.mockReturnValue({
  id: 1,
  name: "user",
  email: "user@example.com",
});

SearchUsers.mockReturnValue({
  id: 1,
  name: "user",
  email: "user@example.com",
});

userController = new UserController({
  userService: {
    getAllUsers,
    // userLogIn,
    getUserById,
    getUserByEmail,
    SearchUsers,
    // changePassword,
    // ChangeUserPicture,
    // addUser
  },
});

describe("getuserbyid", () => {
  test("should fetch a user by id", async () => {
    //make sure response is let
    //
    let req = mockRequest();
    req.params.id = 1;
    let response = mockResponse();
    await userController.getUserById(req, response).then((res) => {
      response = JSON.parse(res);
    });
    expect(response).toMatchObject({
      id: 1,
      name: "user",
      email: "user@example.com",
    });
  });
});

describe("get all users", () => {
  test("should fetch an array of user", async () => {
    const expected = [
      {
        id: 1,
        name: "user",
        email: "user@example.com",
      },
      {
        id: 2,
        name: "user",
        email: "user@example.com",
      },
    ];
    let req = mockRequest();
    let response = mockResponse();
    await userController.getAllUsers(req, response).then((res) => {
      console.log("array", res);
      response = JSON.parse(res);
    });
    expect(response).toEqual(expect.arrayContaining(expected));
  });
});

describe("getuserbyemail", () => {
  test("should fetch a user by email", async () => {
    //make sure response is let
    //
    let req = mockRequest();
    req.params.email = "user@example.com";
    let response = mockResponse();
    await userController.getUserByEmail(req, response).then((res) => {
      response = JSON.parse(res);
    });
    expect(response).toMatchObject({
      id: 1,
      name: "user",
      email: "user@example.com",
    });
  });
});

describe("search users", () => {
  test("should fetch a user from search ", async () => {
      //fails
    let req = mockRequest();
    req.params.searchparams = "user";
    let response = mockResponse();
    await userController.searchUsers(req, response).then((res) => {
      response = JSON.parse(res);
    });
    expect(response).toMatchObject({
      id: 1,
      name: "user",
      email: "user@example.com",
    });
  });
});
