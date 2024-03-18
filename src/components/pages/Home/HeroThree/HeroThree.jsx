import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { Fork } from './Fork.jsx';
import { FoodContainer } from "./FoodContainer.jsx";
import { useStore } from '@nanostores/react';
import { productIndex } from '@contexts/StoreGlobal';
import { GetModel } from "../../../common/GetModel.jsx";
import * as ut from '@/js/utils.js'
import './HeroThree.scss';
function CustomMaterial({...props}) {
    return (<meshStandardMaterial color={props.color} roughness={props.roughness}/>)
}
function Content({...props}) {
    const wrap = useRef()
    const productsWrap = useRef()
    const products = useRef()
    const forkWrap = useRef()
    const fork = useRef()
    const index = useStore(productIndex);
    const [scaleOffset, setScaleOffset] = useState(1);
    const clock = useThree(state => state.clock);
    useFrame((state, delta) => {
        if (!products.current) return;
        products.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02
        // products.current.rotation.y = Math.sin(clock.elapsedTime / 2) * Math.PI * .04

        fork.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02 * -1
        fork.current.rotation.y = Math.sin(clock.elapsedTime / 2) * Math.PI * .04 * -1
        if (!products.current) return
        products.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02
        // products.current.rotation.y += .2 * delta
    })
    useEffect(() => {
        products.current.children.forEach((el, idx) => {
            if (idx == index) {
                gsap.to(products.current.children[index].scale, {x: 1, y: 1, z: 1, duration: .8, ease: 'expo.out', overwrite: true})
            } else {
                gsap.to(products.current.children[idx].scale, {x: 0, y: 0, z: 0, duration: .8, ease: 'expo.out', overwrite: true})
            }
        })
    }, [index])

    useGSAP(() => {
        if (window.innerWidth > 991) {
        } else if (window.innerWidth > 767) {
            setScaleOffset(2)
        } else {
            setScaleOffset(1.5)
        }
        gsap.registerPlugin(ScrollTrigger)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-hero',
                start: 'top top',
                endTrigger: '.home-prod-cards-inner',
                end: 'center center',
                scrub: true,
            },
            defaults: {
                ease: 'linear'
            }
        })
        let leftOffset = window.innerWidth > 767 ? ut.offset(ut.dom('.home-prod-cards')).left + ut.dom('.home-prod-cards').clientWidth / 2 - props.width / 2 : 0;
        
        tl
        .to(productsWrap.current.scale, {duration: 1, x: 6 / scaleOffset, y: 6 / scaleOffset, z: 6 / scaleOffset})
        .to(productsWrap.current.position, {duration: 1, x: -props.width * .00015, y: 0, z: 0}, 0)
        .to(productsWrap.current.rotation, {duration: 1, y: Math.PI * .15, z: - Math.PI * .05}, 0)

        .to(forkWrap.current.scale, {duration: 1, x: 9 / scaleOffset, y: 9 / scaleOffset, z: 9 / scaleOffset}, 0)
        .to(forkWrap.current.position, {duration: 1, x: props.width * .00125, y: props.height * .003}, 0)
        .to(forkWrap.current.rotation, {duration: 1, x: Math.PI * .75, y: -Math.PI * .2, z: -Math.PI * .4}, 0)
        
        .to(productsWrap.current.scale, {duration: 1, x: 7 / scaleOffset, y: 7 / scaleOffset, z: 7 / scaleOffset})
        .to('.home-hero-three-stick-inner', {x: leftOffset, duration: 1}, '<=0')
        .to(productsWrap.current.position, {duration: 1, x: 0, y: (-props.height * .00015) / scaleOffset}, '<=0')
        .to(productsWrap.current.rotation, {duration: 1, x: Math.PI * .09, y: Math.PI * .33, z: 0}, '<=0')

    }, [scaleOffset])
    return (
        <>
            <group ref={wrap}>
                <group ref={productsWrap} scale={[10 / scaleOffset, 10 / scaleOffset, 10 / scaleOffset]} 
                    position={[props.width * .00065, -props.height * .001, 0]} 
                    rotation={[Math.PI * .25, -Math.PI * .33, Math.PI * .175]}>
                    <group ref={products}>
                        {props.list.map((item, idx) => {
                            if (item.data.file.url) {
                                return (
                                    <mesh key={idx}
                                        scale={idx == 0 ? [1,1,1] : [0,0,0]}
                                        position={item.uid == 'kups' ? [0,-.04,0] : item.uid == 'klamshells' ? [0,-.01,0] : [0,0,0]}
                                    >
                                        {item.uid == 'bowls' ? (
                                            <GetModel file='/glb/bowls-65-transformed.glb'/>
                                        ) : item.uid == 'plates-platters' ? (
                                            <GetModel file='/glb/plates-80-transformed.glb'/>
                                        ) : item.uid == 'soup-containers' ? (
                                            <GetModel file='/glb/soup-6-transformed.glb'/>
                                        ) : item.uid == 'kutlery' ? (
                                            <GetModel file='/glb/kutlery-spoon-transformed.glb'/>
                                        ) : item.uid == 'kups' ? (
                                            <GetModel file='/glb/kup-5-transformed.glb'/>
                                        ) : item.uid == 'klamshells' ? (
                                            <GetModel file='/glb/klamshell-79-transformed.glb'/>
                                        ) : (
                                            <GetModel file={item.data.file.url}
                                                material={<CustomMaterial color='#EAD6B3' needsUpdate={true} isActive={idx == index}
                                            />} />
                                        )}
                                    </mesh>
                                )
                            }
                        })}
                    </group>
                </group>
                <group ref={forkWrap} scale={[10 / scaleOffset, 10 / scaleOffset, 10 / scaleOffset]}
                    position={[props.width * .001, props.height * .001, 0]}
                    rotation={[Math.PI * .5, -Math.PI * .1, Math.PI * .33]}>
                    <mesh ref={fork}>
                        <Fork material={<CustomMaterial color='#F9833A' roughness={0} />} />
                    </mesh>
                </group>
            </group>
            <ambientLight intensity={1.5} />
            <directionalLight intensity={1.5}/>
            <directionalLight intensity={1.15} position={[props.width * .25, 0,100]}/>
            <directionalLight intensity={1.15} position={[-props.width * .25, 0,100]}/>
        </>
    )
}

function HomeHeroThree({...props}) {
    const { width, height } = useWindowSize();
    const threeRef = useRef();
    let perspective = height / 100;
    let fov = ((Math.atan(height / 10 / perspective) * 2) * 180 / Math.PI) / 10;
    // useGSAP(() => {
    //     gsap.from(threeRef.current, { ease: "power4.out", autoAlpha: 0, duration: 2, clearProps: 'all' }, .8)
    // }, { scope: threeRef })
    return (
        <div className="home-hero-three" ref={threeRef}>
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