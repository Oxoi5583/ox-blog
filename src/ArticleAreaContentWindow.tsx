import { useState } from "react";
import dataHub from "./DataHub";
import ArticleAreaContentWindowHeader from "./ArticleAreaContentWindowHeader";
import WordPressPostPayload from "./WordPressPostPayload";

function ArticleAreaContentWindow(){
    const [articleData, setArticleData] = useState(new Map<number, WordPressPostPayload>());
    dataHub.addListener(setArticleData, 'ARTICLE_DATA');
    const [articleContentTextSizePx, setArticleContentTextSizePx] = useState(12);
    dataHub.addListener(setArticleContentTextSizePx, 'ARTICLE_CONTENT_TEXT_SIZE_PX');
    const [articleContentTextWidthPx, setArticleContentTextWidthPx] = useState(700);
    dataHub.addListener(setArticleContentTextWidthPx, 'ARTICLE_CONTENT_TEXT_WIDTH_PX');
    
    const [articleId, setArticleId] = useState(-1);
    dataHub.addListener(setArticleId, 'ARTICLE_ID');


    const article = articleData.get(articleId);
    const title = article?.title.rendered ?? '';
    const content = article?.content.rendered ?? '';


    const contentFontS = articleContentTextSizePx.toString() + 'px';
    const titleFontS = (articleContentTextSizePx + 10).toString() + 'px';
    const width = articleContentTextWidthPx.toString() + 'px';

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',

                width: '100%',
            }}
        >
            <ArticleAreaContentWindowHeader></ArticleAreaContentWindowHeader>
            <div
                style={{
                    height: '100dvh',
                    overflowY: 'auto',
                    scrollbarWidth : 'none',

                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    alignItems: 'center',

                    userSelect: 'text',
                }}
            >   
                <div
                    style={{
                        width: width,
                        maxWidth: 'calc(100%)',
                        marginTop: '10px',
                        marginBottom: '25px',

                    }}
                >
                    <div
                        style={{
                            display: 'flow-root',
                            textAlign: 'left',
                            textWrap: 'pretty',
                            flex: '1',

                            fontSize: titleFontS,
                        }}
                        dangerouslySetInnerHTML={{ __html: title }} 
                    >
                    </div>
                    <span
                        style={{
                            display: 'block',
                            height: '30px',
                        }}
                    />
                    <div>
                        <div 
                            style={{
                                display: 'flow-root',
                                textAlign: 'left',
                                textWrap: 'pretty',
                                boxSizing: 'border-box',

                                height: 'auto',
                                width: width,
                                maxWidth: 'calc(100%)',
                                whiteSpace: 'normal',
                                wordBreak: 'break-all',

                                fontSize: contentFontS,
                            }}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                        <div
                            style={{
                                display: 'flow-root',
                                textAlign: 'left',
                                textWrap: 'pretty',

                                height: '150px',
                                width: width,
                                maxWidth: 'calc(100%)',
                                whiteSpace: 'normal',
                                wordBreak: 'break-all',

                                fontSize: contentFontS,

                                borderTop: '1px solid #eef0f7',
                                
                                padding: '50px'
                            }}
                        >
                            <span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleAreaContentWindow;
