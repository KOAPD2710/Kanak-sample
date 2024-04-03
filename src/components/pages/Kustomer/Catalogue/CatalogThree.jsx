import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import { suspend } from 'suspend-react'
import { animate, scroll } from "motion"
import gsap from 'gsap';
import { Fork } from './Fork.jsx';
import { Environment, ContactShadows, AdaptiveDpr} from "@react-three/drei";
import { useStore } from '@nanostores/react';
import { productIndex } from '@contexts/StoreGlobal';
import { GetModel } from "../../../common/GetModel.jsx";
import * as ut from '@/js/utils.js'
import './CatalogThree.scss';

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function Content({...props}) {
    const wrap = useRef()
    const contactShadow = useRef(null)
    const productsWrap = useRef()
    const products = useRef()
    const index = useStore(productIndex);
    const [scaleOffset, setScaleOffset] = useState(1);
    const [degraded, degrade] = useState(false)
    const clock = useThree(state => state.clock);
    let isLock = false;
    useFrame((state, delta) => {
        if (!products.current) return;
        products.current.rotation.y += .006
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
                                    <mesh key={idx} scale={idx == 0 ? [1,1,1] : [0,0,0]}>
                                        <Suspense>
                                            {item.uid == 'bowls' ? (
                                                <GetModel file='/glb/58-bowl-clean-transformed.glb' scale={[.36,.36,.36]}/>
                                            ) : item.uid == 'trays' ? (
                                                <GetModel file='/glb/fp_01-clean-transformed.glb' rotation={[0, Math.PI * -.5, 0]}/>
                                            ) : item.uid == 'plates-platters' ? (
                                                <GetModel file='/glb/plates-80-transformed.glb' scale={[.9,.9,.9]} position={[0,.01,0]}/>
                                            ) : item.uid == 'soup-containers' ? (
                                                <GetModel file='/glb/41-ramen-clean-transformed.glb' scale={[.68,.68,.68]} position={[0,-.015,0]}/>
                                            ) : item.uid == 'produce' ? (
                                                <GetModel file='/glb/48-monte-tray-clean-transformed.glb' scale={[1.2,1.2,1.2]}/>
                                            ) : item.uid == 'kutlery' ? (
                                                <GetModel file='/glb/22-wooden-fork-clean-transformed.glb'/>
                                            ) : item.uid == 'kups' ? (
                                                <GetModel file='/glb/kup-5-transformed.glb' scale={[.76,.76,.76]} position={[0,-.02,0]}/>
                                            ) : item.uid == 'klamshells' ? (
                                                <GetModel file='/glb/klamshell-79-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                                            ) : item.uid == 'carry-out-bags' ? (
                                                <GetModel file='/glb/62-freebirds-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                                            ) : (
                                                <GetModel file='/glb/m_box-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,.01,0]}
                                                />
                                            )}
                                        </Suspense>
                                    </mesh>
                                )
                            }
                        })}
                    </group>
                </group>
                <spotLight intensity={1} angle={.1} penumbra={1} position={[0, 10, 0]} castShadow />
                <ContactShadows opacity={.2} ref={contactShadow}
                    scale={[7 / scaleOffset, 7 / scaleOffset, 7 / scaleOffset]}
                    position={[0, -.4 / scaleOffset, 0]}  blur={2} far={1.2} />
            </group>
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256}/>
        </>
    )
}

function CatalogThreeMain({...props}) {
    const { width, height } = useWindowSize();
    const threeRef = useRef();
    if (width == 0) {
        return;
    } else {
        let perspective = 5;
        let fov = 30;
        return (
            <div className="home-hero-three" ref={threeRef}>
                <div className="home-hero-three-stick">
                    <div className="home-hero-three-stick-inner">
                        <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                            <Content width={width} height={height} list={props.list}/>
                            <AdaptiveDpr pixelated />
                        </Canvas>
                    </div>
                </div>
            </div>
        )
    }
}
export default CatalogThreeMain;