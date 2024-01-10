import { useQuery } from "react-query";
import request from './request';
import { useState } from "react";
import { ReactQueryDevtools } from 'react-query/devtools'

function Users(){
  const {data,isLoading,isError} = useQuery('users',()=>{
    return request.get('/users') 
  },{
    refetchOnWindowFocus:false,//失去焦点不重新请求
    refetchOnReconnect:false,//断网不重新请求
    staleTime:Infinity,//过期时间
    cacheTime:5000,//缓存时间
    //refetchInterval:5000,//轮询时间 
  }); 

  if(isLoading) return <div>Loading...</div>

  if(isError) return <div>Error</div>
  
  return ( 
    <ul>
     {
      data?.map((user:any)=><li key={user.id}>{user.name}</li>)
     }
  </ul>
  )
}
function App(){
  const [showUsers,setShowUsers] = useState(false);

  const handleClick = ()=>{
    setShowUsers(!showUsers);
  }

  return <>
  <button onClick={handleClick}>click</button>
  {showUsers &&<Users />}
  <ReactQueryDevtools initialIsOpen={false} />
  </>
}

export default App;
