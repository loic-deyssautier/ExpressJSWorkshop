# ExpressJSWorkshop

## Qu'est ce qu'Express.js

Express.js est un framework JavaScript minimaliste pour Node.js, facilitant la création d'applications backend. Son objectif principal est de simplifier le développement en fournissant des fonctionnalités basiques pour la gestion des routes, des requêtes HTTP, des paramètres, des réponses, et des middlewares. Express est souvent utilisé pour construire des backends API RESTful, offrant ainsi une base solide et flexible pour la création d'applications web avec Node.js.

## Qu'est ce qu'une Api RESTful

Une API REST (Representational State Transfer) est une interface qui permet à des systèmes informatiques différents de communiquer entre eux de manière standardisée via le protocole HTTP. Elle repose sur des principes simples, comme l'utilisation d'URIs pour identifier les ressources, l'utilisation des méthodes HTTP (GET, POST, PUT, DELETE) pour effectuer des opérations sur ces ressources, et la représentation des données en formats courants comme JSON ou XML. L'approche REST favorise la simplicité, l'extensibilité et l'indépendance entre le client et le serveur.

## Créer un nouveau projet Express.js basique :
Tout d'abord, créez un dossier appelé express_workshop et initialisez npm :
```
mkdir express_workshop 
cd express_workshop
npm init -y
```
Ajouter le package express js
```
npm install express
```
Ajoutez le paquet Nodemon pour exécuter l'application sans redémarrer le serveur à chaque changement dans le projet.
```
npm install nodemon
```
Si vous avez node 18 ou plus d'installer vous pouvez utliser le --watch a la place de nodemon

Modifier package.json et ajouter le commande nodemon :
```
"scripts": {
    "start": "nodemon server.js"
},
```
Ajouter aussi body-parser et cors
```
npm install body-parser
npm install cors
```

Créer un fichier server.js et importer dedans express ainsi que l'initialisation du serveur :
```
const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);
```
Ajoutez le paquet dotenv pour charger les variable d'environement a partir d'un fichier
```
npm install dotenv
```
Créer un fichier .env et ajouter dedans le port sur lequel le serveur va tourner :
```
PORT=5000
```
dans le fichier server.js rajouter l'import de dotenv :
```
dotenv.config();
```
Toujour dans le fichier server.js rajouter une constante pour le port du serveur :
```
const PORT = process.env.PORT || 3000;
```
Ajouter la gestion des cors et le formatage du body :
```
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());
```
Il ne manque plus qu'a écouter sur le port indiqué :
```
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
```
Pour lancer le projet il suffit de faire :
```
npm start
```
Si on va sur "localhost:5000", il y a une erreur "Cannot GET /" car aucune requêtes n'a encore été créé.</br>
Pour rajouter un requête il suffit de faire :
```
app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Hello World!");
});
```
## La structure du projet :
Voici une bonne structure pour un projet express :
```
src/
├── config/ 
├── controllers/
├── middlewares/
├── models/
├── dto/
├── routes/
└── sockets/
└── test/
```

- config/ : Contient les fichiers de configuration de l'application, tels que la configuration de la base de données, etc.

- controllers/ : Responsable du traitement des requêtes HTTP pour chaque fonctionnalité de l'API. Chaque fichier coordonne le flux des données avant de répondre au client, facilitant la gestion modulaire des routes.

- middlewares/ : Les middlewares sont des fonctions intermédiaires qui peuvent effectuer des actions avant ou après le traitement de la requête principale. Ils sont utilisés pour ajouter des fonctionnalités comme l'authentification, la validation, etc.

- models/ : Les modèles représentent la structure des données de l'application. Ils sont utilisés pour interagir avec la base de données et définir la forme des données.

- dto/ : Les objets de transfert de données (DTO) sont utilisés pour définir la structure des données échangées entre le front (client) et backend (api). Cela permet de contrôler les données qui entrent et sortent de l'API.

- routes/ : Les fichiers dans ce dossier définissent les routes de l'API. Chaque fichier pourrait représenter un ensemble de routes associées à une fonctionnalité spécifique de l'application.

