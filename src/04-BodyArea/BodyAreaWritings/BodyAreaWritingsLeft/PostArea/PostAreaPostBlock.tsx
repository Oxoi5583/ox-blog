import { useState } from "react";
import dataHub from "../../../../99-shared/DataHub";
import { format } from 'date-fns';
import WordPressPostPayload from "../../../../99-shared/WordPressPostPayload";

interface PostAreaPostBlockProps{
    p_id : number
};

function PostAreaPostBlock({ p_id } : PostAreaPostBlockProps) {
    const [articleData, setArticleData] = useState(new Map<number, WordPressPostPayload>());
    dataHub.addListener(setArticleData, 'ARTICLE_DATA');

    const data : WordPressPostPayload = articleData.get(p_id)??new WordPressPostPayload();

    const defualtDate = new Date('1999-01-01');
    const publishedDate = format(articleData.get(p_id)?.publishedDate??defualtDate, 'yyyy-MM-dd HH:mm:ss');

    const authorId = data.embedded.author[0]?.id;
    const authorName = data.embedded.author[0]?.name;
    const authorAvatarUrl = data.embedded.author[0]?.avatarUrls;
    const authorEmail = data.embedded.author[0]?.description;
    const authorUrl = data.embedded.author[0]?.url;

    const content = data.content.rendered;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                width: '100%',
                alignItems: 'center',
                overflow: 'hidden',

                padding: '15px',
                margin: '15px',

                border: '1px solid black',
                fontFamily: 'Zen Maru Gothic',

                borderRadius: '5px',

                boxShadow: '10px 10px 5px 5px #00000025',

                background: 'white',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        userSelect: 'none',

                        paddingTop: '10px',
                        paddingBottom: '10px',

                        background: '#00000005',

                        border: '1px solid #00000055',
                        borderRadius: '25px',
                    }}
                >
                    <a href={authorAvatarUrl?.size96}>
                        <img 
                            style={{
                                marginLeft: '15px',
                                marginRight: '15px',
                                borderRadius: '50%'
                            }}
                            src={authorAvatarUrl?.size24}
                        >
                        </img>
                    </a>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            fontSize: '16px',
                            lineHeight: '1.2',
                        }}
                    >
                        <div>
                            {authorName}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                fontSize: '12px',
                            }}
                        >
                            <div>
                                <span>{'['}</span>
                                <span>{authorEmail}</span>
                                <span>{']'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column-reverse',

                        height: '100%',
                        width: '450px',

                        padding: '15px',

                        alignItems: 'end',
                        userSelect: 'none',

                        fontSize: '13px'
                    }}
                >
                    <div
                        style={{    
                            display: 'flex',
                            flexDirection: 'column-reverse',
                        }}
                    >
                        {publishedDate}
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'calc(100% - 15px - 15px)',
                    alignItems: 'start',
                    alignContent: 'start',
                    justifyContent: 'start',
                    textAlign: 'left',

                    margin: '15px',
                    marginTop: '25px',
                    padding: '15px',
                    paddingTop: '25px',

                    fontSize: '12px',

                    border: '1px solid black'
                }}
            >
                <div
                    dangerouslySetInnerHTML={{__html: content}}
                />
            </div>
        </div>
    );
}

export default PostAreaPostBlock;
