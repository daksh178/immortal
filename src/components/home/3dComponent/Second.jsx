import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import Placeholder from "./Placeholder.jsx";
import Human from "./Human.jsx";
import * as THREE from "three";
import gsap from "gsap";

export default function Second({ progress }) {
  const controlsRef = useRef();
  const cameraRef = useRef();
  const humanRef = useRef();

  // This ref holds the last printed camera position
  const lastPrintedPosition = useRef([null, null, null]);

  useEffect(() => {
    const updateCameraPosition = () => {
      const positions = [
        [-0.40713591736876364, 5.681396665100585, 16.84062203661735],
        [-0.15363420514061812, 2.143895499007779, 6.35486939445302],
         [-8.779366108837026, 3.0936870772708653, 5.1625104440711365],
        [-0.21999999999999284, 3.0699999999999603, 9.099999999999874],
      ];

      if (progress >= 1) {
        gsap.to(cameraRef.current.position, {
          x: positions[3][0],
          y: positions[3][1],
          z: positions[3][2],
          duration: 1,
          ease: "power2.inOut",
        });
      } else {
        const segmentProgress = 1 / 3;
        const segmentIndex = Math.floor(progress / segmentProgress);
        const percentage = (progress % segmentProgress) / segmentProgress;

        const [startX, startY, startZ] = positions[segmentIndex];
        const [endX, endY, endZ] = positions[segmentIndex + 1];
        const x = THREE.MathUtils.lerp(startX, endX, percentage);
        const y = THREE.MathUtils.lerp(startY, endY, percentage);
        const z = THREE.MathUtils.lerp(startZ, endZ, percentage);

        gsap.to(cameraRef.current.position, {
          x: x,
          y: y,
          z: z,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };
    updateCameraPosition();
  }, [progress, cameraRef.current]);

  useFrame(() => {
    if (cameraRef.current && humanRef.current) {
      cameraRef.current.lookAt(humanRef.current.position);

      // Compare with last printed position
      const pos = cameraRef.current.position;
      const currentPosArr = [pos.x, pos.y, pos.z];
      const lastPosArr = lastPrintedPosition.current;

      // Only log if position changed (with small epsilon tolerance)
      const epsilon = 1e-3;
      const changed = lastPosArr.some(
        (val, i) => Math.abs(val - currentPosArr[i]) > epsilon
      );

      if (
        lastPosArr[0] === null ||
        lastPosArr[1] === null ||
        lastPosArr[2] === null ||
        changed
      ) {
        // Print position array
        // console.log(currentPosArr);
        // Update last printed position
        lastPrintedPosition.current = currentPosArr;
      }
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        fov={100}
        near={0.1}
        far={200}
        position={[-0.40713591736876364, 5.681396665100585, 16.84062203661735]} 

        makeDefault
      />

      {/* <OrbitControls ref={controlsRef} /> */}

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={3.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.1} />

      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Human ref={humanRef} scale={0.15} />
      </Suspense>
    </>
  );
}