import { useState } from "react";
import dataHub from "../../../../99-shared/DataHub";

function PostAreaGoToTopButton() {
    const [isGoToTopHovered, setIsGoToTopHovered] = useState(false);
    const [isGoToTopPressed, setIsGoToTopPressed] = useState(false);
    const backgroundColor = isGoToTopPressed ? '#CCCCCC' : isGoToTopHovered ? '#DDDDDD' : 'white';

    return (
        <div
            onMouseEnter={() => setIsGoToTopHovered(true)}
            onMouseLeave={() => {
                setIsGoToTopHovered(false);
                setIsGoToTopPressed(false);
            }}
            onMouseDown={() => setIsGoToTopPressed(true)}
            onMouseUp={() =>{ 
                setIsGoToTopPressed(false);
                dataHub.setData('POST_GO_TOTOP', true);
            }}
            style={{
                width: isGoToTopHovered ? '50px' : '30px',
                height: '30px',
                position: 'absolute',
                left: '0',
                bottom: '20px',
                backgroundColor: backgroundColor,
                borderTopRightRadius: '15px',
                borderBottomRightRadius: '15px',
                transition: 'width 0.2s ease, background-color 0.2s ease',
                cursor: 'pointer'
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
        </div>);
}


export default PostAreaGoToTopButton;
