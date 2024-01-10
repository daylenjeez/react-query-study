import { useQuery,QueryObserver, useQueryClient } from "react-query";
import request from './request';
import { useState } from "react";
import { ReactQueryDevtools } from 'react-query/devtools';
import { useEffect } from "react";

function useUsers(){
  return useQuery('users',()=>request.get('/users'),{
    staleTime:Infinity
  });
}

function Users(){
  // const {data,isLoading,isError} = useQuery(queryKey,()=>{//同一个key 会使用缓存数据
  //   return request.get('/users') 
  // },{
  //   refetchOnWindowFocus:false,//失去焦点不重新请求
  //   refetchOnReconnect:false,//断网不重新请求
  //   staleTime:Infinity,//过期时间
  //   cacheTime:5000,//缓存时间
  //   //refetchInterval:5000,//轮询时间 
  // }); 

  const {data,isLoading,isError} = useUsers();

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

function Status(){
  // const {data} = useUsers();

  //也可以这么写
  const queryClient = useQueryClient();
  const [data,setData]= useState();

  useEffect(()=>{
    const observer = new QueryObserver(queryClient,{
      queryKey:['users']
    });
    observer.subscribe(result=>setData(result.data));
    return ()=>{
      observer.destroy();
    }
  },[queryClient]);
  return <div>共计{data?.length}条数</div>
}
function App(){
  // const [showUsers,setShowUsers] = useState(false);

  // const handleClick = ()=>{
  //   setShowUsers(!showUsers);
  // }

  return <>
  {/* <button onClick={handleClick}>click</button> */}
  {/* {showUsers &&<Users />} */}
  <Users  />
  <Status />
  {/* <Users  /> */}
  <ReactQueryDevtools initialIsOpen={false} />
  </>
}

export default App;
