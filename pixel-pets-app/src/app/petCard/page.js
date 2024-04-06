'use client'

import React, { useEffect, useRef, useState } from 'react';
import './petCard.css'; // assuming petCard.css contains necessary styles

export default function PetCard() {
    const [mouseX, setMouseX] = useState();
    const [mouseY, setMouseY] = useState();
    const [scale, setScale] = useState(1);
    const cardRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };
        const handleMouseEnter = async (e) => {
            setScale(1.2);
        };
        const handleMouseLeave = async (e) => {
            setScale(1)
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };
        if (window !== null) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        if (cardRef.current != null) {
            cardRef.current.addEventListener('mouseenter', handleMouseEnter);
            cardRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (window !== null) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            if (cardRef.current != null) {
                cardRef.current.removeEventListener('mouseenter', handleMouseEnter);
                cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);
    
    const calculateRotate = (axis, size) => {
        if (!cardRef.current) return 0;
        const rect = cardRef.current.getBoundingClientRect();

        if (mouseX < rect.left ||  mouseX > rect.right || mouseY > rect.bottom || mouseY < rect.top) return 0;
        return ((axis === 'X' ? mouseY : mouseX) - (axis === 'X' ? rect.top : rect.left) - (size === 'height' ? rect.height / 2 : rect.width / 2)) / 20;
    };

    const rotateX = calculateRotate('X', 'height');
    const rotateY = calculateRotate('Y', 'width');  

    return (
        <div className='container'>
            <div className='rotationWrapper' style={{ transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(${scale})` }}>
                <div className='cardWrapper' ref={cardRef}>
                    <div className="cardContainer">
                        <h1>Content</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}