# Assets

Déposer ici les fichiers binaires (non éditables par l'assistant) :

| Fichier attendu | Contenu | Notes |
|---|---|---|
| `corentin.jpg` | Portrait de Corentin (costume, parc) | ratio ~4/5, utilisé dans le hero et la section « À propos » |
| `logo.png`     | Logo IWC (monogramme + wordmark) | idéalement en **PNG fond transparent** ; utilisé dans le footer |

Le code HTML référence déjà ces chemins. Tant qu'un fichier est absent,
un repli automatique (`onerror`) réaffiche le placeholder d'origine —
aucun « image cassée » visible.
