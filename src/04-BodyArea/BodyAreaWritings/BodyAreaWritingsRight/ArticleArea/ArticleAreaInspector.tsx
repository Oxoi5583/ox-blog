import { useState, useEffect, useReducer, useRef, useLayoutEffect } from 'react';

import LoadingSpinner from '../../../../99-shared/LoadingSpinner';
import AritcleButton from './ArticleButton';
import dataHub from '../../../../99-shared/DataHub'
import WordPressPostPayload from '../../../../99-shared/WordPressPostPayload';
import useWindowDimensions from '../../../../99-shared/WindowDimensions';
import Spacer from '../../../../99-shared/Spacer';
import { buildAppRouteUrl, DEFAULT_ARTICLE_CATE_ID, DEFAULT_POST_CATE_ID } from "../../../../99-shared/AppRouteParameters";

function ArticleAreaInspector(){
    const [currentPage, setCurrentPages] = useState(1);
    dataHub.addListener(setCurrentPages, 'ARTICLE_CURRENT_PAGE');
    const [inspectorArticleData, setInspectorArticleData] = useState(new Array<number>());
    dataHub.addListener(setInspectorArticleData, 'ARTICLE_INSPECTOR_DATA');
    const [articleData, setArticleData] = useState(new Map<number, WordPressPostPayload>());
    dataHub.addListener(setArticleData, 'ARTICLE_DATA');
    
    const [tags, setTags] = useState(new Map<number, string>());
    dataHub.addListener(setTags, 'ARTICLE_TAGS');
    const [isFetchingTotalPages, setIsFetchingTotalPages] = useState(false);
    dataHub.addListener(setIsFetchingTotalPages, 'DATA_LOADER_IS_FETCHING_TOTAL_PAGES');
    const [isFetchingData, setIsFetchingData] = useState(false);
    dataHub.addListener(setIsFetchingData, 'DATA_LOADER_IS_FETCHING_ARTICLE_DATA');
    const [isFetchingTags, setIsFetchingTags] = useState(false);
    dataHub.addListener(setIsFetchingTags, 'DATA_LOADER_IS_FETCHING_ARTICLE_TAGS');
    const [isFetchingCates, setIsFetchingCates] = useState(false);
    dataHub.addListener(setIsFetchingCates, 'DATA_LOADER_IS_FETCHING_ARTICLE_CATES');

    const [aritcleCateSelected, setAritcleCateSelected] = useState(DEFAULT_ARTICLE_CATE_ID);
    dataHub.addListener(setAritcleCateSelected, 'ARTICLE_CATE_SELECTED');

    const pageSize : number = 12;
    let pageStartIndex : number = 1;
    let pageEndIndex : number = pageStartIndex + pageSize - 1;

    pageStartIndex = pageStartIndex + (pageSize * (currentPage - 1)) - 1;
    pageEndIndex = pageEndIndex + (pageSize * (currentPage - 1)) - 1;

    let allArticleIds = inspectorArticleData.filter((id : number, index : number)=>{
        return articleData.get(id)?.categories.includes(aritcleCateSelected)
        && !articleData.get(id)?.categories.includes(DEFAULT_POST_CATE_ID)
    });

    dataHub.setData('ARTICLE_TOTAL_PAGE', Math.ceil(allArticleIds.length / pageSize));

    let usedArticleIds = allArticleIds.filter((id : number, index : number)=>{
        return index >= pageStartIndex && index <= pageEndIndex;
    })

    return (
        <div
            id='ARTICLE_AREA_INSPECTOR'
            style={{
                display: 'flex',
                flexDirection: 'column',

                height: '100vh',
                minHeight: '0',
                overflowY: 'auto',
            }}
        >
            {(isFetchingData || isFetchingTags || isFetchingTotalPages) ?
                <LoadingSpinner></LoadingSpinner> : 
                (usedArticleIds as number[]).map((id, index, arr) => (
                    <AritcleButton p_id={id} p_data={articleData.get(id) ?? new WordPressPostPayload()} p_tags={tags}></AritcleButton>
            ))}
            <Spacer p_size={'125px'} p_axis='V' />
        </div>
    );
}

export default ArticleAreaInspector;
