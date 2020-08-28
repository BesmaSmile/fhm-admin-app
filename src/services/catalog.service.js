
import {firebase} from './firebase';
import {storageService} from './storage.service';

export const catalogService={
  getCategories,
  getProducts, 
  setProduct,
  addCategory,
  updateSubCategories 
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
        ...data
      })
    });
    return docs;
  })
  .catch(error=>{
    console.log(error);
    throw 'Echec de chargement des catégories de produit !'
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
    throw 'Echec de chargement des produits !'
  });
}

async function setProduct(product, pictureFile){
  const collectionRef = firebase.firestore().collection('produits');
  const {id, ...toSend}=product
  const productRef =id ? collectionRef.doc(product.id) :  collectionRef.doc();
  const result= await productRef.set(toSend)
  .catch(err=>{
    console.log(err);
    throw {message : "Echec d'enregistrement du produit" };
  })
  //const {id}=result
  console.log(productRef)
  if(pictureFile){
    const path=`${product.categorie}/${productRef.id}`
    await storageService.uploadFile(path, pictureFile) 
    .catch(err=>{
      console.log(err);
      throw {message : "Echec de chargement de l'image du produit. Réassayer !",pictureUploadFailed:true, path }
    })
  }
  return {
    id : productRef.id, 
    category : product.categorie,
    nameFr : product.nomFr,
    nameAr:product.nomAr,
    subCategory : product.sousCategorie,
    state : product.etat,
    price :product.prix ,
    importationPrice :product.prixImportation,
    image : productRef.id
  }
}

async function addCategory(category, existingCategories){
  const collectionRef = firebase.firestore().collection('categories');
  let categories=Object.assign([], existingCategories)
  const categoryRef=collectionRef.doc()
  const result =await categoryRef.set(category)
  categories.splice(category.order-1, 0, {...category, id : categoryRef.id});
  if(category.order<=existingCategories.lenght){
    categories=categories.map((category,i)=>({...category, order :i+1}))
    const categoriesToUpdate=categories.filter(category=>category.id!==categoryRef.id)
    for(const category of categoriesToUpdate)
      await collectionRef.doc(category.id).update({order : category.order})
  }
  return categories
}

function updateSubCategories(categoryId, subCategories){
  const collectionRef = firebase.firestore().collection('categories');
  return collectionRef.doc(categoryId).update({subCategories})
}