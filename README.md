# 🚫 Bot Discord – Nettoyeur d’Invites

Un bot **Discord.js v14** qui supprime automatiquement les invitations d’un serveur selon des critères configurables.  
Tous les critères disponibles dans l’API Discord sont implémentés et peuvent être activés/désactivés via un fichier `config.json`.

---

## ⚙️ Fonctionnalités

- Suppression automatique des invitations selon plusieurs critères :
  - Utilisation maximale atteinte (`maxUses`)
  - Invitations expirées (`expiresAt`)
  - Invitations temporaires (kick après déconnexion)
  - Invitations créées par des bots
  - Invitations sans canal associé
  - Invitations pointant vers des canaux vocaux
  - Invitations jamais utilisées
  - Invitations permanentes (sans limite ni expiration)
  - Invitations trop anciennes (configurable en jours)
  - Invitations avec durée de validité trop longue (`maxAge`)

---

## 📂 Structure du projet

```
.
├── index.js        # Code principal du bot
├── config.json     # Configuration des critères de suppression
├── .env            # Variables d’environnement (token)
└── README.md       # Documentation
```

---

## 🔧 Installation

1. Clone le repo :
   ```bash
   git clone https://github.com/ton-compte/discord-invite-cleaner.git
   cd discord-invite-cleaner
   ```

2. Installe les dépendances :
   ```bash
   npm install
   ```

3. Crée un fichier `.env` à la racine :
   ```
   DISCORD_TOKEN=ton_token_discord
   ```

4. Configure tes critères dans `config.json` :
   ```json
   {
     "delete": {
       "usedUp": true,
       "expired": true,
       "temporary": true,
       "byBots": true,
       "noChannel": true,
       "voiceChannel": false,
       "zeroUses": false,
       "permanent": false,
       "olderThanDays": 30,
       "maxAgeSeconds": 86400
     }
   }
   ```

---

## ▶️ Lancer le bot

```bash
node index.js
```

Le bot se connectera et nettoiera automatiquement les invitations selon les critères définis dans `config.json`.

---

## 🛠️ Personnalisation

- Modifie `config.json` pour ajuster les critères.
- Relance le bot pour appliquer les changements.

---

## 📜 Licence

Projet open source sous licence MIT.  
