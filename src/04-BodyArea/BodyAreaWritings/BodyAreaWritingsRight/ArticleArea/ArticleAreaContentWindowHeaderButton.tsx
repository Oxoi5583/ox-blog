import { useState } from "react";
import dataHub from "../../../../99-shared/DataHub";

interface ArticleAreaContentWindowHeaderButtonProps{
    p_text : string;
    p_action : ()=>void;
};

function ArticleAreaContentWindowHeaderButton({ p_text, p_action } : ArticleAreaContentWindowHeaderButtonProps){
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isButtonDown, setIsButtonDown] = useState(false);
    const [isButtonUp, setIsButtonUp] = useState(false);
    return(
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    height: '70%',
                    width: '24px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',

                    padding: '0',
                    margin: '0',
                    marginLeft: '3px',
                    marginRight: '3px',


                    borderRadius: '50%',

                    background: (isButtonDown) ? '#777a81' : (isButtonHovered) ? '#5b5e66' : '#30333a',

                    transition: '0.2s background ease',

                    fontSize: '16px',

                    color: 'white'
                }}

                onMouseOver={()=>{
                    setIsButtonHovered(true);
                }}
                onMouseOut={()=>{
                    setIsButtonHovered(false);
                    setIsButtonDown(false);
                }}
                onMouseDown={()=>{
                    setIsButtonDown(true);
                }}
                onMouseUp={()=>{
                    setIsButtonUp(true);
                    setIsButtonDown(false);

                    p_action();
                }}
            >
                <span className="material-symbols-outlined"
                style={{
                    fontSize: '16px',
                }}
                >{p_text}</span>
            </div>
        </>
    );
}

export default ArticleAreaContentWindowHeaderButton;
