import { useEffect } from "react";
import dataHub from "../99-shared/DataHub";

interface AppRoutesControllerNaviProps{
    p_option : string;
};

function AppRoutesControllerNavi({ p_option } : AppRoutesControllerNaviProps){
    useEffect(()=>{
        dataHub.setData('NAVI', p_option);
    }, [p_option])
    return (<></>);
}

export default AppRoutesControllerNavi
