import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, ScrollControls, useScroll, Sparkles, Clouds, Cloud, Text3D, Center, CameraShake, Text} from '@react-three/drei';

const TextBox = () => {
    return (
        <>
            <Text>
                ssssssssssssssssssssssssssssssssssssssssssssssss
            </Text>
        </>
    )
}

const MakeClouds = () => {

    return (
        <>
            <Clouds material={THREE.MeshStandardMaterial}>
                <Cloud opacity={0.8} segments={10} bounds={[10, 10, 10]} volume={150} position={[32,150,118]}/>
                <Cloud opacity={0.8} segments={10} bounds={[10, 10, 10]} volume={150} position={[115,180,85]}/>
                <Cloud opacity={0.8} segments={10} bounds={[10, 10, 10]} volume={150} position={[116,100,-70]}/>
                <Cloud opacity={0.8} segments={10} bounds={[10, 10, 10]} volume={150} position={[-100,100,-270]}/>
                <Cloud opacity={0.8} segments={10} bounds={[10, 10, 10]} volume={150} position={[-50,100,-270]}/>
                <Cloud opacity={0.8} segments={10} bounds={[10, 10, 10]} volume={150} position={[0,100,-270]}/>

                {/* <Cloud opacity={1} segments={20} bounds={[10, 10, 10]} volume={100} position={[40,40,-80]}/> */}
            </Clouds>
        </>
    )
}

const Model = () => {
    const gltf = useLoader(GLTFLoader, "./glb/fantasy_map.glb")

    const ref = useRef();
    const tl = useRef();

    const scroll = useScroll();


    // ref는 Model를 가리키며, seek() 메서드는 타임라인을 주어진 시간으로 이동시킴
    // 스크롤을 확인해보면 0 ~ 1까지 스크롤 위치가 나옴

    const camera = useThree(state => state.camera);
    useFrame(() => {
        tl.current.seek(scroll.offset * tl.current.duration());
        // console.log(camera);
      });

    useLayoutEffect(() => {
        tl.current = gsap.timeline();

        tl.current.to(
            ref.current.position,
            {
                duration: 1, //이거는 애니메이션이 즉시 실행되고 지속 시간이 없음을 나타냄
                x: -50,
                y: 100,
                z: 50
            },
            0
        )

        tl.current.to(
            ref.current.position,
            {
                duration: 1, //이거는 애니메이션이 즉시 실행되고 지속 시간이 없음을 나타냄
                x: -90,
                y: 150,
                z: 100
            },
            1
        )


        tl.current.to(
            ref.current.rotation,
            {
                duration: 1,
                x: 0,
                y: - Math.PI / 6,
                z: 0
                
            },
            0
        )

        tl.current.to(
            ref.current.rotation,
            {
                duration: 1,
                x: -Math.PI/10,
                y: - Math.PI / 3,
                z: -Math.PI / 8
                
            },
            1
        )
    });

    return (
        <>
            {/* <Clouds cloudPosition={[0,0,-80]}/> */}
            <Sparkles count={5000} size={250} position={[-50, 100, 100]} scale={[400, 400, 400]} speed={2} />
            <group ref={ref}>
                <MakeClouds/>
                <primitive object={gltf.scene}/>
                <Center position={[10,80,45]} rotation={[0,Math.PI / 20,0]}>
                    <Text3D
                        curveSegments={32}
                        bevelEnabled
                        bevelSize={0.04}
                        bevelThickness={0.1}
                        height={0.5}
                        lineHeight={0.5}
                        letterSpacing={1}
                        size={8}
                        font="./font/Inter_Bold.json">
                        {`R3F\nTEST`}
                        <meshNormalMaterial />
                    </Text3D>
                </Center>
            </group>
        </>
    )
}

const WebGLCanvas = () => {

    return (
        <>
            {/* <div>{scroll.scroll.current}</div> */}
            <Canvas style={{width:'100vw', height:'100vh'}} camera={{position:[45.22940944492088,240.10750022053304,151.73219754345197], fov:60, near:10, far:1500, aspect: window.innerWidth/window.innerHeight}} >
                {/* <Scene> */}
                    <fog attach="fog" args={['#faebd7', 100, 450]} />

                        <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}>
                            <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
                        </directionalLight>
                        <spotLight position={[10,10,10] } />
                        <ScrollControls pages={3} damping={0.5}>
                            <Model/>
                        </ScrollControls>
                    <Environment preset='dawn' />
                    {/* <Rig/> */}
                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                    <EventText />
                {/* </Scene> */}
            </Canvas>
        </>
    )
}

const EventText = () => {
    return (
        <>
            
        </>
    )
}

export default WebGLCanvas;