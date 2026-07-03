import { useState } from "react";
import { format } from 'date-fns';
import dataHub from "./DataHub";
import ArticleButtonArrow from "./ArticleButtonArrow";
import ArticleButtonMain from "./ArticleButtonMain";
import ArticleButtonDate from "./ArticleButtonDate";
import ArticleButtonInfo from "./ArticleButtonInfo";
import ArticleButtonGo from "./ArticleButtonGo";
import type WordPressPostPayload from "./WordPressPostPayload";
import useWindowDimensions from "./WindowDimensions";

interface ArticleButtonProps{
    p_id : number,
    p_data : WordPressPostPayload,
    p_tags : Map<number, string>,
}

function ArticleButton({ p_id, p_data, p_tags } : ArticleButtonProps){
    const [selectedButton, setSelectedButton] = useState(-1);
    dataHub.addListener(setSelectedButton, 'SELECTED_ARTICLE_BUTTON');

    const [isABHovered, setIsABHovered] = useState(false);
    const [isABDown, setIsABDown] = useState(false);
    const [isABUp, setIsABUp] = useState(false);

    const [isGBHovered, setIsGBHovered] = useState(false);
    const [isGBDown, setIsGBDown] = useState(false);
    const [isGBUp, setIsGBUp] = useState(false);

    let p_name = p_data.title.rendered;
    let p_date = p_data.publishedDate ?? new Date();
    let used_tags : number[] = p_data.tags;

    let isHovered = (isABHovered && ! isGBHovered);
    let bgColor = (isHovered) ? '#00000005' : '#00000000';
    bgColor = (isABDown) ? '#0000000A' : bgColor;

    let isExpanded = (selectedButton == p_id);

    
    const windowDimensions = useWindowDimensions();
    const isShowDatetime = windowDimensions.width < 1100;

    return (
        <div
            onMouseOver={()=>{
                setIsABHovered(true);
            }}
            onMouseOut={()=>{
                setIsABHovered(false);
                setIsABDown(false);
            }}
            onMouseDown={()=>{
                if(!isGBHovered){
                    setIsABDown(true);
                }
            }}
            onMouseUp={()=>{
                if(!isGBHovered){
                    setIsABDown(false);
                    setIsABUp(true);
                    if(selectedButton == p_id){
                        dataHub.setData('SELECTED_ARTICLE_BUTTON', -1);
                    }else{
                        dataHub.setData('SELECTED_ARTICLE_BUTTON', p_id);
                    }
                }
            }}
        
            style={{
                position: 'relative',
                height: '50px',
                width: '80%',
                transition: 'padding 0.2s ease',
                paddingTop: (isExpanded) ? '15px' : '0px',
                paddingLeft: (isExpanded) ? '15px' : '0px',
                paddingBottom: (isExpanded) ? '185px' : '0px',
                zIndex: '1',
            }}
            >
            <div
                style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: (isExpanded) ? '20px calc(100% - 120px) 0px 100px' : (isShowDatetime) ? '20px calc(100% - 70px) 0px 50px' : '20px calc(85% - 23px) calc(15% - 23px) 26px',

                    border: '1px solid #e7e9f0',

                    backgroundColor: bgColor,

                    transition: '0.5s grid-template-columns ease, 0.3s background ease',

                    fontSize: '12px',
                    height: '100%',
                    width: '100%',
                    zIndex: '1',
                }}
            >
                <ArticleButtonArrow p_isExpanded={isExpanded}></ArticleButtonArrow>
                <ArticleButtonMain p_id={p_id} p_name={p_name}></ArticleButtonMain>
                <ArticleButtonDate p_isExpanded={isExpanded} p_date={p_date}></ArticleButtonDate>
                <ArticleButtonGo p_id={p_id} p_setIsGBHovered={setIsGBHovered} p_setIsGBDown={setIsGBDown} p_setIsGBUp={setIsGBUp} p_isGBDown={isGBDown} p_isGBHovered={isGBHovered} p_isExpanded={isExpanded}></ArticleButtonGo>
            </div>
            <ArticleButtonInfo p_isExpanded={isExpanded} p_tags={p_tags} p_used_tags={used_tags} p_data={p_data} p_date={p_date}></ArticleButtonInfo>
        </div>
    );
}

export default ArticleButton;