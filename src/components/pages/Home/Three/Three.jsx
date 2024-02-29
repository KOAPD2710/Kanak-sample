import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {FoodContainer} from './FoodContainer.jsx';
import { Fork } from './Fork.jsx';
import { useStore } from '@nanostores/react';
import { productIndex } from '@contexts/StoreGlobal';
import './Three.scss';
import * as ut from '@/js/utils.js';
function CustomMaterial({...props}) {
    return (<meshStandardMaterial color={props.color} roughness={props.roughness} />)
}
function Content({...props}) {
    const wrap = useRef()
    const cube = useRef()
    const foodWrap = useRef()
    const food = useRef()
    const forkWrap = useRef()
    const fork = useRef()
    const [scale, setScale] = useState([ut.parseRem(3200),ut.parseRem(3200),ut.parseRem(3200)]);
    const [pos, setPos] = useState([props.width * .2, -props.height *.15, 0]);
    const [rot, setRot] = useState([Math.PI * .25, - Math.PI * .33, Math.PI * .175]);
    const index = useStore(productIndex);
    const clock = useThree(state => state.clock)
    useFrame((state, delta) => {
        if (!food.current) return;
        const t = clock.elapsedTime
        // food.current.rotation.x = Math.cos(t / 2) * Math.PI * .02
        // food.current.rotation.y = Math.sin(t / 2) * Math.PI * .04
        // food.current.position.y = Math.sin(t / 2) * .02
        // fork.current.rotation.x = Math.cos(t / 2) * Math.PI * .02 * -1
        // fork.current.rotation.y = Math.sin(t / 2) * Math.PI * .04 * -1
    })
    useEffect(() => {
        // console.log(index);
    }, [index])
    useGSAP(() => {
        // console.log(wrap)
        // const tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: '.home-hero',
        //         start: 'top top',
        //         endTrigger: '.home-abt',
        //         end: 'bottom bottom',
        //         scrub: true
        //     },
        //     defaults: {
        //         ease: 'linear'
        //     }
        // })
        // tl.to(wrap.current.rotation, {x: Math.PI * .15, y: Math.PI *.1, z: Math.PI * .05})
        // .to(wrap.current.position, {x: 0, y: 0}, 0)
        // .to(wrap.current.scale, {x: 2000, y: 2000, z: 2000}, 0)
        // const tl2 = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: '.home-abt',
        //         start: 'bottom bottom',
        //         endTrigger: '.home-prod-main',
        //         end: `top-=${window.getComputedStyle(document.querySelector('.home-prod-cards-inner')).top} top`,
        //         // end: 'bottom bottom',
        //         scrub: true
        //     },
        //     defaults: {
        //         ease: 'linear'
        //     }
        // })
        // tl2
        // .to(wrap.current.rotation, {x: Math.PI * .15, y: Math.PI * .5, z: Math.PI * 0})
        // .to(wrap.current.position, {x: props.width * .25}, 0)
        // .to(wrap.current.scale, {x: 2000, y: 2000, z: 2000}, 0)
    }, [])
    useEffect(() => {
        // setScale(ut.parseRem(2700),ut.parseRem(2700),ut.parseRem(2700))
        // setPos([props.width * .25, -props.height *.2, 0]);
        // setRot([Math.PI * .25, - Math.PI *.33, Math.PI * .175])
        // fork.current.children[0].rotation.y = Math.PI
        // fork.current.children[0].rotation.x = Math.PI * .25 * -1
    }, [props.width, props.height])

    return (
        <>
            <group ref={wrap} scale={scale} position={pos} rotation={rot}>
                {/* <mesh ref={cube} scale={[100,100,100]} position={[0,0,0]}>
                    <boxGeometry args={[1,1,1]}/>
                    <meshStandardMaterial color="#00ff00"/>
                </mesh> */}
                <group ref={foodWrap}>
                    <mesh ref={food} >
                        <FoodContainer material={<CustomMaterial color='#EAD6B3'/>} />
                    </mesh>
                </group>
                <group ref={forkWrap} scale={scale} position={[props.width * .25, props.height * .15, 0]} rotation={[Math.PI * .35, -1 * Math.PI * .25, 0]}>
                    <mesh ref={fork}>
                        <Fork material={<CustomMaterial color='#F9833A'/>} roughness={0}/>
                    </mesh>
                </group>
            </group>            
            <ambientLight intensity={2} />
            <directionalLight intensity={2}/>
            {/* <OrbitControls /> */}
        </>
    )
}

function HomeThree() {
    const { width, height } = useWindowSize();
    let perspective = height;
    let fov = (Math.atan(height / 2 / perspective) * 2) * 180 / Math.PI;
    return (
        <div className="home-three">
            <div className="home-three-stick">
                <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows="basic">
                    <Content width={width} height={height}/>
                </Canvas>
            </div>
        </div>
    )
}
export default HomeThree;