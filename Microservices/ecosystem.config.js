module.exports = {
  apps: [
    {
      name: 'Server',
      script: './Server/index.js',
      env: {
        KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkFkbWluIiwiZXhwIjoxNzEwNjA3OTk0LCJpYXQiOjE2NDc0NDk1OTR9.4eUrDVvl9IfgAqXVOO_LCz399exb5A7Dw6Sd2KcZIAA',
        SERVER_PORT: '8080',
        AUTH_PORT: '8081',
        COMMENT_PORT: '8082',
        POST_PORT: '8083',
        POST_LIKES_PORT: '8084',
        USER_PORT: '8085',
        BASE_URL: 'http://localhost',
        SqlConnectionString: "server=(localdb)\\MSSQLLocalDB;Database=FakeLook;Trusted_Connection=Yes;",
      },
    },
    {
      name: 'Auth',
      script: './Auth/index.js',
      env: { AUTH_PORT: '8081' },
    },
    {
      name: 'Comment',
      script: './Comment/index.js',
      env: { COMMENT_PORT: '8082' },
    },
    {
      name: 'Post',
      script: './Post/index.js',
      env: { POST_PORT: '8083' },
    },
    {
      name: 'PostLikes',
      script: './PostLikes/index.js',
      env: { POST_LIKES_PORT: '8084' },
    },
    {
      name: 'User',
      script: './User/index.js',
      env: { USER_PORT: '8085' },
    },
  ],
};