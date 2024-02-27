import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import {Model} from './KA10054.jsx';
import * as ut from '../../../js/utils.js';
import './HomeThreeMain.scss';

function Content() {
    const cube = useRef()
    const wrap = useRef()
    useFrame((state, delta) => {
        if (!cube.current) return;
        cube.current.rotation.y += 0.01
    })

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        console.log(cube.current)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-hero',
                start: 'top top',
                endTrigger: '.home-abt',
                end: 'bottom bottom',
                scrub: true
            },
            defaults: {
                ease: 'linear'
            }
        })
        tl.to(cube.current.rotation, {z: Math.PI * 2})
        .to(cube.current.position, {x: 0}, 0)
        .to(cube.current.scale, {x: 1.2, y: 1.2, z: 1.2}, 0)
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-abt',
                start: 'bottom bottom',
                endTrigger: '.home-prod-cards',
                end: `top-=${window.getComputedStyle(document.querySelector('.home-prod-cards-inner')).top} top`,
                scrub: true
            },
            defaults: {
                ease: 'linear'
            }
        })
        tl2
        .to(cube.current.rotation, {z: Math.PI * 4})
        .to(cube.current.position, {x: 3}, 0)
        .to(cube.current.scale, {x: 1.2, y: 1.2, z: 1.2}, 0)
    }, [])
    return (
        <>
            <group ref={wrap}>
                <mesh ref={cube} position={[2.25,0,0]} scale={[1.4,1.4,1.4]}>
                    <Model scale={[8,8,8]}/>
                </mesh>
            </group>
            
            <ambientLight intensity={4} />
        </>
    )
}

function HomeThreeMain() {
    return (
        <div className="home-three">
            <div className="home-three-stick">
                <Canvas>
                    <Content /> 
                </Canvas>
            </div>
        </div>
    )
}
export default HomeThreeMain;