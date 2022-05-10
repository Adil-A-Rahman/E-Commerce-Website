# Cutting Edge Web Driven Commerce Platform

A modern, fully RESTful E-commerce Website made using MongoDB, Express, Node.js and React. It has highly advanced authentication capabilities that allows users to securely login and access the pages thanks to bcrypt and JWT. JWT also allows the website to be scalable as JWT is stateless which means the server does not need to store sessions.
## Tech Stack

**Client:** React, Redux

**Server:** Node, Express

**Database:** MongoDB


## Features

- Fast and snapy SPA
- Elegant UI UX
- Restful API
- Scalable and stateless backend architecture



## Run Locally

Clone the project

```bash
  git clone https://github.com/Adil-A-Rahman/E-Commerce-Website
```

Go to the project directory

```bash
  cd E-Commerce-Website
```

Install dependencies

```bash
  npm install
```

Start the backend server in development mode (this requires nodemon)

```bash
  npm run dev
```

Start the backend server without nodemon

```bash
  npm start
```

To run Frontend server, go to the frontend folder

```bash
  cd frontend  
```
Install dependencies

```bash
  npm install
```

Start the Frontend server

```bash
  npm start
```

NOTE: For the backend server to function properly, it needs certain env variables. 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT = 4000`

`DB_URI_LOCAL = <your local DB URI if you are using a local DB>`

`DB_URI = <your online DB URI>`

`JWT_SECRET = <any  long string of alphanumeric characters>`

`JWT_EXPIRE = 5d`

`COOKIE_EXPIRE = 5`

`SMTP_SERVICE = <any email service of your choice>`

`SMTP_MAIL = <email ID>`

`SMTP_PASSWORD = <password for that email ID>`

`CLOUDINARY_NAME = <name of your app when you made the a cloudinaly account>`

`CLOUDINARY_API_KEY = <API key given by cloudinary>`

`CLOUDINARY_API_SECRET = <secret key given by cloudinary>`

`FRONTEND_URL = "http://localhost:3000"` 

`STRIPE_API_KEY = <stripe api key given by stripe>`

`STRIPE_SECRET_KEY = <stripe secret key given by stripe>`
## Authors

- [@Adil-A-Rahman](https://github.com/Adil-A-Rahman)
- [@gurushabadsaluja](https://github.com/gurushabadsaluja)
