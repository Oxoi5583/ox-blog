import { useEffect } from "react";
import dataHub from "../99-shared/DataHub";
import { useSearchParams } from "react-router-dom";

function AppRoutesControllerNaviArticle(){
    const [searchParams] = useSearchParams();
    const articleId = searchParams.get('article');

    useEffect(()=>{
        dataHub.setData('ARTICLE_ID', parseInt(articleId??'-1'));
    }, [articleId])
    return (<></>);
}

export default AppRoutesControllerNaviArticle
