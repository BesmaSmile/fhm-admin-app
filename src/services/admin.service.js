import {firebase} from './firebase';
import {apiConstants} from 'consts';
import {handleResponse} from 'functions';

export const adminService={
  getAdmins,
  registerAdmin,
}

function getAdmins(){
  const db = firebase.firestore();
  return db.collection("administrators").get()
  .then((result)=> {
    const administrators= []
    result.forEach( admin=>{
      const adminData=admin.data()
      administrators.push({
        ...adminData,
        id : admin.id
      })
    })
    return administrators
  }).catch(error=>{
    console.log(error)
    throw 'Echec de chargement de la liste des administrateurs'
  })
}

function registerAdmin(user, isFirstAdmin, secretKey){
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({user,isFirstAdmin, secretKey})
  }
  return fetch(`${apiConstants.URL}/registerAdmin`, options)
  .then(handleResponse)
  .catch(error=>{
    let msg=''
    switch(error){
      case 'invalid_secret_key' :
      msg='La clé secrète est invalide'
      break;
      default :
      msg='Une erreur est survenue !'
    }
    throw msg
  })
}