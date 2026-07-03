import { useNavigate } from "react-router-dom";
import { buildAppRouteUrl } from "./AppRouteParameters";

interface HeaderLogoProps{
    p_is_head_area_expanded_done : boolean;
};

function HeaderLogo({ p_is_head_area_expanded_done } : HeaderLogoProps){
    const navigate = useNavigate();
    return (
        <div className="logo-area"
            onMouseUp={()=>{
                navigate(buildAppRouteUrl({ navi: 'COVER' }));
            }}
        >
            <span>TEST</span><br/>
            <span>{(p_is_head_area_expanded_done) ? 'BLOG' : ''}</span>
        </div>
    );
}

export default HeaderLogo;
