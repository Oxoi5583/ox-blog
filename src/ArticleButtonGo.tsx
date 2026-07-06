import { useState } from "react";
import dataHub from "./DataHub";
import { useNavigate } from "react-router-dom";
import { buildAppRouteUrl } from "./AppRouteParameters";

interface ArticleButtonGoProps{
    p_id : number,
    p_setIsGBHovered : (arg0: any)=>void;
    p_setIsGBDown : (arg0: any)=>void;
    p_setIsGBUp : (arg0: any)=>void;

    p_isGBDown : boolean;
    p_isGBHovered : boolean;

    p_isExpanded : boolean;
};

function ArticleButtonGo({ p_id, p_setIsGBHovered, p_setIsGBDown, p_setIsGBUp, p_isGBDown, p_isGBHovered, p_isExpanded } : ArticleButtonGoProps){
    const navigate = useNavigate();

    const [aritcleCateSelected, setAritcleCateSelected] = useState(2);
    dataHub.addListener(setAritcleCateSelected, 'ARTICLE_CATE_SELECTED');

    return (
        <div
            onMouseOver={()=>{
                p_setIsGBHovered(true);
            }}
            onMouseOut={()=>{
                p_setIsGBHovered(false);
                p_setIsGBDown(false);
            }}
            onMouseDown={()=>{
                p_setIsGBDown(true);
            }}
            onMouseUp={()=>{
                p_setIsGBUp(true);
                p_setIsGBDown(false);
                navigate(buildAppRouteUrl({
                    navi: 'WRITINGS',
                    writingsMode: 'ARTICLES',
                    cateId: aritcleCateSelected,
                    articleId: p_id,
                }));
            }}
            style={{
                background: (p_isGBDown) ? '#677188' : (p_isGBHovered) ? '#51555e' : '#30333a',
                transition: '0.2s background ease',

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
            <span
                style={{
                    transition: '0.35s font-size ease',
                    
                    fontFamily: 'Rajdhani',
                    fontSize: (!p_isExpanded) ? '10px' : '32px',
                }}
            >OPEN</span>
        </div>
    )
}

export default ArticleButtonGo;
