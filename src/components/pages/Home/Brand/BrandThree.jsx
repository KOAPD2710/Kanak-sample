import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { GetModel } from "../../../common/GetModel.jsx";
import { useStore } from '@nanostores/react';
import { brandIndex } from '@contexts/StoreGlobal';
function CustomMaterial({...props}) {
    return ( <>
     <meshStandardMaterial color={props.color} roughness={props.roughness}/>
    </>
    )
}
function Content({...props}) {
    const activeIndex = useStore(brandIndex);
    const wrap = useRef()
    const brandsWrap = useRef()
    const brands = useRef()
    useGSAP(() => {
        if (activeIndex == 1) {
            gsap.to(brands.current.rotation, {
                x: Math.PI * .1, y: -Math.PI * 1.45, z: 0
            })
            gsap.to(brands.current.children[0].children[0].rotation, {
                x: Math.PI * .15, y: -Math.PI * 1.1, z: Math.PI * .1
            })
            gsap.to(brands.current.children[0].children[0].position, {
                x: .2, y: -.05, z: -.075
            })
            gsap.to(brands.current.children[1].children[0].rotation, {
                x: -Math.PI * .1, y: 0, z: -Math.PI * .1
            })
            gsap.to(brands.current.children[1].children[0].position, {
                x: -.05, y: -.065, z: .05
            })
        } else {
            gsap.to(brands.current.rotation, {
                x: Math.PI * .1, y: -Math.PI * .45, z: 0
            })
            gsap.to(brands.current.children[0].children[0].rotation, {
                x: -Math.PI * .25, y: -Math.PI * .15, z: Math.PI * .1
            })
            gsap.to(brands.current.children[0].children[0].position, {
                x: .2, y: 0, z: 0
            })
            gsap.to(brands.current.children[1].children[0].rotation, {
                x: -Math.PI * .1, y: 0, z: -Math.PI * .1
            })
            gsap.to(brands.current.children[1].children[0].position, {
                x: -.8, y: -.2, z: 0
            })
        }
    }, [activeIndex])
    return (
        <>
            <group ref={wrap}>
                <group ref={brandsWrap} scale={[8,8,8]}>
                        <group ref={brands} 
                        position={[-.025, 0, 0]}
                        rotation={[Math.PI * .1,-Math.PI * .45, 0]}
                        >
                            {props.list.map((item, idx) => {
                                if (item.data.file.url) {
                                    return (
                                        <mesh key={idx}>
                                            {idx == 0 ? 
                                            <GetModel file={item.data.file.url} 
                                                position={[0,0,0]} 
                                                rotation={[-Math.PI * .25, -Math.PI * .15,Math.PI * .1]}
                                            /> : 
                                            <GetModel file={item.data.file.url} 
                                                position={[-.4,-.2,0]} 
                                                rotation={[-Math.PI * .1,0,-Math.PI * .1]} 
                                                material={<CustomMaterial color='#EAD6B3'/>}
                                            />}
                                        </mesh>
                                    )
                                }
                            })}
                        </group>
                </group>
            </group>            
            <ambientLight intensity={1.25} />
            <directionalLight intensity={2} position={[-props.width * .00125, 0,0]}/>
            <directionalLight intensity={.5} position={[props.width * .00125, 0,0]}/>
        </>
    )
}

function HomeBrandThree({...props}) {
    const { width, height } = useWindowSize();
    let perspective = height / 100;
    let fov = ((Math.atan(height / 10 / perspective) * 2) * 180 / Math.PI) / 10;

    return (
        <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows="basic">
            <Content width={width} height={height} list={props.list}/>
        </Canvas>
    )
}

export default HomeBrandThree;