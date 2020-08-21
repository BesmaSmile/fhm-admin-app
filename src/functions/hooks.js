import {useState} from 'react';

export const hooks = {
  useRequest
}

function useRequest(/*request, success, failure*/){
  const [pending, setPending]=useState()
  const [error, setError]=useState()

  const execute=({action, success, failure})=>{
    setPending(true)
    setError()
    action().then(result=>{
      setPending(false)
      if(success){
        success(result)
      }
    }).catch((err)=>{
      setPending(false)
      setError(err)
      if(failure)
        failure(err)
    })
  }
  /*useEffect(()=>{
    setPending(true)
    setError()
    request().then(result=>{
      setPending(false)
      if(success){
        success(result)
      }
    }).catch((err)=>{
      setPending(false)
      setError(err)
      if(failure)
        failure()
    })
  }, [])*/
  return {execute, pending, error}
}