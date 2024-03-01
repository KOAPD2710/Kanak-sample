import * as THREE from 'three'
import React, { forwardRef, useRef, useMemo, useImperativeHandle } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader'
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader'

const Shadows = forwardRef(({ opacity = 1, width = 1, height = 1, blur = 3.5, far = 1, doublePass = false, ...props }, ref) => {
  const { camera, scene, gl } = useThree()
  const shadowCamera = useRef()

  const [
    renderTarget,
    planeGeometry,
    depthMaterial,
    blurPlane,
    horizontalBlurMaterial,
    verticalBlurMaterial,
    renderTargetBlur
  ] = useMemo(() => {
    const renderTarget = new THREE.WebGLRenderTarget(512, 512)
    const renderTargetBlur = new THREE.WebGLRenderTarget(512, 512)
    renderTargetBlur.texture.generateMipmaps = renderTarget.texture.generateMipmaps = false
    const planeGeometry = new THREE.PlaneGeometry(width, height).rotateX(Math.PI / 2)
    const blurPlane = new THREE.Mesh(planeGeometry)
    const depthMaterial = new THREE.MeshDepthMaterial()
    depthMaterial.depthTest = depthMaterial.depthWrite = false
    depthMaterial.onBeforeCompile = shader =>
      (shader.fragmentShader = shader.fragmentShader.replace('1.0 - fragCoordZ ), opacity );', '0.0 ), ( 1.0 - fragCoordZ ) * 1.0 );'))
    const horizontalBlurMaterial = new THREE.ShaderMaterial(HorizontalBlurShader)
    const verticalBlurMaterial = new THREE.ShaderMaterial(VerticalBlurShader)
    verticalBlurMaterial.depthTest = horizontalBlurMaterial.depthTest = false
    return [renderTarget, planeGeometry, depthMaterial, blurPlane, horizontalBlurMaterial, verticalBlurMaterial, renderTargetBlur]
  }, [width, height])

  const factor = useRef(1)
  useImperativeHandle(ref, () => v => (factor.current = v), [])

  useFrame(() => {
    const initialBackground = scene.background
    scene.background = null
    scene.overrideMaterial = depthMaterial
    gl.setRenderTarget(renderTarget)
    gl.render(scene, shadowCamera.current)
    scene.overrideMaterial = null
    ;(doublePass ? [1, 0.4] : [1]).forEach(pass => {
      const amount = blur * pass * factor.current
      blurPlane.material = horizontalBlurMaterial
      blurPlane.material.uniforms.tDiffuse.value = renderTarget.texture
      horizontalBlurMaterial.uniforms.h.value = (amount * 1) / 256
      gl.setRenderTarget(renderTargetBlur)
      gl.render(blurPlane, shadowCamera.current)
      blurPlane.material = verticalBlurMaterial
      blurPlane.material.uniforms.tDiffuse.value = renderTargetBlur.texture
      verticalBlurMaterial.uniforms.v.value = (amount * 1) / 256
      gl.setRenderTarget(renderTarget)
      gl.render(blurPlane, shadowCamera.current)
    })
    gl.setRenderTarget(null)
    scene.background = initialBackground
  })

  return (
    <group {...props}>
      <mesh geometry={planeGeometry} scale={[1, -1, 1]} rotation={[0, 0, 0]} position={[0,-400,0]}>
        <meshBasicMaterial attach="material" map={renderTarget.texture} transparent opacity={opacity} />
      </mesh>
      <orthographicCamera ref={shadowCamera} args={[-width / 2, width / 2, height / 2, -height / 2, 0, far]} rotation={[0, 0, 0]} />
    </group>
  )
})

export default Shadows