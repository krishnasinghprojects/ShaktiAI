import 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elements - using any for simplicity
      mesh: any
      group: any
      sphereGeometry: any
      boxGeometry: any
      planeGeometry: any
      meshStandardMaterial: any
      meshBasicMaterial: any
      meshPhongMaterial: any
      ambientLight: any
      pointLight: any
      directionalLight: any
      
      // HTML elements
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
      main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      article: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      aside: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
      form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
      ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
      li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
    }
  }
}

export {}