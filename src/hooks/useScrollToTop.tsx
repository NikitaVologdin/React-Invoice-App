import { useEffect } from "react";

export default function useScrollToTop<C, D>(
  condition1: C,
  condition2: C,
  dependency: D
) {
  useEffect(() => {
    if (condition1 !== condition2) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [dependency, condition1, condition2]);
}
