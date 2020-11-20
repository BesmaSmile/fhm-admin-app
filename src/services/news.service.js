/* eslint-disable no-throw-literal */

import {firebase} from './firebase';
import {storageService} from './storage.service';

export const newsService={
  getNews,
  addNews
}

function getNews(){
  const db = firebase.firestore();
  return db.collection("news").get()
  .then(async (result)=> {
    const news= []
    result.forEach(async ne=>{
      const neData=ne.data()
      news.push({
        ...neData,
        createdAt : neData.createdAt && neData.createdAt.toDate(),
        id : ne.id
      })
    })
    return news.sort((n1,n2)=>n2.createdAt-n1.createdAt);
  })
  .catch(error=>{
    console.log(error);
    throw Error('Echec de chargement de la liste des nouveautés !')
  });
}

async function addNews(news, pictureFile){
  const collectionRef = firebase.firestore().collection('news');
  const createdAt = firebase.firestore.Timestamp.now()
  const newsRef = await collectionRef.add({...news, createdAt})
  .catch(err=>{
    console.log(err);
    throw {message : "Echec d'enregistrement de la nouveaté" };
  })
  //const {id}=result

  if(pictureFile){
    const path=`news/${newsRef.id}`
    await storageService.uploadFile(path, pictureFile) 
    .catch(err=>{
      console.log(err);
      throw {message : "Echec de chargement de l'image. Réassayer !", pictureUploadFailed:true, path }
    })
  }
  return {
    ...news,
    createdAt: createdAt.toDate(),
    id : newsRef.id, 
    image : newsRef.id
  }
}