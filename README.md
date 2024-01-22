# ExpressJSWorkshop

## Qu'est ce qu'Express.js

Express.js est un framework JavaScript minimaliste pour Node.js, facilitant la création d'applications backend. Son objectif principal est de simplifier le développement en fournissant des fonctionnalités basiques pour la gestion des routes, des requêtes HTTP, des paramètres, des réponses, et des middlewares. Express est souvent utilisé pour construire des backends API RESTful, offrant ainsi une base solide et flexible pour la création d'applications web avec Node.js.

## Qu'est ce qu'une Api RESTful

Une API REST (Representational State Transfer) est une interface qui permet à des systèmes informatiques différents de communiquer entre eux de manière standardisée via le protocole HTTP. Elle repose sur des principes simples, comme l'utilisation d'URIs pour identifier les ressources, l'utilisation des méthodes HTTP (GET, POST, PUT, DELETE) pour effectuer des opérations sur ces ressources, et la représentation des données en formats courants comme JSON ou XML. L'approche REST favorise la simplicité, l'extensibilité et l'indépendance entre le client et le serveur.

## Créer un nouveau projet Express.js
- Tout d'abord, créez un dossier appelé express_workshop et initialisez npm :
```
mkdir express_workshop 
cd express_workshop
npm init -y
```
- Ajouter le package express js
```
npm install express
```
- Ajoutez le paquet Nodemon pour exécuter l'application sans redémarrer le serveur à chaque changement dans le projet.
```
npm install nodemon
```
- Créer un fichier index.js
- 