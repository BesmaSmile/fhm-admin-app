
import {firebase} from './firebase';
export const clientService={
  getClients,
  updateClientStatus
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
        createdAt : clientData.createdAt && clientData.createdAt.toDate(),
        updatedAt : clientData.updatedAt && clientData.updatedAt.toDate(),
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
          createdAt : orderData.createdAt.toDate(),
          paidAt : orderData.paidAt && orderData.paidAt.toDate(),
          deliveredAt : orderData.deliveredAt && orderData.deliveredAt.toDate(),
          id : order.id,
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

function updateClientStatus(id, status){
  const db = firebase.firestore();
  const updatedAt =firebase.firestore.Timestamp.now()
  return db.collection('users').doc(id).update({status, updatedAt})
  .then(()=>({id, status, updatedAt: updatedAt.toDate()}))
  .catch(error => {
    throw `Echec ${status==='enabled' ? "d'activation" : "de désactivation" } du compte client`
  });
}