import { useQuery } from "react-query";
import request from './request';
import {ReactQueryDevtools} from 'react-query/devtools';
function App(){
  const {data,isLoading,isError} = useQuery('users',()=>{
    return request.get('/users') 
  }); 

  if(isLoading) return <div>Loading...</div>

  if(isError) return <div>Error</div>
  
  return <>
  <ul>
     {
      data?.map((user:any)=><li key={user.id}>{user.name}</li>)
     }
  </ul>
  <ReactQueryDevtools initialIsOpen={true} />
  </>
}

export default App;
