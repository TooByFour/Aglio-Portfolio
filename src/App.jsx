import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import './styles.css';

function Box(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color ={hovered ? 'hotpink' : 'orange'} />

    </mesh>
  )
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, './assets/low-poly_door/scene.gltf')
  return (
    <>
      <primitive object={gltf.scene} />
    </>
  );
};

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Canvas>
        <ambientLight intensity={Math.PI} />
        <directionalLight args={[0xffffff, 0.5]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  )
}
