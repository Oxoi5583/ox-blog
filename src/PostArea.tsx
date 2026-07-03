import { useState } from "react";
import dataHub from "./DataHub";
import PostAreaPostBlock from "./PostAreaPostBlock";
import LoadingSpinner from "./LoadingSpinner";
import WordPressPostPayload from "./WordPressPostPayload";

function PostArea() {
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
    
    let allArticleIds = inspectorArticleData.filter((id : number, index : number)=>{
        return articleData.get(id)?.categories.includes(789172360);
    });

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                    height: 'auto',
                    width: '100%',
                    alignItems: 'center',

                    overflowY: 'scroll',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',

                    userSelect: 'text',

                }}
            >
                <div
                    style={{
                    display: 'flex',
                    flexDirection: 'column',
                        height: 'auto',
                        width: '500px',
                    }}
                >
                        {(isFetchingData || isFetchingTags || isFetchingTotalPages) ?
                            <LoadingSpinner></LoadingSpinner> : 
                            (allArticleIds as number[]).map((id, index, arr) => (
                            <PostAreaPostBlock p_id={id}/>
                        ))}
                    <div 
                        style={{
                            height: '100px',
                            flexGrow: '1',
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
}

export default PostArea;