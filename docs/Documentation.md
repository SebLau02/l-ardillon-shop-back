# Documentation du serveur l'ardillon-shop

# Uri de base du serveur: *https://l-ardillon-shop-back.vercel.app/api*

## Côté client:

    - leurres: **"/leurres"**

    	- GET **"/"** : récupérer tout les produits
    	- GET **"/:leurreId"**: récupérer un produit grâce à son _id

    - auth: **"/auth"**

    	- POST **"/signup"**: permet de s'inscrire
    	- POST **"/login"**: se connecter
    	- POST **"/add-adresse/:useId"**: ajouter une adresse postale

    -  profile: **"/profile"**

    	- GET **"/:userId"**: récupérer un utilisateur et ses infos

    - deconnection: **"/"**:

    	- POST **"/add-inactive-token"**: permet d'ajouter le token actuel dans la liste des token plus valide

## Côté admin:

    - admin: **"/admin"**:

    	- POST **"/signup"**: permet d'inscrire un admin

    - leurres: **"/leurres"**

    	- POST **"/"**: permet d'ajouter un nouveau produit dans la bd
    	- POST "/:leurreId"**: ajouter une déclinaison à un produit en prenant en paramètre son _id
    	- PUT **"/modify-lure/:leurreId"**: modifier une déclinaison d'un produit: prix, taille, illustration etc...
    	- PUT **"/stock-management"**: gérer les stock: prix quantité
    	- DELETE **"/delete"**: supprimer tout les produits
    	- DELETE **"/delete/:leurreId"**: supprimer un seul produit grâce à son _id
    	- DELETE **"/delete/delete-ref-declination/:lureId/:colorId"** : supprimer une déclinaison d'un produit grâce à leur _id

    - user: **"/user"**

    	- DELETE **"/delete-one-user"**: supprimer tout les utilisateurs
    	- DELETE **"/delete-one-user/:useId"**: supprimer un utilisateur grâce à son _id

    - profile: **"/profile"**

    	- GET **"/"**: récupérer tout les utilisateurs
