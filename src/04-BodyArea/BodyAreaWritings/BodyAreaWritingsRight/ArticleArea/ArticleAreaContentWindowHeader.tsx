import { useState } from "react";
import dataHub from "../../../../99-shared/DataHub";
import ArticleAreaContentWindowHeaderButton from "./ArticleAreaContentWindowHeaderButton";
import { useNavigate } from "react-router-dom";
import { buildAppRouteUrl, DEFAULT_ARTICLE_CATE_ID } from "../../../../99-shared/AppRouteParameters";

function ArticleAreaContentWindowHeader(){
    const [articleContentTextSizePx, setArticleContentTextSizePx] = useState(12);
    dataHub.addListener(setArticleContentTextSizePx, 'ARTICLE_CONTENT_TEXT_SIZE_PX');
    const [articleContentTextWidthPx, setArticleContentTextWidthPx] = useState(700);
    dataHub.addListener(setArticleContentTextWidthPx, 'ARTICLE_CONTENT_TEXT_WIDTH_PX');

    const [aritcleCateSelected, setAritcleCateSelected] = useState(DEFAULT_ARTICLE_CATE_ID);
    dataHub.addListener(setAritcleCateSelected, 'ARTICLE_CATE_SELECTED');
    
    const clamp = (val: number, min: number, max: number): number => {
        return Math.min(Math.max(val, min), max);
    };

    const navigate = useNavigate();

    return (
        <div
            style={{
                height: '35px',
                border: '1px solid #eef0f7',
                
                display: 'flex',
                flex: 'row',
            }}
        >
            <div
                style={{
                    width: '50px',
                }}
            ></div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    height: '100%',
                    width: '100%',

                    alignItems: 'center',
                    marginRight: '5px',
                }}
            >
                <ArticleAreaContentWindowHeaderButton p_text="close" p_action={()=>{
                    navigate(buildAppRouteUrl({
                        navi: 'WRITINGS',
                        writingsMode: 'ARTICLES',
                        cateId: aritcleCateSelected,
                    }))
                    dataHub.setData('ARTICLE_ID', -1);
                }}/>
                <ArticleAreaContentWindowHeaderButton p_text="text_decrease" p_action={()=>{dataHub.setData('ARTICLE_CONTENT_TEXT_SIZE_PX', clamp(articleContentTextSizePx - 2, 4, 24));}}/>
                <ArticleAreaContentWindowHeaderButton p_text="text_increase" p_action={()=>{dataHub.setData('ARTICLE_CONTENT_TEXT_SIZE_PX', clamp(articleContentTextSizePx + 2, 4, 24));}}/>
                <ArticleAreaContentWindowHeaderButton p_text="zoom_in_map" p_action={()=>{dataHub.setData('ARTICLE_CONTENT_TEXT_WIDTH_PX', clamp(articleContentTextWidthPx - 50, 400, 1200));}}/>
                <ArticleAreaContentWindowHeaderButton p_text="zoom_out_map" p_action={()=>{dataHub.setData('ARTICLE_CONTENT_TEXT_WIDTH_PX', clamp(articleContentTextWidthPx + 50, 400, 1200));}}/>
            </div>
        </div>
    );
}

export default ArticleAreaContentWindowHeader;
