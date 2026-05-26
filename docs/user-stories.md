# User Stories — eXalt Shop
> Bugs et fonctionnalités manquantes — 26/05/2026

---

## Bugs (non-fonctionnel)

**US-01 — Panier vidé après commande**
En tant que client, je veux que mon panier soit automatiquement vidé après avoir validé ma commande, afin de ne pas croire que ma commande n'a pas été prise en compte.
> Critère : après confirmation, le panier affiche 0 article.

**US-02 — Produits en rupture non achetables**
En tant que client, je veux voir clairement qu'un produit est en rupture de stock et ne pas pouvoir l'ajouter au panier, afin d'éviter une commande qui ne peut pas être honorée.
> Critère : bouton "Add to Cart" désactivé si stock = 0, badge "Rupture" visible sur la fiche et la carte produit.

**US-03 — Numéro de commande sur la page de confirmation**
En tant que client, je veux voir un numéro de commande sur la page de confirmation, afin de pouvoir le communiquer au support si besoin.
> Critère : la page affiche l'ID de commande généré après validation.

**US-04 — Redirection vers le checkout après connexion**
En tant que client non connecté qui tente de passer commande, je veux être redirigé vers le checkout après m'être connecté, afin de ne pas perdre mon parcours d'achat.
> Critère : après login depuis le checkout, retour automatique au checkout.

**US-05 — Devise cohérente (€ partout)**
En tant que client, je veux voir la même devise sur toutes les pages, afin de ne pas être confus sur le montant réel de ma commande.
> Critère : l'historique des commandes affiche € et non $.

---

## Fonctionnalités manquantes

**US-06 — Indicateur panier dans le header**
En tant que client, je veux voir le nombre d'articles dans mon panier depuis n'importe quelle page, afin de savoir en un coup d'œil ce que j'ai sélectionné.
> Critère : badge avec le nombre d'articles affiché sur l'icône panier dans le header.

**US-07 — Persistance du panier**
En tant que client, je veux retrouver mon panier après avoir rafraîchi la page ou fermé l'onglet, afin de ne pas perdre ma sélection.
> Critère : le panier est sauvegardé localement et restauré au rechargement.

**US-08 — Statuts de livraison**
En tant que client, je veux voir l'évolution du statut de ma commande (Processing → Shipped → Delivered), afin de savoir où en est ma livraison.
> Critère : l'historique affiche le statut courant de chaque commande.

**US-09 — Email de confirmation**
En tant que client, je veux recevoir un email de confirmation après ma commande, afin d'avoir une preuve d'achat sans avoir à me connecter au site.
> Critère : un email est envoyé avec le numéro de commande et le récapitulatif.

**US-10 — Filtres dans le catalogue**
En tant que client, je veux filtrer les produits par prix, taille et couleur, afin de trouver rapidement ce qui correspond à mes critères.
> Critère : filtres disponibles en plus du tri existant, résultats mis à jour dynamiquement.

**US-11 — Annulation de commande**
En tant que client, je veux pouvoir annuler une commande en statut "Processing", afin d'avoir la main sur mes achats avant expédition.
> Critère : bouton "Annuler" visible dans le détail de commande si statut = Processing.

**US-12 — Guide des tailles**
En tant que client, je veux accéder à un guide des tailles depuis la fiche produit, afin de choisir la bonne taille sans risquer un retour.
> Critère : lien ou modal "Guide des tailles" accessible depuis le sélecteur de taille.
