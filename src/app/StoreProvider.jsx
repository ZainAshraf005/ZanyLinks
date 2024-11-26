"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/redux/store";
import { useRef, useState, useEffect } from "react";
import { initialAuthUser } from "@/redux/features/user/userSlice";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  const [hydrated, setHydrated] = useState(false);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Dispatch initialAuthUser only on the client side after hydration
    storeRef.current.dispatch(initialAuthUser());
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Avoid rendering until hydration is complete
    return null;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
