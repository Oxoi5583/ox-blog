import { useState } from "react";
import dataHub from "./DataHub";

interface ArticlePageButtonProps{
    p_page : number,
};

function ArticlePageButton({ p_page } : ArticlePageButtonProps){
    const [currentPage, setCurrentPages] = useState(1);
    dataHub.addListener(setCurrentPages, 'ARTICLE_CURRENT_PAGE');
    const [, setTotalPages] = useState(1);
    dataHub.addListener(setTotalPages, 'ARTICLE_TOTAL_PAGE');
    const [isAritcleHeaderHovered, setIsAritcleHeaderHovered] = useState(false);
    dataHub.addListener(setIsAritcleHeaderHovered, 'ARTICLE_HEADER_HOVERED');
    const [isArticleContentWindowOpened, setIsArticleContentWindowOpened] = useState(false);
    dataHub.addListener(setIsArticleContentWindowOpened, 'IS_ARTICLE_CONTENT_WINDOW_OPENED');

    const textSize = (isAritcleHeaderHovered) ? '20px' : '10px'; 
    const selectedTextSize = (isAritcleHeaderHovered) ? '25px' : '12px'; 

    return (
        <span
            onMouseUp={()=>{
                if(!isArticleContentWindowOpened){
                    dataHub.setData('ARTICLE_CURRENT_PAGE', p_page);
                }
            }}

            style={{
                marginLeft: '5px',
                marginRight: '5px',
                fontSize: (p_page == currentPage) ? selectedTextSize : textSize,

                transition: '0.5s font-size ease'
            }}
        >{p_page}</span>
    )
}

export default ArticlePageButton;
