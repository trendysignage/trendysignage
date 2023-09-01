import useSWR from "swr";
import {connect} from 'react-redux'
import { useLocation } from "react-router-dom";
import CommonComposition from "./Common";
import { getLayouts } from "../../../../utils/api";
import LockScreen from "../../../pages/LockScreen";

const CreateComposition = ({permission}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const { data: layouts } = useSWR("/vendor/layouts", getLayouts);
  const layout = layouts ? layouts.find((layout)=> layout._id === id) : null;
 return <>
    {
      permission && permission.permission.COMPOSITION.add ? 
      <>
      {
        layout && <CommonComposition type="create" layout={layout}/>
      }
      </> : <LockScreen message={" You don't have permission to access thisss !!! "}/>
      

    }
 </>
};
const mapStateToProps = (state) => {
  return {
      auth: state.auth.auth,
      permission : state.auth.permission
  };
};
export default connect(mapStateToProps)(CreateComposition);
