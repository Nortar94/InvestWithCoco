# Invest With Coco — Site vitrine

Site vitrine **one-page** pour IWC (Invest With Coco), conseil en investissement
et accompagnement patrimonial — Paris · Rennes · à distance.
Domaine cible : `investwithcoco.fr`.

Implémentation en **HTML / CSS / JS statique** (sans build), pour un site léger,
rapide et déployable n'importe où (Netlify, Vercel, GitHub Pages, OVH, etc.).

## Structure

```
index.html    Markup de la page (nav, hero, 6 sections, footer)
styles.css    Styles + design tokens (variables CSS) + responsive
script.js     Interactions (nav scroll, lien actif, burger, formulaire)
```

## Lancer en local

Aucune dépendance. Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Sections (dans l'ordre)

Nav fixe → Hero → Le conseil personnalisé → Investissement long terme →
Défiscalisation → À propos → Témoignages → Contact → Footer.

> ⚠️ « Investissement long terme » (fond clair) et « Défiscalisation »
> (fond marine sombre) sont volontairement séparées visuellement et
> conceptuellement. Conserver ce contraste.

## Réglages (en haut de `script.js`, objet `CONFIG`)

| Réglage | Défaut | Effet |
|---|---|---|
| `showPhotos` | `true` | Affiche les placeholders photo (hero + à propos) |
| `showHeroBadge` | `true` | Ligne de réassurance sous le hero |
| `showFloatingContact` | `false` | Bouton flottant « Prendre rendez-vous » |

## Valeurs renseignées

| Donnée | Valeur |
|---|---|
| Calendly | `https://calendly.com/corentingaillardadvisory/30min` |
| Email | `corentingaillardadvisory@gmail.com` |
| ORIAS | `25000141` |
| LinkedIn | profil de Corentin Gaillard |

## Reste à compléter

- **Logo** : le wordmark texte « IWC » (nav + footer) est provisoire —
  remplacer par le vrai logo une fois le fichier ajouté au dépôt.
- **Photos** : remplacer les placeholders rayés par de vraies images
  (portrait de Corentin, Paris). Conserver le ratio **4/5**.
- **X / réseaux** : le lien X a été retiré (non fourni). En rajouter un si besoin.

> Note marque vs personne : « Invest With Coco » reste le nom de marque
> (logo, titre, footer) ; dans les textes, l'interlocuteur est nommé
> « Corentin ».

## Formulaire de contact

Par défaut le formulaire **ne fait aucun envoi réel** : il bascule simplement
vers un écran de confirmation (comme le prototype).

Pour brancher un vrai envoi, renseigner `FORM_ENDPOINT` dans `script.js`
(ex. un endpoint [Formspree](https://formspree.io)) :

```js
var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxx';
```

Le formulaire sera alors posté en `fetch()` ; en cas de succès, l'écran de
confirmation s'affiche. Alternatives : [Resend](https://resend.com), une route
API serverless, etc.

## Design tokens

Couleurs, typographie et espacements sont centralisés en variables CSS dans
`:root` (`styles.css`). Polices via Google Fonts : **Cormorant Garamond**
(titres) + **Mulish** (texte).

## Accessibilité / SEO
- Balises sémantiques (`header`, `main`, `section`, `footer`), `lang="fr"`.
- Méta description + Open Graph.
- `prefers-reduced-motion` respecté (animations désactivées).
- Menu mobile accessible au clavier (`aria-expanded`, fermeture via `Échap`).
