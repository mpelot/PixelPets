    'use client'

import React, { useEffect, useRef, useState } from 'react';
import './petCard.css'; // assuming petCard.css contains necessary styles

export default function PetCard(props) {
    const [mouseX, setMouseX] = useState();
    const [mouseY, setMouseY] = useState();
    const [scale, setScale] = useState(1);
    const boundsRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };
        const handleMouseEnter = async (e) => {
            setScale(1.1);
        };
        const handleMouseLeave = async (e) => {
            setScale(1)
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };
        if (window !== null) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        if (boundsRef.current != null) {
            boundsRef.current.addEventListener('mouseenter', handleMouseEnter);
            boundsRef.current.addEventListener('mouseleave', handleMouseLeave);
        }
    
        return () => {
            if (window !== null) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            if (boundsRef.current != null) {
                boundsRef.current.removeEventListener('mouseenter', handleMouseEnter);
                boundsRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);
    
    const calculateRotate = (axis, size) => {
        if (!boundsRef.current) return 0;
        const rect = boundsRef.current.getBoundingClientRect();

        if (mouseX < rect.left ||  mouseX > rect.right || mouseY > rect.bottom || mouseY < rect.top) return 0;
        return ((axis === 'X' ? mouseY : mouseX) - (axis === 'X' ? rect.top : rect.left) - (size === 'height' ? rect.height / 2 : rect.width / 2)) / 8;
    };

    const rotateX = calculateRotate('X', 'height');
    const rotateY = calculateRotate('Y', 'width');  

    return (    
        <div className='container' ref={boundsRef}>
            <div className='rotationWrapper' style={{ transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)` }}>
                <div className='cardWrapper' ref={cardRef} style={{ transform: `scale(${scale})` }}>
                    <div className="cardContainer">
                        <div className="imageContainer">
                            <img src={props.img} alt={props.name}/>
                        </div>
                        <h2>{props.name}</h2>
                        <p>{props.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}