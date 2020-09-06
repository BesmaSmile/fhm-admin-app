
import {firebase} from './firebase';

export const clientService={
  getClients,
  activateClientAccount
}

function getClients(){
  const db = firebase.firestore();
  return db.collection("users").get()
  .then(async (result)=> {
    const clients= []
    result.forEach(async client=>{
      const clientData=client.data()
      clients.push({
        ...clientData,
        id : client.id
      })
    })
    for(const client of clients){
      const orders=await db.collection(`users/${client.id}/orders`).get()
      const ordersList=[]
      orders.forEach((order)=>{
        const orderData=order.data()
        ordersList.push({ 
          ...orderData, 
          date : orderData.date.toDate(),
          id : order.id,
          client : {
            id : client.id,
            firstname : client.firstname,
            lastname : client.lastname,
            phoneNumber : client.phoneNumber
          }
        })
      })
      client.orders=ordersList
    }
    console.log(clients)
    return clients;
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