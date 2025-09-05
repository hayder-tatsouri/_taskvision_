# TaskVision Project

Ce projet contient :
- Un **backend Node.js/Express** (API REST)
- Un **frontend Angular** (interface utilisateur)

---

Installation et Configuration
1. Cloner le dépôt:
   ```bash
   git clone https://github.com/hayder-tatsouri/_taskvision_.git
   cd _taskvision_
   
2.Installer les dépendances pour le frontend et le backend

   .Installer les dépendances du Backend
   
     cd backend/
     npm install
     
   .Installer les dépendances du frontend
   
      cd ../angular-tailwind-main/
      npm install 
      
3.Configuration de l'environnement
  Modifier le fichier .env dans le dossier Backend avec les variables adéquates :

      ACCESS_TOKEN_SECRET=supersecret
      
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=
      DB_NAME=taskvision
      DB_DIALECT=mysql

***Création des tables et ajout de données initiales***
Lancer les migrations :

      cd backend/
      npx sequelize-cli db:migrate
      
Cela crée toutes les tables nécessaires (Users, Projects, Tasks, etc.)

***Ajouter un utilisateur admin avec le seeder*** :

      npx sequelize-cli db:seed:all
L’utilisateur par défaut créé :

      Email : admin@example.com
      Mot de passe : password123

4.**Lancement du Projet**

  Vous devez exécuter simultanément les serveurs frontend et backend.
  
  Exécution dans des terminaux séparés
  
  1.**Terminal 1** - Démarrer le serveur Backend :
    
    cd backend/
    node index.js
    
  Le backend tourne sur [http://localhost:3000](http://localhost:3000)
  
  1.**Terminal 2** - Démarrer le serveur Frontend :
    
      cd angular-tailwind-main/
      ng serve
  Le backend tourne sur [http://localhost:4200](http://localhost:4200)

  5.**Tester le projet**

Connecte-toi avec l’utilisateur admin créé par le seeder.

Crée un projet, ajoute des tâches et des commentaires pour tester toutes les fonctionnalités.

    

  
