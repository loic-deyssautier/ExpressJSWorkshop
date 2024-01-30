# ExpressJSWorkshop

## What is Express.js?

Express.js is a minimalist JavaScript framework for Node.js, making it easy to create backend applications. Its main aim is to simplify development by providing basic functionality for managing routes, HTTP requests, parameters, responses and middleware. Express is often used to build RESTful API backends, providing a solid and flexible foundation for building web applications with NodeJS.

## What is a RESTful Api?

An API REST (Representational State Transfer) is an interface that enables different computer systems to communicate with each other in a standardised way via the HTTP protocol. It is based on simple principles, such as the use of URIs to identify resources, the use of HTTP methods (GET, POST, PUT, DELETE) to perform operations on these resources, and the representation of data in common formats such as JSON or XML. The REST approach favours simplicity, extensibility and independence between client and server.

## Creating a new Hello World project:

### Create a new Express.js project:
First, create a folder called express_workshop and initialise the node project:
```
mkdir express_workshop 
cd express_workshop
npm init -y
```
Add the express js package
```
npm install express
```
Add the Nodemon package to run the application without restarting the server each time the project changes.
```
npm install nodemon
```
If you have node 18 or higher installed you can use --watch instead of nodemon:
```
node -v
node --watch server.js
```
Modify package.json and add the nodemon or --watch command:
```
"scripts": {
    "start": "nodemon server.js"
},
```
Or
```
"scripts": {
    "start": "node --watch server.js"
},
```
Also add body-parser and corns:
```
npm install body-parser
npm install cors
```
Create a server.js file and import express and server initialisation into it:
```
const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);
```
Add the dotenv package to load environment variables from a file:
```
npm install dotenv
```
Create an .env file and add the port on which the server will run:
```
PORT=5000
```
In the server.js file, add the dotenv import:
```
dotenv.config();
```
Always add a constant for the server port in the server.js file:
```
const PORT = process.env.PORT || 3000;
```
Add cors management and body formatting:
```
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());
```
All you have to do is listen on the port indicated:
```
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
```
To launch the project, simply do:
```
npm start
```
For this workshop we are using npm but don't hesitate to check [pnpm](https://pnpm.io/fr/) which is an improved version of npm.

If we go to "localhost:5000", we get a "Cannot GET /" error because no requests have yet been created.

To add a request, simply do:
```
app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Hello World!");
});
```
## The structure of the project :
Here's a good structure for an express project:
```
src/
├── config/ 
├── controllers/
├── middlewares/
├── models/
├── dto/
├── routes/
├── services /
└── sockets/
└── test/
```
- config/: Contains the application configuration files, such as database configuration, etc.

- controllers/: Responsible for handling HTTP requests for each API feature. Each file coordinates the flow of data before responding to the client, facilitating modular route management.

- middlewares/ : Middlewares are intermediate functions that can perform actions before or after the main request is processed. They are used to add functionality such as authentication, validation, etc.

- models/ : Models represent the data structure of the application. They are used to interact with the database and define the form of the data.

- dto/ : Data Transfer Objects (DTOs) are used to define the structure of data exchanged between the frontend (client) and the backend (api). This controls the data that enters and leaves the API.

- routes/ : The files in this folder define the routes of the API. Each file can represent a set of routes associated with a specific functionality of the application.

- services/ : services/: This folder contains the application's services. Services are functions that implement the application's business logic. They are generally used by controllers to perform specific operations.

- sockets/ : If your application uses WebSockets, this folder may contain the logic associated with managing connections and data exchanges in real time.

- test/: Unit and integration tests.

## Setting up a Mongodb database:
### Creating a mongoDB DB:
To store data, you need to connect a DB to the api. In our case, we're going to use a NoSQL database, MongoDB.

