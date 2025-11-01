/// <reference types="react" />
/// <reference types="react-dom" />

import { Object3DNode, MaterialNode, GeometryNode } from '@react-three/fiber'
import { Mesh, SphereGeometry, BoxGeometry, PlaneGeometry } from 'three'
import { MeshStandardMaterial, MeshBasicMaterial, MeshPhongMaterial } from 'three'
import { AmbientLight, PointLight, DirectionalLight } from 'three'
import { Group } from 'three'

// Speech Recognition API types
declare global {
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    abort(): void;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }

  interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }

  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
    Hands?: any;
    Camera?: any;
    tensorflow?: any;
  }

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