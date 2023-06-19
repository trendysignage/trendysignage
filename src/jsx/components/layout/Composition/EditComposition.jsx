import { useLocation } from "react-router-dom";
import useSWR from 'swr'
import CommonComposition from "./Common";
import { getCompositionById } from "../../../../utils/api";
import { useEffect, useState } from "react";

const EditComposition = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  // const { data: composition , mutate , error} = useSWR(id ? `/vendor/layouts/composition?compositionId=${id}` : null, fetcher);
  const [composition,setComposition] = useState(null)
  const layout = composition ? composition.layout : {};


  // Example useEffect for triggering SWR mutate on route change
  const getData = async ()=>{
    const data  =await getCompositionById(`/vendor/layouts/composition?compositionId=${id}`)
    setComposition(data)
  }
  useEffect(() => {
    if(id){
      getData()
      
    }
  }, [id]);

  return (<>{composition && <CommonComposition type="edit" layout={layout} composition={composition}/>}</>)
};

export default EditComposition;
