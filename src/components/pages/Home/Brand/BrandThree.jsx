import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, AdaptiveDpr} from "@react-three/drei";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { suspend } from 'suspend-react'
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
const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function Content({...props}) {
    const activeIndex = useStore(brandIndex);
    const [degraded, degrade] = useState(false)
    const wrap = useRef()
    const brandsWrap = useRef()
    const brands = useRef()
    useEffect(() => {
        console.log('init three')
        if (activeIndex == 1) {
            gsap.to(brandsWrap.current.rotation, {x: Math.PI * 1,  duration: .8})
            if (brands.current.children[0].name == 'private-label') {
                gsap.to(brands.current.children[0].children[0].position, {x: -.1, z: .2, duration: .8})
                gsap.to(brands.current.children[0].children[0].rotation, {x: Math.PI * -3, duration: .8})
            }
            if (brands.current.children[0].name == 'kustom-packaging-solutions') {
                gsap.to(brands.current.children[0].children[0].position, {x: 0,z: -.23, duration: .8})
                gsap.to(brands.current.children[0].children[0].rotation, {x: Math.PI * -3, duration: .8})
            }
        } else {
            gsap.to(brandsWrap.current.rotation, {x: Math.PI * 0, duration: .8})
            if (brands.current.children[0].name == 'private-label') {
                gsap.to(brands.current.children[0].children[0].position, {x: .02, z: .28, duration: .8})
                gsap.to(brands.current.children[0].children[0].rotation, {x: Math.PI * 0, duration: .8})
            }
            if (brands.current.children[0].name == 'kustom-packaging-solutions') {
                gsap.to(brands.current.children[0].children[0].position, {x: -.1, z: -.2, duration: .8})
                gsap.to(brands.current.children[0].children[0].rotation, {x: Math.PI * 0, duration: .8})
            }
        }
    }, [activeIndex])
    return (
        <>
            <group ref={wrap} position={[-.25, -.1, 0]} rotation={[Math.PI * .075,Math.PI * .05,0]}>
                <group ref={brandsWrap} scale={[8,8,8]}>
                    <group ref={brands} 
                    position={[0, 0, 0]}
                    >
                        {props.list.map((item, idx) => {
                            if (item.data.file.url && props.top) {
                                if (idx == 0) {
                                    return (
                                        <mesh key={idx} name={item.uid}>
                                            <GetModel file={item.data.file.url}  visible={props.top ? true : false}
                                                position={[.02,0,.28]} 
                                                rotation={[0, -Math.PI * .5,0]}
                                            />
                                        </mesh>
                                    )
                                }
                            } else {
                                if (idx == 1) {
                                    return (
                                        <mesh key={idx} name={item.uid}>
                                            <GetModel file={item.data.file.url} visible={props.top ? false : true}
                                                position={[-.1,0,-.2]} 
                                                rotation={[0,Math.PI * .5, 0]} 
                                                material={<CustomMaterial color='#EAD6B3'/>}
                                            />
                                        </mesh>
                                    )
                                }
                            }
                        })}
                    </group>
                </group>
            </group>            
            <directionalLight intensity={.2} position={[-.2, .2,.2]} lookAt={[0,0,.3]}/>
            <directionalLight intensity={.2} position={[.2, 0,.2]} lookAt={[0,0,.3]}/>
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256}/>
        </>
    )
}

function HomeBrandThree({...props}) {
    const { width, height } = useWindowSize();
    const activeIndex = useStore(brandIndex);
    if (width == 0) {
        return
    } else {
        let perspective = 4;
        let fov = 60;
        return (
            <>
            <div className={`home-brand-canvas-inner-item ${activeIndex == 1 ? 'blur' : ''}`}>
                <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                    <Content width={width} height={height} list={props.list} top={true}/>
                    <AdaptiveDpr pixelated />
                </Canvas>                
            </div>
            <div className={`home-brand-canvas-inner-item ${activeIndex == 0 ? 'blur' : ''}`}>
                <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                    <Content width={width} height={height} list={props.list} top={false}/>
                    <AdaptiveDpr pixelated />
                </Canvas>                
            </div>
            </>
        )
    }
}

export default HomeBrandThree;