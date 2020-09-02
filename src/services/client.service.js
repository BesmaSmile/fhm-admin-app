
import {firebase} from './firebase';

export const clientService={
  getClients,
  activateClientAccount,
  getClientOrders
}

function getClients(){
  const db = firebase.firestore();
  return db.collection("users").get()
  .then((querySnapshot)=> {
    const docs= []
    querySnapshot.forEach((doc)=> {
      const data=doc.data()
      docs.push({
        ...data,
        id : doc.id, 
      })
    });
    return docs;
  })
  .catch(error=>{
    console.log(error);
    throw 'Echec de chargement de la liste des clients !'
  });
}

function activateClientAccount(id, active){
  const db = firebase.firestore();
  return db.collection('users').doc(id).update({active})
  .catch(error => {
    throw `Echec ${active ? "d'activation" : "de désactivation" } du compte client`
  });
}

function getClientOrders(id){
  const db = firebase.firestore();
  return db.collection(`utilisateurs/${id}/commandes`).get()
  .then((querySnapshot)=> {
    const docs= []
    querySnapshot.forEach((doc)=> {
      const data=doc.data()
      docs.push({
        id : doc.id, 
        date : data.date,
        aticles : data.articles.map(article=>({
          id :article.id, 
          quantity : article.quantite
        }))
      })
    });
    return docs;
  })
  .catch(error=>{
    console.log(error);
    throw 'Echec de chargement des commandes !'
  });
}