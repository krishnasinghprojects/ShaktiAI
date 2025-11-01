/// <reference types="react" />
/// <reference types="react-dom" />

import { Object3DNode, MaterialNode, GeometryNode } from '@react-three/fiber'
import { Mesh, SphereGeometry, BoxGeometry, PlaneGeometry } from 'three'
import { MeshStandardMaterial, MeshBasicMaterial, MeshPhongMaterial } from 'three'
import { AmbientLight, PointLight, DirectionalLight } from 'three'
import { Group } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // HTML Elements
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
      main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
      
      // Three.js Objects
      mesh: Object3DNode<Mesh, typeof Mesh>
      group: Object3DNode<Group, typeof Group>
      
      // Geometries
      sphereGeometry: GeometryNode<SphereGeometry, typeof SphereGeometry>
      boxGeometry: GeometryNode<BoxGeometry, typeof BoxGeometry>
      planeGeometry: GeometryNode<PlaneGeometry, typeof PlaneGeometry>
      
      // Materials
      meshStandardMaterial: MaterialNode<MeshStandardMaterial, typeof MeshStandardMaterial>
      meshBasicMaterial: MaterialNode<MeshBasicMaterial, typeof MeshBasicMaterial>
      meshPhongMaterial: MaterialNode<MeshPhongMaterial, typeof MeshPhongMaterial>
      
      // Lights
      ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>
      pointLight: Object3DNode<PointLight, typeof PointLight>
      directionalLight: Object3DNode<DirectionalLight, typeof DirectionalLight>
    }
  }
}

export {}