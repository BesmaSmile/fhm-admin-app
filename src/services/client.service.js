
import {firebase} from './firebase';

export const clientService={
  getClients,
  getPhotoUrl,
  activateClientAccount
}

function getClients(){
  const db = firebase.firestore();
  return db.collection("utilisateurs").get()
  .then((querySnapshot)=> {
    const docs= []
    querySnapshot.forEach((doc)=> {
      const data=doc.data()
      docs.push({
        id : doc.id, 
        firstname : data.prenom, 
        lastname : data.nom, 
        restaurant : data.restaurant,
        active: data.active,
        city :(data.wilaya || data.commune) &&
           `${data.wilaya ? data.wilaya+',' : ''} ${data.commune  ? data.commune : ''}`
      })
    });
    return docs;
  })
  .catch(error=>{
    console.log(error);
    throw Error('Echec de chargement de la liste des clients !')
  });
}

function getPhotoUrl(id){
  const storage=firebase.storage();
  return storage.ref(`photosProfile/${id}`).getDownloadURL()
  .then(result => result)
  .catch(error => {
    console.log(error)
  });
}

function activateClientAccount(id, active){
  const db = firebase.firestore();
  return db.collection('utilisateurs').doc(id).update({active})
  .catch(error => {
    console.log(error)
  });
}