# User Journey Map — eXalt Shop
> Basé sur l'exploration du produit du 26/05/2026

---

## Persona de référence
**Consultant eXalt** — salarié qui découvre la boutique pour la première fois, veut commander un hoodie pour un client event.

---

## Parcours principal : Découverte → Achat → Suivi de commande

| Phase | Étape | Ce que l'utilisateur fait | Ce qu'il ressent | Frictions identifiées |
|-------|-------|--------------------------|-------------------|-----------------------|
| **1. Arrivée** | Homepage | Parcourt la bannière, les catégories, les produits mis en avant | Curieux, première impression | Pas de badge panier dans le header — impossible de savoir si quelque chose est déjà dans le panier. Pas d'indicateur de connexion visible. |
| **2. Exploration** | Catalogue (Shop) | Filtre par catégorie, trie par prix | Engagé | Des produits en rupture de stock apparaissent sans badge. Aucune info de stock visible sur les cartes produit. |
| **3. Sélection** | Fiche produit | Choisit une taille, une couleur, une quantité, clique "Add to Cart" | Décidé | La date de livraison est codée en dur (non dynamique). Pas d'info stock sur la page — seulement dans le panier. Peut ajouter un produit en rupture sans avertissement. Peut choisir une quantité supérieure au stock disponible. |
| **4. Panier** | Cart | Vérifie les articles, ajuste les quantités | Prudent, vérifie | Panier vide = page blanche, aucun message ni CTA. Les liens vers les produits depuis le panier sont cassés. Le champ quantité accepte 0 ou des valeurs négatives. |
| **5. Achat** | Checkout | Remplit le formulaire (contact, livraison, paiement) | Concentré, pressé | Pas de redirection vers le login si non connecté. Champ "Company" obligatoire (inhabituel). Panier non vidé après la commande. |
| **6. Confirmation** | Order Confirmation | Lit le message de confirmation | Soulagé mais incertain | Aucun numéro de commande affiché. Aucune info sur les articles achetés ni le total. Aucune mention d'un email de confirmation. |
| **7. Suivi** | Order History | Cherche sa commande dans l'historique | Frustré | **Bug critique (corrigé) :** les commandes n'étaient pas sauvegardées. Devise affichée en $ alors que l'app est en €. Aucun statut de livraison au-delà de "Processing". |

---

## Moments critiques

```
[Homepage] → [Catalogue] → [Fiche produit] → [Panier] → [Checkout] → [Confirmation] → [Historique]
                ↓                ↓                ↓           ↓              ↓                ↓
           Produits OOS     Pas de stock      Panier vide =  Pas de login  Pas de N°      Commande
           sans badge       visible           page blanche    requis        commande       introuvable ⚠️
```

---

## Ce qui manque (fonctionnalités absentes)

| Fonctionnalité | Impact utilisateur |
|----------------|--------------------|
| Wishlist / favoris | Impossible de sauvegarder un article pour plus tard |
| Email de confirmation de commande | Aucune trace de l'achat hors du site |
| Annulation de commande | Pas d'autonomie post-achat |
| Suivi de livraison (statuts) | Opacité totale après "Processing" |
| Galerie d'images produit | Un seul visuel par article |
| Guide des tailles | Dropdowns XS→2XL sans référence |
| Persistance du panier (refresh) | Panier perdu au rechargement de page |
| Filtre par prix / taille / couleur | Seulement un tri disponible dans le catalogue |
| Avis / notes produits | Aucun retour utilisateur visible |
| Indicateur panier dans le header | Impossible de voir le nombre d'articles sans aller dans le panier |
