import { useState, useEffect, useReducer, useRef } from 'react';
import ArticlePageButtonGroup from './ArticlePageButtonGroup';
import ArticleAreaHeaderTab from './ArticleAreaHeaderTab';
import dataHub from '../../../../99-shared/DataHub' 
import useWindowDimensions from '../../../../99-shared/WindowDimensions';
import { DEFAULT_POST_CATE_ID } from '../../../../99-shared/AppRouteParameters'

function ArticleAreaHeader(){
    const [isAritcleHeaderHovered, setIsAritcleHeaderHovered] = useState(false);
    dataHub.addListener(setIsAritcleHeaderHovered, 'ARTICLE_HEADER_HOVERED');
    const [isArticleContentWindowOpened, setIsArticleContentWindowOpened] = useState(false);
    dataHub.addListener(setIsArticleContentWindowOpened, 'IS_ARTICLE_CONTENT_WINDOW_OPENED');
    const [cates, setCates] = useState(new Map<number, string>());
    dataHub.addListener(setCates, 'ARTICLE_CATES');

    const headerFontSize = (isAritcleHeaderHovered) ? '32px' : '25px';

    const windowDimensions = useWindowDimensions();
    const isShowTab = windowDimensions.width < 1100;

    return (
        <>
            <div
                onMouseOver={()=>{
                    if(!isArticleContentWindowOpened){
                        dataHub.setData('ARTICLE_HEADER_HOVERED', true);
                    }
                }}

                onMouseOut={()=>{
                    dataHub.setData('ARTICLE_HEADER_HOVERED', false);
                }}

                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderBottom: '3px solid #4f5566'
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: '350px',
                        overflow: 'hidden'
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Rajdhani'",

                            height: '100%',

                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            textAlign: 'left',
                            fontSize: headerFontSize,

                            transition: '0.5s font-size ease-out',

                            marginBottom: '0',
                            paddingBottom: '0',
                            marginTop: 'auto'
                        }}
                    >Articles</span>
                </div>
                <div
                    style={{
                        height: '100%',
                        width: '30px',
                    }}
                ></div>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    {
                        Array.from(cates.keys()).sort((id_1, id_2)=>{
                            let name_1 = cates.get(id_1)??'1';
                            let name_2 = cates.get(id_2)??'1';
                            return (name_1 > name_2) ? 1 : -1; 
                        }).filter((id : number, index : number)=>{
                            return id != DEFAULT_POST_CATE_ID && !isShowTab;
                        }).map((id : number)=>(
                            <ArticleAreaHeaderTab p_id={id} p_text={cates.get(id) ?? '?嗡?'}/>
                        ))
                    }
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <ArticlePageButtonGroup></ArticlePageButtonGroup>
                </div>
            </div>
        </>
    );
}

export default ArticleAreaHeader;
