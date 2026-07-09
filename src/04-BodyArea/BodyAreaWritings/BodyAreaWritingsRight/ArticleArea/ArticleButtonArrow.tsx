interface ArticleButtonArrowProps{
    p_isExpanded : boolean;
};

function ArticleButtonArrow({ p_isExpanded } : ArticleButtonArrowProps){
    return (
        <span className="material-symbols-outlined">
            {(p_isExpanded) ? 'arrow_drop_down' : 'arrow_right'}
        </span>
    )
}

export default ArticleButtonArrow;