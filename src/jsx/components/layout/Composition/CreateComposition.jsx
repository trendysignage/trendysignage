import useSWR from "swr";
import { useLocation } from "react-router-dom";
import CommonComposition from "./Common";
import { getLayouts, permission } from "../../../../utils/api";
import LockScreen from "../../../pages/LockScreen";

const CreateComposition = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const { data: layouts } = useSWR("/vendor/layouts", getLayouts);
  const layout = layouts ? layouts.find((layout)=> layout._id === id) : null;
 return <>
    {
      permission && permission.add ? 
      <>
      {
        layout && <CommonComposition type="create" layout={layout}/>
      }
      </> : <LockScreen message={" You don't have permission to access this !!! "}/>
      

    }
 </>
};

export default CreateComposition;
