import {firebase} from './firebase';


export const adminService={
  getAdmins
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