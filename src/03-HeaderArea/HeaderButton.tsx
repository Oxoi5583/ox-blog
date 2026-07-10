import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildAppRouteUrl } from "../99-shared/AppRouteParameters";
import '../01-App/App.css'

interface ButtonProp{
    p_is_header_expended : boolean;
    p_icon : string;
    p_text : string;
};

function HeaderButton({p_is_header_expended, p_icon, p_text}: ButtonProp){
    const [isHovered, setIsHovered] = useState(false);
    const divRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    let icon_size = (isHovered) ? '50px' : '20px'
    icon_size = (p_is_header_expended && !isHovered) ? '24px' : icon_size;
        
    useEffect(() => {
        if(divRef.current){
            divRef.current.style.setProperty('--head-button-content', `"${p_text.replace('_', ' ')}"`);
        }
    });

    return (
        <div 
            className="head-button"
            ref={divRef}
            onMouseOver={()=>{setIsHovered(true)}}
            onMouseOut={()=>{setIsHovered(false)}}
            onMouseUp={()=>{
                navigate(buildAppRouteUrl({ navi: p_text }));
            }}
        >
            <span className="material-symbols-outlined"
                style={{
                    fontSize: icon_size,
                    transition: 'font-size 1.25s ease',
                }}
            >{p_icon}</span>
        </div>
    );
}

export default HeaderButton;