- sockets/ : Si votre application utilise des WebSockets, ce dossier pourrait contenir la logique liée à la gestion des connexions et des échanges de données en temps réel.

- test/ : Les tests unitaires, d'intégration.

## Setup d'une base de données Mongodb :
### Créer un DB mongoDB
Pour stocker des données il faut connecter un DB a l'api, dans notre cas nous allons utiliser mMngoDB.</br>
- La façon la plus facile de créer une db Mongo, est dans hébeger une avec un compte gratuit sur [Mongodb Atlas](https://www.mongodb.com/).
- Créer une nouvelle organisation
- Une fois un compte créé, créer un nouveau projet.
- Puis cliquer sur Create a deployment et choisir l'option "M0
FREE" puis cliquer sur Create.
- Créer un user et mots de passe
- Ajouter l'ip "0.0.0.0/0" pour que l'accès a la db ne soit pas restreint.
### Ajouter Mongo dans le projet
```
npm install mongodb
```
- Allez dans l'onglet Database et cliquer sur connect, Drivers et copier l'url de la db (3. Add your connection string into your application code)
- Ajouter dans le .env une variable DATABASE_URL avec l'url de la db
- Ajouter un fichier connection.js dans le dossier config avec le contenue suivant :
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

connectDB(); # call la fonction juste avant les app.use
```

## Ajout d'une route get :
Dans le dossier routes créer un fichier index.js et ajouter le code suivant :</br>
```
const express = require('express');

const router = express.Router();

module.exports = router;
```
Dans le server.js a la racine du projet importer le router et ajouter en dessous de la requête get / :
```
app.use('', routes);
```
Ce fichier va contenir touts les routes de projet.</br>
Nous allons créer une requête get /helloworld
```
router.get('/helloworld', helloWorldGet);
```
Les différent type de requêtes http
- get : pour obtenir des information
- post : pour l'ajoute quelque chose dans la db, avec un objet dans la requête
- put : pour modifier quelque chose dans la db, avec un objet dans la requête
- delete : pour supprimer quelque chose dans la db


Créer un fichier hello-world.js dans controllers et ajoute une requête get :

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
Pour tester les requêtes, utiliser Postman

## Ajout de l'authentification :
Pour ajouter l'authentification nous allons rajouter le schéma de l'user.</br>
Créer un fichier User.js dans le dossier models
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
Rajouter le paquet bcrypt pour hasher le mots de pass :
```
npm i bcrypt
```
Toujours dans le fichier User.js rajouter le code pour hashé le mots de passe et pour comparer une string au mots de passe .
```
const bcrypt = require('bcrypt');

userSchema.pre('save', async function (next) {
  # hashé le mots de passe ici
});

userSchema.methods.comparePassword = async function (password) {
  # comparer une string au mots de passe
};
```
Pour gérer le token d'authentification nous allons utiliser jwt
```
npm i jwt
```
Nous allons maintenant créer la requête d'authentification, créer un fichier  auth.js dans le dossier controllers/ et compléter le code suivant :
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
N'oublier pas d'importer les requête dans le dossier route.js
```

const { register, login, logout } = require('../controllers/auth');

router.post('/auth/signup', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
```

Maintenant il ne reste plus qu'a créer un middleware pour la gestion du token d'authentification qui va permettre de protéger certaine requête :

Créer un dans le dossier middlewares auth.js :
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

Pour protéger un requête il suffit de rajouter dans routes/index.js [authenticate] a chaque requête protégé :
```
const { authenticate } = require('../middlewares/auth');

router.get('/helloworld', [authenticate], helloWorldGet);
```

Essayer de créer une requête profile get pour obtenir le information d'un user

Voici un peut d'aide obtenir pour obtenir un user dans le db d'après un id :
```
const { _id } = req.user;
...
const user = await User.findById(_id);
...

```
- Essayer de créer une requête supprimer un user
- Essayer de créer une requête obtenir la listes des user
- Essayer de créer une requête pour modifier les info d'un user 
- Rajouter plus d'information dans le schéma de l'user
- Créer un nouveau schéma pour un système de messages en groupe

