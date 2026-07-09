import { useEffect, useRef, useState } from "react";

function LoadingSpinner(){
    const [totalAngle, setTotalAngle] = useState(0);
    const [angle, setAngle] = useState(0);
    const lastTimeRef = useRef(0);
    const animationIdRef : React.RefObject<number> = useRef(0);

    const speed_per_sec = 340;

    useEffect(() => {
        function update(currentTime: number) {
        if (lastTimeRef.current === 0) {
            lastTimeRef.current = currentTime;
        }

        const deltaTime = (currentTime - lastTimeRef.current) / 1000;
        lastTimeRef.current = currentTime;

        setAngle((prev) => (prev + speed_per_sec * deltaTime) % 360);
        setTotalAngle((prev) => (prev + speed_per_sec * deltaTime));

        animationIdRef.current = requestAnimationFrame(update);
        }

        animationIdRef.current = requestAnimationFrame(update);

        return () => {
        cancelAnimationFrame(animationIdRef.current);
        };
    }, []);

    let cycle = Math.floor(totalAngle / 360) + 1;

    let startAngle = angle;

    let aAngle = (cycle % 2 == 0) ? startAngle : 360 - startAngle;
    let bAngle = (cycle % 2 == 0) ? 0 : 360 - startAngle;
    let cAngle = 0;
    let dAngle = (cycle % 2 == 0) ? 360 - startAngle : startAngle;

    let color = '#adb2bd';
    let thickness = 5;

    const dotTimes = 3;
    let loadText = 'Loading';
    for (let i: number = 0; i < Math.floor((angle / 360) * dotTimes); i++) {
        loadText += "."
    };

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'calc((100% - 50px - 15px) / 2) 50px calc((100% - 50px - 15px) / 2)',
                gridTemplateRows: 'calc((100% - 50px - 15px) / 2) 50px 15px calc((100% - 50px - 15px) / 2)',

                width: '100%',
                height: '100%',
            }}
        >
            <div></div>
            <div></div>
            <div></div>

            <div></div>
            <div 
                style={{
                    background: `conic-gradient(
                                from ${startAngle}deg,
                                ${color} ${aAngle}deg ${bAngle}deg,
                                transparent ${cAngle}deg ${dAngle}deg
                                )`,
                    WebkitMask: `radial-gradient(
                                farthest-side,
                                transparent calc(100% - ${thickness}px),
                                ${color} calc(100% - ${thickness}px)
                                )`,
                    mask: `radial-gradient(
                            farthest-side,
                            transparent calc(100% - ${thickness}px),
                            ${color} calc(100% - ${thickness}px)
                            )`,
                    borderRadius: '45%',
                    width: '50px',
                    height: '50px',
                }}
            ></div>
            <div></div>

            <div></div>
            <div><span style={{color: color}}>{loadText}</span></div>
            <div></div>
            
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default LoadingSpinner;