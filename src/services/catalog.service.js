
import {firebase} from './firebase';
import {storageService} from './storage.service';

export const catalogService={
  getCategories,
  getProducts, 
  setProduct,
  setCategory,
  updateSubCategories ,
  updateStates
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
  return db.collection(`products`).get()
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
    throw 'Echec de chargement des produits !'
  });
}

async function setProduct(product, pictureFile){
  const collectionRef = firebase.firestore().collection('products');
  const {id, ...toSend}=product
  const productRef =id ? collectionRef.doc(product.id) :  collectionRef.doc();
  await productRef.set(toSend)
  .catch(err=>{
    console.log(err);
    throw {message : "Echec d'enregistrement du produit" };
  })
  //const {id}=result
  console.log(productRef)
  if(pictureFile){
    const path=`${product.category}/${productRef.id}`
    await storageService.uploadFile(path, pictureFile) 
    .catch(err=>{
      console.log(err);
      throw {message : "Echec de chargement de l'image du produit. Réassayer !",pictureUploadFailed:true, path }
    })
  }
  return {
    ...product,
    id : productRef.id, 
    image : productRef.id
  }
}

async function setCategory(category, existingCategories){
  const batch = firebase.firestore().batch();
  const collectionRef = firebase.firestore().collection('categories');
  let categories=Object.assign([], existingCategories)
  const categoryRef=category.id ? collectionRef.doc(category.id)  : collectionRef.doc()
  batch.set(categoryRef, category)
  categories=categories.filter(category=>category.id!==categoryRef.id)
  categories.splice(category.order-1, 0, {...category, id : categoryRef.id});
  console.log(categories)
  if(category.order<=existingCategories.length){
    categories=categories.map((category,i)=>({...category, order :i+1}))
    const categoriesToUpdate=categories.filter(category=>category.id!==categoryRef.id)
    console.log(categoriesToUpdate)
    for(const category of categoriesToUpdate)
      batch.update(collectionRef.doc(category.id), {order : category.order})
    await batch.commit().catch(error=>{
      console.log(error);
      throw {message :"Veuiller modifier l'ordre des catégories !", added:true}
    })
  }
  return categories
}

function updateSubCategories(categoryId, subCategories){
  const collectionRef = firebase.firestore().collection('categories');
  return collectionRef.doc(categoryId).update({subCategories})
  .catch(error=>{
    console.log(error);
    throw "Echec d'ajout d'une sous-catégorie de produit !"
  });
}

function updateStates(categoryId, states){
  console.log(categoryId)
  console.log(states)
  const collectionRef = firebase.firestore().collection('categories');
  return collectionRef.doc(categoryId).update({states})
  .catch(error=>{
    console.log(error);
    throw "Echec d'ajout d'un état de produit !"
  });
}