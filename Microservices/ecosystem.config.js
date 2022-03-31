module.exports = {
  apps: [
    {
      name: 'Server',
      script: './Server/index.js',
      watch: true,
      env: {
        KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkFkbWluIiwiZXhwIjoxNzEwNjA3OTk0LCJpYXQiOjE2NDc0NDk1OTR9.4eUrDVvl9IfgAqXVOO_LCz399exb5A7Dw6Sd2KcZIAA',
        SERVER_PORT: 8080,
        AUTH_PORT: 8081,
        COMMENT_PORT: 8082,
        POST_PORT: 8083,
        POST_LIKES_PORT: 8084,
        USER_PORT: 8085,
        BASE_URL: 'http://localhost',
        SqlConnectionString: 'server=DESKTOP-7DMF7GM;Database=FakeLook;Trusted_Connection=Yes;',      },
    },
    {
      name: 'Auth',
      script: './Auth/index.js',
      watch: true,
      env: {
        KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkFkbWluIiwiZXhwIjoxNzEwNjA3OTk0LCJpYXQiOjE2NDc0NDk1OTR9.4eUrDVvl9IfgAqXVOO_LCz399exb5A7Dw6Sd2KcZIAA',
        AUTH_PORT: 8081,
        SqlConnectionString: 'server=DESKTOP-7DMF7GM;Database=FakeLook;Trusted_Connection=Yes;',      },
    },
    {
      name: 'Comment',
      script: './Comment/index.js',
      watch: true,
      env: {
        KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkFkbWluIiwiZXhwIjoxNzEwNjA3OTk0LCJpYXQiOjE2NDc0NDk1OTR9.4eUrDVvl9IfgAqXVOO_LCz399exb5A7Dw6Sd2KcZIAA',
        COMMENT_PORT: 8082,
        SqlConnectionString: 'server=DESKTOP-7DMF7GM;Database=FakeLook;Trusted_Connection=Yes;',      },
    },
    {
      name: 'Post',
      script: './Post/index.js',
      watch: true,
      env: {
        KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkFkbWluIiwiZXhwIjoxNzEwNjA3OTk0LCJpYXQiOjE2NDc0NDk1OTR9.4eUrDVvl9IfgAqXVOO_LCz399exb5A7Dw6Sd2KcZIAA',
        POST_PORT: 8083,
        SqlConnectionString: 'server=DESKTOP-7DMF7GM;Database=FakeLook;Trusted_Connection=Yes;',      },
    },
    {
      name: 'PostLikes',
      script: './PostLikes/index.js',
      watch: true,
      env: {
        KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkFkbWluIiwiZXhwIjoxNzEwNjA3OTk0LCJpYXQiOjE2NDc0NDk1OTR9.4eUrDVvl9IfgAqXVOO_LCz399exb5A7Dw6Sd2KcZIAA',
        POST_LIKES_PORT: 8084,
        SqlConnectionString: 'server=DESKTOP-7DMF7GM;Database=FakeLook;Trusted_Connection=Yes;',      },
    },
    {
      name: 'User',
      script: './User/index.js',
      watch: true,
      env: {
        KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkFkbWluIiwiZXhwIjoxNzEwNjA3OTk0LCJpYXQiOjE2NDc0NDk1OTR9.4eUrDVvl9IfgAqXVOO_LCz399exb5A7Dw6Sd2KcZIAA',
        USER_PORT: 8085,
        SqlConnectionString: 'server=DESKTOP-7DMF7GM;Database=FakeLook;Trusted_Connection=Yes;',
      },
    },
  ],
};