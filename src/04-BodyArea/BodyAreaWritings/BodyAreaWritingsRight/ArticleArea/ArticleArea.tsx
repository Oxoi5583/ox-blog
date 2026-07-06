import { useEffect, useState } from "react";
import ArticleAreaInspector from "./ArticleAreaInspector";
import ArticleAreaHeader from "./ArticleAreaHeader";
import dataHub from "../../../../99-shared/DataHub";
import ArticleAreaContentWindow from "./ArticleAreaContentWindow";


function ArticleArea(){
    const [isAritcleHeaderHovered, setIsAritcleHeaderHovered] = useState(false);
    dataHub.addListener(setIsAritcleHeaderHovered, 'ARTICLE_HEADER_HOVERED');
    
    const [articleId, setArticleId] = useState(-1);
    dataHub.addListener(setArticleId, 'ARTICLE_ID');

    const [isArticleContentWindowOpened, setIsArticleContentWindowOpened] = useState(false);
    dataHub.addListener(setIsArticleContentWindowOpened, 'IS_ARTICLE_CONTENT_WINDOW_OPENED');
    useEffect(()=>{
        dataHub.setData('IS_ARTICLE_CONTENT_WINDOW_OPENED', (articleId != -1));
    }, [articleId])

    const rowTemplate = (isAritcleHeaderHovered) ? '50px calc(100% - 50px)' : '25px calc(100% - 25px)';

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateRows: rowTemplate,
                height: '100%',
                width: 'calc(100% - 20px)',

                margin: '10px',

                transition: '0.5s grid-template-rows ease-out'
            }}
        >
            <ArticleAreaHeader></ArticleAreaHeader>
            <div
                style={{
                    height: '100%',
                    width: '100%',

                    display: 'grid',
                    gridTemplateRows: (isArticleContentWindowOpened) ? '0px 100%' : '100% 0px',

                    transition: '0.15s grid-template-rows ease-out'
                }}
            >
                <div
                    id='ARTICLE_AREA'
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis', 
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <ArticleAreaInspector></ArticleAreaInspector>
                </div>
                <div
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis', 

                        borderTop: '1px solid black'
                    }}
                >
                    <ArticleAreaContentWindow></ArticleAreaContentWindow>
                </div>
            </div>
        </div>
    );
}

export default ArticleArea;
