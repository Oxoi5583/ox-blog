import { useState } from "react";

export class Direction{
    static LEFT = 1;
    static RIGHT = 2;
}

interface BodyAreaGoToProps{
    p_direction : number;
};

export function BodyAreaGoTo({p_direction}: BodyAreaGoToProps){
    const [isHovered, setIsHovered] = useState(false);
    const [isDown, setIsDown] = useState(false);
    const [isUp, setIsUp] = useState(false);

    let color = (isHovered) ? '#eeeeee': '#ffffff';
    color = (isDown)? '#bbbbbb': color;

    let left_border = (p_direction == Direction.RIGHT) ? '#eeeeee' : '#eeeeee00';
    let right_border = (p_direction == Direction.LEFT) ? '#eeeeee' : '#eeeeee00';

    return (<div
        onMouseUp={()=>{
            setIsDown(false);
            setIsUp(true);
        }}

        onMouseDown={()=>{
            setIsDown(true);
            setIsUp(false);
        }}

        onMouseOver={()=>{
            setIsHovered(true);
        }}

        onMouseOut={()=>{
            setIsUp(false);
            setIsDown(false);
            setIsHovered(false);
        }}

        style={{
            display: 'grid',
            gridTemplateRows: '10px calc(100% - 10px)',
            
            height: '100%',
            width: '100%',

            background: color,
            transition: 'background 0.2s ease-in',
            borderRight: `1px solid ${right_border}`,
            borderLeft: `1px solid ${left_border}`,

            textAlign: (p_direction == Direction.RIGHT) ? 'left' : 'right',
        }}
    >   
        <span className="material-symbols-outlined"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'start',
                fontSize: '15px',
            }}
        >
            {(p_direction == Direction.RIGHT && !isUp) ? 'keyboard_double_arrow_left' : ''}
            {(p_direction == Direction.LEFT && !isUp) ? 'keyboard_double_arrow_right' : ''}
        </span>
    </div>);
}
