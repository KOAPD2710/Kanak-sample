import { Suspense, useRef, useState, useEffect, useMemo, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import { GetModel } from "@/components/common/GetModel";
import { suspend } from 'suspend-react'
import { Environment, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import gsap from "gsap";

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)


function Content(props) {
    const { size } = useThree();
    const products = useRef();
    // const productsWrap = useRef()
    const [degraded, degrade] = useState(false)
    const [scaleOffset, setScaleOffset] = useState(1);
    const [positions, setPositions] = useState([]);
    const [totalWidth, setTotalWidth] = useState(0);


    const mapIndex = useMemo(() => props.list.map((_, idx) => idx - props.currentIdx), [props.list, props.currentIdx]);

    const checkDecimalRounding = (number) => number - Math.floor(number) > .5;
    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }
    // useFrame((state, delta) => {
    //     products.current.children.forEach((el, idx) => {
    //         if (props.onDrag) {
    //             gsap.to(products.current.children[idx].position, { x: (mapIndex[idx] * 0.2) / scaleOffset, y: 0, z: 0, duration: 0, overwrite: true })
    //             // if (Math.round(props.currentIdx - (idx)) == mapIndex[idx]) {
    //             //     console.log("rn")
    //             // }
    //         }
    //         else {
    //             products.current.children.forEach((el, idx) => {
    //                 let ceilIndex = parseInt(props.currentIdx);
    //                 let currentActive = checkDecimalRounding(props.currentIdx) ? parseInt(props.currentIdx) + 1 : parseInt(props.currentIdx);

    //                 if (idx == currentActive) {
    //                     gsap.to(products.current.children[idx].position, { x: ((idx - lerp(idx, props.currentIdx)) * .2) / scaleOffset, y: 0, z: 0, duration: .8, ease: 'expo.out', overwrite: true });
    //                 } else {
    //                     // gsap.to(products.current.children[idx].position, {x: ((idx + props.currentIdx  - lerp(mapIndex[idx + props.currentIdx], mapIndex[idx])) * .2) / scaleOffset, y: 0, z: 0, duration: .8, ease: 'expo.out', overwrite: true})
    //                 }

    //                 // if (idx == parseInt(props.currentIdx) + 1) {
    //                 //     gsap.to(products.current.children[idx].position, { x: ((idx - lerp(idx, props.currentIdx)) * .2) / scaleOffset, y: 0, z: 0, duration: .8, ease: 'expo.out', overwrite: true });
    //                 // } else {
    //                 //     // gsap.to(products.current.children[idx].position, {x: ((idx + props.currentIdx  - lerp(mapIndex[idx + props.currentIdx], mapIndex[idx])) * .2) / scaleOffset, y: 0, z: 0, duration: .8, ease: 'expo.out', overwrite: true})
    //                 // }
    //             })
    //         }
    //     })
    // })

    useEffect(() => {
        let currIdx = props.currentIdx.toFixed(0);
        products.current.children.forEach((el, idx) => {
            // gsap.to(products.current.children[idx].position, { x: (mapIndex[idx] * 0.2) / scaleOffset, y: 0, z: 0, duration: 0, overwrite: true })
            if (idx == currIdx) {
                gsap.to(products.current.children[currIdx].scale, {x: 1, y: 1, z: 1, duration: .8, ease: 'expo.out', overwrite: true})
            } else {
                gsap.to(products.current.children[idx].scale, {x: 0.7, y: 0.7, z: 0.7, duration: .8, ease: 'expo.out', overwrite: true})
            }
        })
    }, [props.currentIdx]);

    useEffect(() => {
        if (window.innerWidth > 991) {
        } else if (window.innerWidth > 767) {
            setScaleOffset(2)
        } else {
            setScaleOffset(1.5)
        }
    }, []);

    // useEffect(() => {

    // }, []);
    console.log(props.currentPos)
    return (
        <>
            <group ref={products}
                scale={[10 / scaleOffset, 10 / scaleOffset, 10 / scaleOffset]}
                position={[props.currentPos <= -8 ? -8 : props.currentPos, 0 , 0]}
                // rotation={[Math.PI * -.11, Math.PI * .5, Math.PI * .22]}
                rotation={[Math.PI * .1, 0, 0]}
            >
                {props.list.map(({ url }, idx) => (
                    <Suspense key={idx}>
                        <group
                            position={[(idx * 0.2) / scaleOffset, 0, 0]}>
                            <GetModel file={url} />
                        </group>
                    </Suspense>
                ))}
                <spotLight intensity={1} angle={.1} penumbra={1} position={[0, 10, 0]} castShadow />
                    {/* <ContactShadows opacity={.2} ref={contactShadow}
                            scale={[7 / scaleOffset, 7 / scaleOffset, 7 / scaleOffset]}
                            position={[0, -.4 / scaleOffset, 0]}  blur={2} far={1.2} />
                    <Suspense>
                        <group ref={forkWrap} scale={[11 / scaleOffset, 11 / scaleOffset, 11 / scaleOffset]}
                            position={[1.4 / scaleOffset, 1.2 / scaleOffset, -.4 / scaleOffset]}
                            rotation={[Math.PI * .6, -Math.PI * .1, Math.PI * .2]}>
                            <mesh ref={fork}>
                                <Fork material={<CustomMaterial color='#F9833A' roughness={.2} />} />
                            </mesh>
                        </group>
                    </Suspense> */}
            </group>
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256}/>
        </>
    )
}

function KustomerHeroThree(props) {
    const { width, height } = useWindowSize();
    if (width === 0) return;
    let perspective = 15;
    let fov = 12;

    return (
        <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
            <Content width={width} height={height} { ...props } />
        </Canvas>
    )
}
export default memo(KustomerHeroThree);