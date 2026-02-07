declare module "lenis/react" {
  import { ReactNode } from "react";

  interface ReactLenisProps {
    root?: boolean;
    options?: {
      lerp?: number;
      duration?: number;
      smoothWheel?: boolean;
      smoothTouch?: boolean;
      touchMultiplier?: number;
      infinite?: boolean;
      orientation?: "vertical" | "horizontal";
      gestureOrientation?: "vertical" | "horizontal" | "both";
    };
    children?: ReactNode;
  }

  export function ReactLenis(props: ReactLenisProps): JSX.Element;
  export function useLenis(callback?: (lenis: any) => void): any;
}
