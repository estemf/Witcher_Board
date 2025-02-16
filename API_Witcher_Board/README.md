# Witcher Board API

Bienvenue sur le projet Witcher Board API.

## Comment lancer l'API

Il vous faudra un terminal dans tous les cas.

Déplacez vous au sein du projet pour lancer l'API.

### Via Docker

Cette méthode est la plus simple.

Il faut au préalable avoir installé Docker (dans le cas inverse allez à la méthode suivante).

```
docker build -t witcher-board-api .
docker run -p 3000:3000 -d witcher-board-api
```

### À l'ancienne

Cette méthode exécute les commandes qui seront exécutées dans le Dockerfile.

```
npm install
npm run build
npm run start
```

## Accéder à l'application

L'application est désormais lancée.
Vous pouvez vérifier qu'elle fonctionne bien en accédant au lieu http://localhost:3000/api/witchers ce qui devrait vous retourner des données au format JSON.

Vous pouvez consulter une documentation de l'API à l'adresse http://localhost:3000/api-docs/ sous forme d'une page Swagger.
