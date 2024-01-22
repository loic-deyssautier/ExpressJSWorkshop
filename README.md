# ExpressJSWorkshop

## Qu'est ce qu'Express.js

Express.js est un framework JavaScript minimaliste pour Node.js, facilitant la création d'applications backend. Son objectif principal est de simplifier le développement en fournissant des fonctionnalités basiques pour la gestion des routes, des requêtes HTTP, des paramètres, des réponses, et des middlewares. Express est souvent utilisé pour construire des backends API RESTful, offrant ainsi une base solide et flexible pour la création d'applications web avec Node.js.

## Qu'est ce qu'une Api RESTful

Une API REST (Representational State Transfer) est une interface qui permet à des systèmes informatiques différents de communiquer entre eux de manière standardisée via le protocole HTTP. Elle repose sur des principes simples, comme l'utilisation d'URIs pour identifier les ressources, l'utilisation des méthodes HTTP (GET, POST, PUT, DELETE) pour effectuer des opérations sur ces ressources, et la représentation des données en formats courants comme JSON ou XML. L'approche REST favorise la simplicité, l'extensibilité et l'indépendance entre le client et le serveur.

## Créer un nouveau projet Express.js (Hello World)
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
Modifier package.json et ajouter le commande nodemon :
```
"scripts": {
    "start": "nodemon index.js"
},
```
Créer un fichier index.js et importer dedans express ainsi que l'initialisation du serveur :
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
dans le fichier index.js ratjouter l'import de dotenv :
```
dotenv.config();
```
Toujour dans le fichier index.js rajouter une constante pour le port du serveur :
```
const PORT = process.env.PORT || 3000;
```
Il ne manque plus qu'a ecouter sur le port indiqué :
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