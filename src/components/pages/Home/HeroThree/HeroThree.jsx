import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import { animate, scroll } from "motion"
import gsap from 'gsap';
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
        products.current.rotation.y = Math.sin(clock.elapsedTime / 2) * Math.PI * .04

        fork.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02 * -1
        fork.current.rotation.y = Math.sin(clock.elapsedTime / 2) * Math.PI * .04 * -1
        if (!products.current) return
        products.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02
    })
    useEffect(() => {
        products.current.children.forEach((el, idx) => {
            if (idx == index) {
                // animate(
                //     (progress) => {
                //         products.current.children[index].scale.set(
                //             animThreeVal(0, 1, progress),
                //             animThreeVal(0, 1, progress),
                //             animThreeVal(0, 1, progress)
                //         )
                //     }, { duration: 0.8}
                // )
                gsap.to(products.current.children[index].scale, {x: 1, y: 1, z: 1, duration: .8, ease: 'expo.out', overwrite: true})
            } else {
                // if (products.current.children[idx].scale.x != 0) {
                //     animate(
                //         (progress) => {
                //             products.current.children[idx].scale.set(
                //                 animThreeVal(products.current.children[idx].scale.x, 0, progress),
                //                 animThreeVal(products.current.children[idx].scale.y, 0, progress),
                //                 animThreeVal(products.current.children[idx].scale.y, 0, progress)
                //             )
                //         }, { duration: 0.4}
                //     )
                // }
                gsap.to(products.current.children[idx].scale, {x: 0, y: 0, z: 0, duration: .8, ease: 'expo.out', overwrite: true})
            }
        })
    }, [index])

    function animThreeValRot(oldVal, newVal, prog) {
        return Math.PI * (oldVal + ((-oldVal + newVal) * prog))
    }
    function animThreeVal(oldVal, newVal, prog) {
        return oldVal + ( (-oldVal + newVal) * prog)
    }
    useEffect(() => {
        if (window.innerWidth > 991) {
        } else if (window.innerWidth > 767) {
            setScaleOffset(2)
        } else {
            setScaleOffset(1.5)
        }

        let leftOffset = window.innerWidth > 767 ? ut.offset(ut.dom('.home-prod-cards')).left + ut.dom('.home-prod-cards').clientWidth / 2 - window.innerWidth / 2 : 0;
        let scrollDis = ut.offset(ut.dom('.home-prod-cards')).top - ((window.innerHeight - ut.dom('.home-prod-cards-inner').clientHeight) / 2);
        scroll(({y}) => {
            if (y.progress >= 0 && y.progress < 1) { 
                productsWrap.current.position.set(animThreeVal(1.2 / scaleOffset, -.3 / scaleOffset, y.progress), animThreeVal(-.65 / scaleOffset, 0 / scaleOffset, y.progress), 0)
                productsWrap.current.rotation.set(animThreeValRot(.25, -1, y.progress), animThreeValRot(-.28, 0, y.progress), animThreeValRot(.165, -.05, y.progress))
            }
            forkWrap.current.scale.set(animThreeVal(11 / scaleOffset, 5 / scaleOffset, y.progress), animThreeVal(11 / scaleOffset, 5 / scaleOffset, y.progress), animThreeVal(11 / scaleOffset, 5 / scaleOffset, y.progress))
            forkWrap.current.position.set(animThreeVal(1.4 / scaleOffset, 2 / scaleOffset, y.progress), animThreeVal(1.2 / scaleOffset, 3 / scaleOffset, y.progress), animThreeVal(-.4 / scaleOffset, -1 / scaleOffset, y.progress))
            forkWrap.current.rotation.set(animThreeValRot(.6, .75, y.progress),animThreeValRot(-.1, .2, y.progress), animThreeValRot(.33, .4, y.progress))
        }, {
            offset: ['start start', `${scrollDis * .4}px start`]
        })
        
        scroll(({y}) => {
            if (y.progress > 0 && y.progress <= 1) {
                animate('.home-hero-three-stick-inner', {x: leftOffset * y.progress}, {duration: 0})
                productsWrap.current.position.set(animThreeVal(-.3 / scaleOffset, 0 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, -.15 / scaleOffset, y.progress), 0)
                productsWrap.current.rotation.set(animThreeValRot(-1, -1.91, y.progress), animThreeValRot(0, .33, y.progress), animThreeValRot(-.05, 0, y.progress))
            }
        }, {
            offset: [`${scrollDis * .4}px start`, `${scrollDis}px start`]
        })
        scroll(({y}) => {
            if (y.progress >= 0 && y.progress < 1) { 
                productsWrap.current.scale.set(animThreeVal(11 /scaleOffset, 5 / scaleOffset, y.progress), animThreeVal(11 /scaleOffset, 5 / scaleOffset, y.progress), animThreeVal(11 /scaleOffset, 5 / scaleOffset, y.progress))
            }
        }, {
            offset: ['start start', `${scrollDis * .6}px start`]
        })
        scroll(({y}) => {
            if (y.progress > 0 && y.progress <= 1) {
                productsWrap.current.scale.set(animThreeVal(5 / scaleOffset, 7 / scaleOffset, y.progress), animThreeVal(5 / scaleOffset, 7 / scaleOffset, y.progress), animThreeVal(5 / scaleOffset, 7 / scaleOffset, y.progress))
            }
        }, {
            offset: [`${scrollDis * .6}px start`, `${scrollDis}px start`]
        })
    }, [scaleOffset])
    return (
        <>
            <group ref={wrap}>
                <group ref={productsWrap} scale={[11 /scaleOffset, 11 /scaleOffset, 11 /scaleOffset]} 
                    position={[1.2 / scaleOffset, -.65 / scaleOffset, 0]} 
                    rotation={[Math.PI * .25, -Math.PI * .28, Math.PI * .165]}>
                    <group ref={products}>
                        {props.list.map((item, idx) => {
                            if (item.data.file.url) {
                                return (
                                    <mesh key={idx}
                                        scale={idx == 0 ? [1,1,1] : [0,0,0]}
                                        position={item.uid == 'kups' ? [0,-.04,0] : item.uid == 'klamshells' ? [0,-.01,0] : [0,0,0]}
                                    >
                                        {item.uid == 'bowls' ? (
                                            <GetModel file='/glb/bowls-65-transformed.glb' />
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
                                                material={<CustomMaterial color='#F6DCAF' roughness={.8} needsUpdate={true} isActive={idx == index}
                                            />} />
                                        )}
                                    </mesh>
                                )
                            }
                        })}
                    </group>
                </group>
                <group ref={forkWrap} scale={[11 / scaleOffset, 11 / scaleOffset, 11 / scaleOffset]}
                    position={[1.4 / scaleOffset, 1.2 / scaleOffset, -.4 / scaleOffset]}
                    rotation={[Math.PI * .6, -Math.PI * .1, Math.PI * .33]}>
                    <mesh ref={fork}>
                        <Fork material={<CustomMaterial color='#F9833A' roughness={.2} />} />
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
    let perspective = 5 ;
    let fov = 30;
    if (width == 0) {
        return;
    } else {
        return (
            <div className="home-hero-three" ref={threeRef}>
                <div className="home-hero-three-stick">
                    <div className="home-hero-three-stick-inner">
                        <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows="soft">
                            <Content width={width} height={height} list={props.list}/>
                        </Canvas>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeHeroThree;