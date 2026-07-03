import { useState, useTransition } from 'react';
import HeaderLogo from './HeaderLogo'
import HeaderButtons from './HeaderButtons'

function HeaderArea(){
  const [isHeadAreaExpanded, setIsHeadAreaExpanded] = useState(false);
  const [isTransition, setIstTransition] = useState(false);
  
  let isHeadAreaExpandedDone = (isHeadAreaExpanded || isTransition) ? true : false;

   return(
    <div className="head-area"
        onMouseOver={()=>{
            setIsHeadAreaExpanded(true);
            setIstTransition(true);
        }}
        onMouseOut={()=>{
            setIsHeadAreaExpanded(false);
            setIstTransition(true);
        }}
        onTransitionEnd={()=>{
            setIstTransition(false);
        }}

        style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
    >
        <HeaderLogo p_is_head_area_expanded_done={isHeadAreaExpandedDone}></HeaderLogo>
        <HeaderButtons p_is_head_area_expanded={isHeadAreaExpandedDone}></HeaderButtons>
    </div>
    );
}


export default HeaderArea;