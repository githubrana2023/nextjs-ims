"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore } from "@/lib/redux/store";
import { createStore } from "@/lib/redux/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
