import HeaderButton from "./HeaderButton"

interface HeaderButtonsProps{
    p_is_head_area_expanded : boolean;
};

function HeaderButtons({p_is_head_area_expanded} : HeaderButtonsProps){
    return (<div className="head-buttons"
        style={{
            zIndex: '15'
        }}
    >
        <HeaderButton p_is_header_expended={p_is_head_area_expanded} p_icon={'person_book'} p_text={'ABOUT_ME'}></HeaderButton>
        <HeaderButton p_is_header_expended={p_is_head_area_expanded} p_icon={'post'} p_text={'WRITINGS'}></HeaderButton>
        <HeaderButton p_is_header_expended={p_is_head_area_expanded} p_icon={'timeline'} p_text={'TIMELINE'}></HeaderButton>
        <HeaderButton p_is_header_expended={p_is_head_area_expanded} p_icon={'build_circle'} p_text={'DEVELOP'}></HeaderButton>
    </div>);
}

export default HeaderButtons