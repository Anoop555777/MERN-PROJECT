import { useEffect, useRef } from "react";

const useOutsideClickHook = (handler, listenCapturingPhase = true) => {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturingPhase);
      return () =>
        document.removeEventListener(
          "click",
          handleClick,
          listenCapturingPhase
        );
    },
    [handler]
  );
  return ref;
};

export default useOutsideClickHook;
