import { useEffect, useRef } from "react";
import dataHub from "./DataHub";
import wpSnapshot from "./generated/wpSnapshot.json";
import WordPressPostPayload from "./WordPressPostPayload";

function AppDataCollector(){
    const isMounted = useRef(false);
    useEffect(() => {
        if(isMounted.current){
            return;
        }
        isMounted.current = true;

        const inspectorDataBuf = new Array<number>();
        const articleDataBuf = new Map<number, WordPressPostPayload>();

        wpSnapshot.posts.forEach((row) => {
            const payload = new WordPressPostPayload(row);
            inspectorDataBuf.push(payload.id);
            articleDataBuf.set(payload.id, payload);
        });

        const tagMapping = new Map<number, string>();
        wpSnapshot.tags.forEach((tag) => {
            tagMapping.set(Number(tag.id), tag.name ?? "");
        });

        const cateMapping = new Map<number, string>();
        wpSnapshot.categories.forEach((cate) => {
            cateMapping.set(Number(cate.id), cate.name ?? "");
        });

        dataHub.setData('ARTICLE_TOTAL_PAGE', Math.ceil(inspectorDataBuf.length / wpSnapshot.appPageSize));
        dataHub.setData('ARTICLE_INSPECTOR_DATA', inspectorDataBuf);
        dataHub.setData('ARTICLE_DATA', articleDataBuf);
        dataHub.setData('ARTICLE_TAGS', tagMapping);
        dataHub.setData('ARTICLE_CATES', cateMapping);

        dataHub.setData('DATA_LOADER_IS_FETCHING_TOTAL_PAGES', false);
        dataHub.setData('DATA_LOADER_IS_FETCHING_ARTICLE_DATA', false);
        dataHub.setData('DATA_LOADER_IS_FETCHING_ARTICLE_TAGS', false);
        dataHub.setData('DATA_LOADER_IS_FETCHING_ARTICLE_CATES', false);
    }, []);

    return(<div style={{display:'none'}}></div>);
}

export default AppDataCollector;
