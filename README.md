# Chat_app

## Configuration initiale

Remplacez CHATAPP par le dossier de votre projet.

```bash
cd CHATAPP
```

## Lancer les services Docker

Démarrez les conteneurs Docker en arrière-plan avec le fichier de configuration de développement.

```bash
docker compose -f docker-compose.dev.yml up -d
```

## Installation des dépendances

Accédez au dossier `back` et installez les dépendances npm.

```bash
cd back
npm install
```


## Créer le fichier `.env`

Créez un fichier nommé `.env` à la racine de votre projet avec le contenu suivant :

```
DATABASE_URL="mongodb://localhost:27017/chat"
REDIS_URL="redis://localhost:6379"
PORT=3000
```
## Générer le client Prisma

Générez le client Prisma pour interagir avec la base de données.

```bash
npm run prisma:generate
```

## Synchroniser la base de données

Poussez les modifications du schéma Prisma vers la base de données.

```bash
npm run prisma:push
```

## Lancer le serveur en mode développement

Démarrez le serveur en mode développement.

```bash
npm run dev
```

---

## Réinitialiser la base de données

Si vous souhaitez réinitialiser la base de données, suivez les étapes suivantes.

### Arrêter et supprimer les conteneurs

```bash
docker compose -f docker-compose.dev.yml down
```

### Supprimer les volumes (données)

Cela supprimera également les données persistantes.

```bash
docker compose -f docker-compose.dev.yml down -v
```

### Vérifier que tous les conteneurs sont arrêtés

```bash
docker ps
```

### Relancer les services Docker avec réinitialisation de la base de données

```bash
docker compose -f docker-compose.dev.yml up -d
```