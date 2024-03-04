import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Fork } from './Fork.jsx';
import { FoodContainer } from "./FoodContainer.jsx";
import './HeroThree.scss';
function CustomMaterial({...props}) {
    return (<meshStandardMaterial color={props.color} roughness={props.roughness}/>)
}
function Content({...props}) {
    const wrap = useRef()
    const foodWrap = useRef()
    const food = useRef()
    const forkWrap = useRef()
    const fork = useRef()
    const clock = useThree(state => state.clock);
    useFrame((state, delta) => {
        if (!food.current) return;
        food.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02
        food.current.rotation.y = Math.sin(clock.elapsedTime / 2) * Math.PI * .04
        
        fork.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02 * -1
        fork.current.rotation.y = Math.sin(clock.elapsedTime / 2) * Math.PI * .04 * -1
    })

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-hero',
                start: 'top top',
                endTrigger: '.home-hero-prod',
                end: 'bottom bottom',
                scrub: true
            },
            defaults: {
                ease: 'linear'
            }
        })
        //pos [x: props.width * .25, y: -props.height * .2, z: 0]
        //rot [x: Math.PI * .25, y: -Math.PI * .33, z: Math.PI * .175]

        tl
        .to(foodWrap.current.scale, {duration: .75, x: 1000, y: 1000, z: 1000})
        .to(foodWrap.current.position, {duration: .75, x: -props.width * .025, y: 0, z: 0}, 0)
        .to(foodWrap.current.rotation, {duration: .75, y: Math.PI * .15, z: - Math.PI * .05}, 0)

        .to(forkWrap.current.scale, {duration: .75, x: 1200, y: 1200, z: 1200}, 0)
        .to(forkWrap.current.position, {duration: .75, x: -props.width * .125, y: props.height * .1}, 0)
        .to(forkWrap.current.rotation, {duration: .75, x: Math.PI * .75, y: -Math.PI * .2, z: -Math.PI * .4}, 0)

        .to(foodWrap.current.scale, {duration: 1, x: 1100, y: 1100, z: 1100})
        .to(foodWrap.current.position, {duration: 1, x: props.width * .125, y: -props.height * .375}, '<=0')
        .to(foodWrap.current.rotation, {duration: 1, x: -Math.PI * .25, y: Math.PI * .45, z: 0}, '<=0')

        .to(forkWrap.current.scale, {duration: 1, x: 1500, y: 1500, z: 1500}, '<=0')
        .to(forkWrap.current.position, {duration: 1, x: -props.width * .375, y: props.height * .025}, '<=0')
        .to(forkWrap.current.rotation, {duration: 1, x: Math.PI * 1, y: -Math.PI * .3, z: -Math.PI * .6}, '<=0')
         
    }, [])
    return (
        <>
            <group ref={wrap}>
                <group ref={foodWrap} scale={[1600,1600,1600]} 
                    position={[props.width * .125, -props.height * .1, 0]} 
                    rotation={[Math.PI * .25, -Math.PI * .33, Math.PI * .175]}>
                        <group ref={food}>
                            <mesh>
                                <FoodContainer material={<CustomMaterial color='#EAD6B3'/>} />
                            </mesh>
                        </group>
                </group>
                <group ref={forkWrap} scale={[1600,1600,1600]} 
                    position={[props.width * .125, props.height * .175, 0]} 
                    rotation={[Math.PI * .5, -Math.PI * .1, Math.PI * .33]}>
                    <mesh ref={fork}>
                        <Fork material={<CustomMaterial color='#F9833A' roughness={0} />} />
                    </mesh>
                </group>
            </group>            
            <ambientLight intensity={1.25} />
            <directionalLight intensity={1.5}/>
            <directionalLight intensity={1.05} position={[props.width * .125, 0,100]}/>
            <directionalLight intensity={1} position={[-props.width * .125, 0,100]}/>
        </>
    )
}

function HomeHeroThree({...props}) {
    const { width, height } = useWindowSize();
    let perspective = height * 2;
    let fov = ((Math.atan(height / 2 / perspective) * 2) * 180 / Math.PI) / 2;
    return (
        <div className="home-hero-three">
            <div className="home-hero-three-stick">
                <div className="home-hero-three-stick-inner">
                    <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows="basic">
                        <Content width={width} height={height} list={props.list}/>
                    </Canvas>
                </div>
            </div>
        </div>
    )
}
export default HomeHeroThree;