- The easiest way to create a Mongo db is to host one with a free account on [Mongodb Atlas](https://www.mongodb.com/).
- Creating a new organisation
- Once an account has been created, create a new project.
- Then click on Create a deployment and choose the "M0
FREE" then click on Create.
- Create a user and passwords
- Add the ip "0.0.0.0/0" so that access to the db is not restricted.
### Add Mongo to the project
```
npm install mongodb
```
- Go to the Database tab and click on connect, Drivers and copy the url of the db (3. Add your connection string into your application code)
- Add a DATABASE_URL variable to the .env with the url of the db
- Add a connection.js file in the config folder with the following content:
```
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};
module.exports = connectDB;
```
Puis dans index.js a la racine du projet :
```
const connectDB = require('./src/config/connection');

connectDB(); # call the function just before the app.use
```

## Add a get route:
In the routes folder, create an index.js file and add the following code:
```
const express = require('express');

const router = express.Router();

module.exports = router;
```
In the server.js at the root of the project import the router and add below the request get / :
```
app.use('', routes);
```
This file will contain all the project routes.

We're going to create a get /helloworld request:
```
router.get('/helloworld', helloWorldGet);
```
The different types of http requests:
- get: to obtain some information
- post: to create something in the db, with an object in the request
- put : to update something in the db, with an object in the request
- delete : to delete something in the db

Be careful not to capitalise letters in the url of a request!

Bad examples:
```
http://api.example.com/v1/store/CreateItems/{item-id}❌
http://api.example.com/v1/store/getEmployees/{emp-id}❌
http://api.example.com/v1/store/update-prices/{price-id}❌
http://api.example.com/v1/store/deleteOrders/{order-id}❌
```
Good examples:
```
http://api.example.com/v1/store/items/{item-id}✅
http://api.example.com/v1/store/employees/{emp-id}✅
http://api.example.com/v1/store/prices/{price-id}✅
http://api.example.com/v1/store/orders/{order-id}✅
```
Create a hello-world.js file in controllers and add a get request:

```
const helloWorldGet = async (req, res, next) => {
    try {
      console.log("Hello world");
      res.status(201).json({ message: 'Hello world' });
    } catch (error) {
      next(error);
    }
};

module.exports = { 
    helloWorldGet
};
```
To test requests, use Postman

## Add the authentication:
To add the authentication, we're going to add the user's schema.

Create a User.js file in the models folder:
```
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
```
Add the bcrypt package to hash the passwords:
```
npm i bcrypt
```
Still in the User.js file, add the code to hash the password and to compare a string to the password:
```
const bcrypt = require('bcrypt');

userSchema.pre('save', async function (next) {
  # hash the password here
});

userSchema.methods.comparePassword = async function (password) {
  # compare a string with a password
};
```
To manage the authentication token, we're going to use jwt :
```
npm i jwt
```
We're now going to create the authentication request, create an auth.js file in the controllers/ folder and complete the following code:
```
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res, next) => {
  var { username, password } = req.body;

  try {
    ...

    await user.save();
    ...
  } catch (error) {
    ...
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    ...

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '15d'
    });
    ...
  } catch (error) {
    ...
  }
};

const logout = async (req, res, next) => {

  try {
    ...
  } catch (error) {
    ...
  }
};

module.exports = { register, login, logout };
```
Don't forget to import the requests into the routes folder:
```
const { register, login, logout } = require('../controllers/auth');

router.post('/auth/signup', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
```
Now all that's left to do is to create middleware to manage the authentication token, which will protect certain requests:

Create an auth.js file in the middlewares folder auth.js :
```
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };
```

To protect a request, simply add [authenticate] to each protected request in routes/index.js :
```
const { authenticate } = require('../middlewares/auth');

router.get('/helloworld', [authenticate], helloWorldGet);
```
Try creating a profile get request to obtain a user's information

Here is some help on obtaining a user in the db based on an id:
```
const { _id } = req.user;
...
const user = await User.findById(_id);
...
```
- Try to create a request to delete a user
- Try to create a request to obtain the list of users
- Trying to create a request to modify a user's info 
- Add more information to the user's schema
- Create a new schema for a group message system

