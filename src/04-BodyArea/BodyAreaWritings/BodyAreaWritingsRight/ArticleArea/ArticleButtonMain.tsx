interface ArticleButtonMainProps{
    p_name : string;
    p_id : number;
};

function ArticleButtonMain({ p_name, p_id } : ArticleButtonMainProps){
    return (
        <div
            style={{
                borderRight: '1px solid #e7e9f0',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis' 
            }}

            dangerouslySetInnerHTML={{ __html: `${p_name} [${p_id}]` }}
        ></div>
    )
}

export default ArticleButtonMain;