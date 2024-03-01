import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Fork } from './Fork.jsx';
import { useStore } from '@nanostores/react';
import { productIndex, prevProductIndex } from '@contexts/StoreGlobal';
import './Three.scss';
import * as ut from '@/js/utils.js';
import { GetModel } from "./GetModel.jsx";
function CustomMaterial({...props}) {
    return (<meshStandardMaterial color={props.color} roughness={props.roughness}/>)
}
function Content({...props}) {
    const wrap = useRef()
    const productsWrap = useRef()
    const products = useRef()
    const forkWrap = useRef()
    const fork = useRef()
    const [scale, setScale] = useState([3200,3200,3200]);
    const index = useStore(productIndex);
    const prevIndex = useStore(prevProductIndex);
    const clock = useThree(state => state.clock);
    useFrame((state, delta) => {
        if (!products.current) return;
        const t = clock.elapsedTime
        products.current.rotation.x = Math.cos(t / 2) * Math.PI * .02
        products.current.rotation.y = Math.sin(t / 2) * Math.PI * .04
        
        fork.current.rotation.x = Math.cos(t / 2) * Math.PI * .02 * -1
        fork.current.rotation.y = Math.sin(t / 2) * Math.PI * .04 * -1
    })
    useEffect(() => {
        products.current.children.forEach((el, idx) => {
            if (idx == index) {
                gsap.to(products.current.children[index].scale, {x: 1, y: 1, z: 1, duration: .8, ease: 'expo.out', overwrite: true})
                //gsap.to(products.current.children[index].position, {x: 0, y: 0, duration: 1, ease: 'expo.out', overwrite: true})
            } else {
                gsap.to(products.current.children[idx].scale, {x: 0, y: 0, z: 0, duration: .8, ease: 'expo.out', overwrite: true})
                //gsap.to(products.current.children[idx].position, {x: .2, y: -.01, duration: 1, ease: 'expo.out', overwrite: true})
            }
        })
    }, [index])

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-hero',
                start: 'top top',
                endTrigger: '.home-abt',
                end: 'bottom bottom+=25%',
                scrub: true,
            },
            defaults: {
                ease: 'linear'
            }
        })
        tl
        .to(productsWrap.current.scale, {x: 2000, y: 2000, z: 2000})
        .to(productsWrap.current.position, {x: -props.width * .025, y: 0, z: 0}, 0)
        .to(productsWrap.current.rotation, {y: Math.PI * .25, z: - Math.PI * .05}, 0)

        .to(forkWrap.current.scale, {x: 2400, y: 2400, z: 2400}, 0)
        .to(forkWrap.current.position, {x: -props.width * .25, y: props.height * .2}, 0)
        .to(forkWrap.current.rotation, {x: Math.PI * .75, y: -Math.PI * .2, z: -Math.PI * .4}, 0)

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-abt',
                start: 'bottom bottom+=25%',
                endTrigger: '.home-prod-cards',
                end: `top-=${window.getComputedStyle(document.querySelector('.home-prod-cards-inner')).top} top`,
                // end: 'bottom bottom-=25%',
                scrub: true,
            },
            defaults: {
                ease: 'linear'
            }
        })
        let leftOffset = ut.offset(ut.dom('.home-prod-cards')).left + ut.dom('.home-prod-cards').clientWidth / 2 - props.width / 2
        console.log(leftOffset)
        tl2
        .to(productsWrap.current.scale, {x: 2200, y: 2200, z: 2200}, 0)
        .to(productsWrap.current.position, {x: leftOffset, y: -props.height * .05}, 0)
        .to(productsWrap.current.rotation, {x: Math.PI * .08, y: Math.PI * .5, z: 0}, 0)

        .to(forkWrap.current.scale, {x: 3000, y: 3000, z: 3000}, 0)
        .to(forkWrap.current.position, {x: -props.width * .75, y: props.height * .75}, 0)
        .to(forkWrap.current.rotation, {x: Math.PI * 1, y: -Math.PI * .3, z: -Math.PI * .6}, 0)

        const tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-prod-main-list',
                start: 'top bottom',
                onEnter: () => {
                    productIndex.set(0)
                },
                onLeaveBack: () => {
                    productIndex.set(0)
                }
            }
        })
    }, [])
    useEffect(() => {
    }, [props.width, props.height])
    return (
        <>
            <group ref={wrap}>
                <group ref={productsWrap} scale={scale} 
                    position={[props.width * .25, -props.height * .2, 0]} 
                    rotation={[Math.PI * .25, -Math.PI * .33, Math.PI * .175]}>
                        <group ref={products}>
                            {props.list.map((item, idx) => {
                                if (item.data.file.url) {
                                    return (
                                        <mesh key={idx} 
                                            scale={idx == 0 ? [1,1,1] : [0,0,0]}
                                            position={[0, .01,0]}
                                        >
                                            <GetModel file={item.data.file.url} 
                                                material={<CustomMaterial color='#EAD6B3' needsUpdate={true} isActive={idx == index}
                                            />} />
                                        </mesh>
                                    )
                                }
                                
                            })}
                        </group>
                </group>
                <group ref={forkWrap} scale={scale} 
                    position={[props.width * .25, props.height * .33, 0]} 
                    rotation={[Math.PI * .5, -Math.PI * .1, Math.PI * .33]}>
                    <mesh ref={fork}>
                        <Fork material={<CustomMaterial color='#F9833A' roughness={0} />} />
                    </mesh>
                </group>
            </group>            
            <ambientLight intensity={2} />
            <directionalLight intensity={2}/>
            <directionalLight intensity={1} position={[props.width * .25, 0,100]}/>
        </>
    )
}

function HomeThree({...props}) {
    const { width, height } = useWindowSize();
    let perspective = height * 2;
    let fov = (Math.atan(height / 2 / perspective) * 2) * 180 / Math.PI;
    return (
        <div className="home-three">
            <div className="home-three-stick">
                <div className="home-three-stick-inner">
                    <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows="basic">
                        <Content width={width} height={height} list={props.list}/>
                    </Canvas>
                </div>
            </div>
        </div>
    )
}
export default HomeThree;