import { useEffect, useRef } from "react";
function useOustsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // returns true contains the element ref.current conatains e.target
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      // should listen in capturing event
      document.addEventListener("click", handleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}

export default useOustsideClick;
