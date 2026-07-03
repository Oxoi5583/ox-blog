import { format } from "date-fns";

interface ArticleButtonDateProps{
    p_isExpanded : boolean;
    p_date : Date;
};

function ArticleButtonDate({ p_isExpanded, p_date } : ArticleButtonDateProps){
    return (
        <div
            style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis' 
            }}
        >
            <span>{(!p_isExpanded) ? format(p_date, 'yyyy-MM-dd') : ''}</span>
        </div>
    )
}

export default ArticleButtonDate;