'use client'

import React, { useEffect, useRef, useState } from 'react';
import './petCard.css';

export default function PetCard(props) {
    const [mouseX, setMouseX] = useState();
    const [mouseY, setMouseY] = useState();
    const [isOn, setIsOn] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };
        const handleMouseEnter = async (e) => {
            setIsOn(true);
        };
        const handleMouseLeave = async (e) => {
            setIsOn(false);
        };
        if (cardRef.current != null) {
            cardRef.current.addEventListener('mousemove', handleMouseMove);
            cardRef.current.addEventListener('mouseenter', handleMouseEnter);
            cardRef.current.addEventListener('mouseleave', handleMouseLeave);
        }
        return () => {
            if (cardRef.current != null) {
                cardRef.current.removeEventListener('mousemove', handleMouseMove);
                cardRef.current.removeEventListener('mouseenter', handleMouseEnter);
                cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);
    
    const calculateRotate = (axis, size) => {
        if (!cardRef.current) return 0;
        const rect = cardRef.current.getBoundingClientRect();

        if (!isOn) return 0;
        return ((axis === 'X' ? mouseY : mouseX) - (axis === 'X' ? rect.top : rect.left) - (size === 'height' ? rect.height / 2 : rect.width / 2)) / 8;
    };

    const calculateSheen = () => {
        return (-rotateX + rotateY) * 10 + 50;
    }

    const calculateSheenOpacity = () => {
        if (!isOn) return 0;
        return (-(Math.abs(rotateX) + Math.abs(rotateY)) + 13) / 50;
    }

    const rotateX = calculateRotate('X', 'height');
    const rotateY = calculateRotate('Y', 'width');  
    const sheenPosition = calculateSheen();
    const sheenOpacity = calculateSheenOpacity();

    return (    
        <div className='container'>
            <div className='bounds' ref={cardRef}></div>
            <div className='rotationWrapper' style={{ transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`, boxShadow: `${rotateY}px ${rotateX}px 80px 0px rgba(100, 100, 100, ${isOn ? 1 : 0})`}}>
                <div className='cardWrapper' style={{ transform: `scale(${isOn ? 1.1 : 1.0})`}}>
                    <div className='sheen' style={{ backgroundImage:`linear-gradient(55deg, transparent, rgba(255 255 255 / ${sheenOpacity}) ${sheenPosition}%, transparent)`}}></div>
                    <div className="cardContainer" >
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