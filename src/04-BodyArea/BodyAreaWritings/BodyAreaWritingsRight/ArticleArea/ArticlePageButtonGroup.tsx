import { useState } from "react";
import ArticlePageButton from "./ArticlePageButton";
import dataHub from "../../../../99-shared/DataHub";

function ArticlePageButtonGroup(){
    const [currentPage, setCurrentPages] = useState(1);
    dataHub.addListener(setCurrentPages, 'ARTICLE_CURRENT_PAGE');
    const [totalPages, setTotalPages] = useState(1);
    dataHub.addListener(setTotalPages, 'ARTICLE_TOTAL_PAGE');
    const [isAritcleHeaderHovered, setIsAritcleHeaderHovered] = useState(false);
    dataHub.addListener(setIsAritcleHeaderHovered, 'ARTICLE_HEADER_HOVERED');
    const [isArticleContentWindowOpened, setIsArticleContentWindowOpened] = useState(false);
    dataHub.addListener(setIsArticleContentWindowOpened, 'IS_ARTICLE_CONTENT_WINDOW_OPENED');

    const clamp = (val: number, min: number, max: number): number => {
        return Math.min(Math.max(val, min), max);
    };

    const pageDisplayMargin = 5;
    let displayPageList : Array<number> = [];
    for(let i = currentPage - pageDisplayMargin; i < currentPage; i++){
        if(i < 1){
            continue;
        }

        displayPageList.push(i);
    }
    for(let i = currentPage; i <= totalPages && i < (currentPage + pageDisplayMargin); i++){
        displayPageList.push(i);
    }

    const columnsTemplate = (isAritcleHeaderHovered) ? '60px calc(100% - 120px) 60px' : '30px calc(100% - 60px) 30px';

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: columnsTemplate,
                gridTemplateRows: '1fr auto',

                position: 'relative',
                right: '0',
                bottom: '0',

                width: 'auto',
                height: '100%',

                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',

                transition: '0.5s grid-template-columns ease-out',
            }}
        >
            <div></div>
            <div></div>
            <div></div>
            <div className="material-symbols-outlined"
                style={{
                }}
                onMouseUp={()=>{
                    if(!isArticleContentWindowOpened){
                        const newPage = clamp(currentPage - 1, 1, totalPages);
                        dataHub.setData('ARTICLE_CURRENT_PAGE', newPage);
                    }
                }}
            >
                {(currentPage > 1) ? 'arrow_left' : ''}
            </div>
            <div>
                {
                    displayPageList.map((p) => (
                        <ArticlePageButton p_page={p}></ArticlePageButton>
                    ))
                }
            </div>
            <div className="material-symbols-outlined"
                style={{
                }}
                onMouseUp={()=>{
                    if(!isArticleContentWindowOpened){
                        const newPage = clamp(currentPage + 1, 1, totalPages);
                        dataHub.setData('ARTICLE_CURRENT_PAGE', newPage);
                    }
                }}
            >
                {(currentPage < totalPages) ? 'arrow_right' : ''}
            </div>
        </div>
    )
}

export default ArticlePageButtonGroup;
