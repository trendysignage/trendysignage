import useSWR from "swr";
import { useLocation } from "react-router-dom";
import CommonComposition from "./Common";
import { getLayouts } from "../../../../utils/api";

const CreateComposition = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const { data: layouts } = useSWR("/vendor/layouts", getLayouts);
  const layout = layouts ? layouts.find((layout)=> layout._id === id) : null;
 return <>{layout && <CommonComposition type="create" layout={layout}/>}</>
};

export default CreateComposition;
