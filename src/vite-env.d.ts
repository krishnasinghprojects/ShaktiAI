/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Import our custom type declarations
/// <reference path="./types/three-jsx.d.ts" />

declare module '*.tsx' {
  import React from 'react'
  const component: React.ComponentType<any>
  export default component
}

declare module '*.ts' {
  const content: any
  export default content
}

// Ensure React JSX is available globally
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
    interface ElementClass extends React.Component<any> { }
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }
    interface IntrinsicAttributes extends React.Attributes { }
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }
  }
}