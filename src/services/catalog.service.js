
import {firebase} from './firebase';

export const catalogService={
  getCategories,
  getProducts
}

function getCategories(){
  const db = firebase.firestore();
  return db.collection(`categories`).get()
  .then((querySnapshot)=> {
    const docs= []
    querySnapshot.forEach((doc)=> {
      const data=doc.data()
      docs.push({
        id : doc.id, 
        label : data.libelle,
        order : data.ordre,
        states : data.etats,
        subCategories : data.sousCategories,
        importation : data.importation
      })
    });
    return docs;
  })
  .catch(error=>{
    console.log(error);
    throw Error('Echec de chargement des catégories de produit !')
  });
}

function getProducts(){
  const db = firebase.firestore();
  return db.collection(`produits`).get()
  .then((querySnapshot)=> {
    const docs= []
    querySnapshot.forEach((doc)=> {
      const data=doc.data()
      docs.push({
        id : doc.id, 
        nameFr : data.nomFr,
        nameAr : data.nomAr,
        category : data.categorie,
        subCategory : data.sousCategorie,
        state : data.etat,
        price :data.prix ,
        importationPrice :data.prixImportation,
        image : data.image
      })
    });
    return docs;
  })
  .catch(error=>{
    console.log(error);
    throw Error('Echec de chargement des produits !')
  });
}