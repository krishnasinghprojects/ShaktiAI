import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js geometries
      sphereGeometry: any
      boxGeometry: any
      planeGeometry: any
      cylinderGeometry: any
      
      // Three.js materials
      meshStandardMaterial: any
      meshBasicMaterial: any
      meshPhongMaterial: any
      meshLambertMaterial: any
      
      // Three.js objects
      mesh: any
      group: any
      scene: any
      
      // Three.js lights
      ambientLight: any
      pointLight: any
      directionalLight: any
      spotLight: any
      
      // Controls
      orbitControls: any
    }
  }
}