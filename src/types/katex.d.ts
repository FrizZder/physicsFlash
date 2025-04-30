declare module 'katex' {
  interface KatexOptions {
    displayMode?: boolean;
    throwOnError?: boolean;
    errorColor?: string;
    macros?: Record<string, string>;
    fleqn?: boolean;
    leqno?: boolean;
    output?: string;
    trust?: boolean | ((context: any) => boolean);
    strict?: boolean | string;
  }

  function render(
    tex: string,
    element: HTMLElement,
    options?: KatexOptions
  ): void;

  export default {
    render
  };
}

declare module 'katex/dist/katex.min.css'; 