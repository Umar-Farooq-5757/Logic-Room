import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
const Math = ({ formula, block = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        throwOnError: false,
        displayMode: block, // true for BlockMath, false for InlineMath
      });
    }
  }, [formula, block]);
  return <span ref={containerRef} />;
};

export default Math;
