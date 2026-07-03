import { useState } from "react";
import dataHub from "./DataHub";
import { useNavigate } from "react-router-dom";
import { buildAppRouteUrl } from "./AppRouteParameters";

interface ArticleAreaHeaderTabProps{
    p_id : number,
    p_text : string,
};

function ArticleAreaHeaderTab({ p_id ,p_text } : ArticleAreaHeaderTabProps){
    const [isAritcleHeaderHovered, setIsAritcleHeaderHovered] = useState(false);
    dataHub.addListener(setIsAritcleHeaderHovered, 'ARTICLE_HEADER_HOVERED');
    const [aritcleCateSelected, setAritcleCateSelected] = useState(788875233);
    dataHub.addListener(setAritcleCateSelected, 'ARTICLE_CATE_SELECTED');
    const [isHTHovered, setIsHTHovered] = useState(false);
    const [isHTDown, setIsHTDown] = useState(false);
    const [articleId, setArticleId] = useState(-1);
    dataHub.addListener(setArticleId, 'ARTICLE_ID');
    const [isArticleContentWindowOpened, setIsArticleContentWindowOpened] = useState(false);
    dataHub.addListener(setIsArticleContentWindowOpened, 'IS_ARTICLE_CONTENT_WINDOW_OPENED');

    const selected = (p_id == aritcleCateSelected);

    const navigate = useNavigate();

    return (
        <div
            onMouseOver={()=>{
                if(!isArticleContentWindowOpened && (articleId == -1)){
                    setIsHTHovered(true);
                }
            }}
            onMouseOut={()=>{
                if(!isArticleContentWindowOpened && (articleId == -1)){
                    setIsHTHovered(false);
                    setIsHTDown(false);
                }
            }}
            onMouseDown={()=>{
                if(!isArticleContentWindowOpened && (articleId == -1)){
                    setIsHTDown(true);
                }
            }}
            onMouseUp={()=>{
                if(!isArticleContentWindowOpened && (articleId == -1)){
                    setIsHTDown(false);
                    navigate(buildAppRouteUrl({
                        navi: 'WRITINGS',
                        writingsMode: 'ARTICLES',
                        cateId: p_id,
                    }));
                    dataHub.setData('ARTICLE_CATE_SELECTED', p_id);
                    dataHub.setData('ARTICLE_CURRENT_PAGE', 1);
                }
            }}
            style={{
                background: (isHTDown) ? '#677188' : (isHTHovered) ? '#51555e' : '#30333a',
                transition: '0.2s background ease, 0.35s height ease, 0.35s width ease',

                height: (isAritcleHeaderHovered) ? (isHTHovered) ? (selected) ? '80%' : '65%' : (selected) ? '70%' : '50%' : (selected) ? '100%' : '40%',
                width: '100px',
                marginTop: 'auto',
                marginLeft: '3px',
                marginRight: '3px',
                borderTopLeftRadius: '25%',
                borderTopRightRadius: '25%',

                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis', 

                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                color: 'white',
            }}
        >
            <div
                style={{
                    marginTop: 'auto',
                }}
            >
                <span
                    style={{
                        transition: '0.35s font-size ease',
                        fontFamily: 'DelaGothicOne-Regular',
                        marginTop: 'auto',
                        fontSize: (isAritcleHeaderHovered) ? (isHTHovered) ? (selected) ? '20px' : '18px' : (selected) ? '16px' : '13px' : '9px',
                    }}
                >{p_text}</span>
            </div>
        </div>
    )
}

export default ArticleAreaHeaderTab;
