import { useEffect } from "react";
import dataHub from "../99-shared/DataHub";
import { useSearchParams } from "react-router-dom";

function AppRoutesControllerNaviCate(){
    const [searchParams] = useSearchParams();
    const cateId = searchParams.get('cate');

    useEffect(()=>{
        dataHub.setData('ARTICLE_CATE_SELECTED', parseInt(cateId??'-1'));
    }, [cateId])
    return (<></>);
}

export default AppRoutesControllerNaviCate
