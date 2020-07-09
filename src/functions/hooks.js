import {useState, useEffect} from 'react';

export const hooks = {
  useRequest
}

function useRequest(request, success, failure){
  const [pending, setPending]=useState()
  const [error, setError]=useState()

  useEffect(()=>{
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
  }, [])
  return {pending, error}
}