import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useStore } from '@nanostores/react';
import { productIndex } from '@contexts/StoreGlobal';
import { GetModel } from "../../../common/GetModel.jsx";
function CustomMaterial({...props}) {
    return ( <>
     <meshStandardMaterial color={props.color} roughness={props.roughness}/>
    </>
    )
}
function Content({...props}) {
    const wrap = useRef()
    const productsWrap = useRef()
    const products = useRef()
    const index = useStore(productIndex);
    const clock = useThree(state => state.clock);
    useFrame((state, delta) => {
        if (!products.current) return
        products.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02
        products.current.rotation.y += .2 * delta
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
        gsap.registerPlugin(ScrollTrigger)
        const triggerTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-hero-prod',
                start: 'bottom bottom',
                onEnter: () => {
                    productIndex.set(0)
                },
                onLeaveBack: () => {
                    productIndex.set(0)
                }
            }
        })
    }, [])
    return (
        <>
            <group ref={wrap}>
                <group ref={productsWrap} scale={[1000,1000,1000]} position={[0,-props.height * .025,0]} rotation={[Math.PI * .08, 0,0]}>
                        <group ref={products}>
                            {props.list.map((item, idx) => {
                                if (item.data.file.url) {
                                    return (
                                        <mesh key={idx}
                                            scale={idx == 0 ? [1,1,1] : [0,0,0]}
                                            position={item.uid == 'kups' ? [0,-.02,0] : [0,0,0]}
                                            rotation={item.uid == 'trays'? [0, Math.PI * .5, 0] : [0, 0, 0]}
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
            </group>
            <ambientLight intensity={1.5} />
            <directionalLight intensity={1.5}/>
            <directionalLight intensity={1.15} position={[props.width * .25, 0,100]}/>
            <directionalLight intensity={1.15} position={[-props.width * .25, 0,100]}/>
        </>
    )
}
function HomeProductThree(props) {
    const { width, height } = useWindowSize();
    let perspective = height;
    let fov = ((Math.atan(height / 2 / perspective) * 2) * 180 / Math.PI) / 2;
    return (
        <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows="soft">
            <Content width={width} height={height} list={props.list}/>
        </Canvas>
    )
}
export default HomeProductThree