import { format } from "date-fns";

interface ArticleButtonInfoProps{
    p_isExpanded : boolean;
    p_data : any;
    p_date : Date;
    p_used_tags : any;
    p_tags : any;
};

function ArticleButtonInfo({ p_isExpanded, p_data, p_date, p_used_tags, p_tags } : ArticleButtonInfoProps){
    return (
        <div
            style={{
                height: '150px',
                zIndex: '9',
                transition: 'transform 0.2s ease',
                transformOrigin: 'top',
                transform: (p_isExpanded) ? 'scaleY(1) translate(10px)' : 'scaleY(0) translate(10px)',
                
                padding: '5px',

                fontSize: '12px',
                lineHeight: '1.6',
                textAlign: 'left',

                overflow: 'hidden',
                border: '1px solid #e7e9f0',
                background: '#FFFFFF',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateRows: '25% 75%',
                    height: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'normal',
                    textOverflow: 'ellipsis',
                }}
            >
                <div>
                    <span>{`Written At: ${format(p_date, 'yyyy-MM-dd HH:mm:SS')}`}</span><br/>
                    <span>{`Tags: ${p_used_tags.map((tagId: any) => p_tags.get(tagId.toString())).join(",")}`}</span>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: `Excerpt: ${p_data['excerpt']['rendered']}`
                    }}
                ></div>
            </div>
        </div>
    )
}

export default ArticleButtonInfo;