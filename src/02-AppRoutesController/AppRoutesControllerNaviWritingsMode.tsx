import { useEffect } from "react";
import dataHub from "../99-shared/DataHub";

interface AppRoutesControllerNaviWritingsModeProps{
    p_option : string;
};

function AppRoutesControllerNaviWritingsMode({ p_option } : AppRoutesControllerNaviWritingsModeProps){
    useEffect(()=>{
        dataHub.setData('WRITINGS_MODE', p_option);
    }, [p_option]);
    return (<></>);
}

export default AppRoutesControllerNaviWritingsMode
