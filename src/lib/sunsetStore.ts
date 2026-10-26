import { useSyncExternalStore } from "react";
import { isGoldenHour } from "@/lib/sun";

/**
 * Whether sunset mode is on: golden hour in ithaca by default, or whatever
 * the toggle was last set to this session.
 */
const KEY = "sunset";
let forced: boolean | null = null;
const listeners = new Set<() => void>();

export const sunsetOn = () => forced ?? isGoldenHour();

export function notifySunset() {
  listeners.forEach((fn) => fn());
}

export function setSunset(on: boolean | null) {
  forced = on;
  try {
    if (on === null) sessionStorage.removeItem(KEY);
    else sessionStorage.setItem(KEY, on ? "1" : "0");
  } catch {
    // private mode; it just won't survive a reload
  }
  notifySunset();
}

export const toggleSunset = () => setSunset(!sunsetOn());

/** Picks up the session's choice once, on the client. */
export function restoreSunset() {
  try {
    const v = sessionStorage.getItem(KEY);
    if (v !== null) setSunset(v === "1");
  } catch {
    // nothing saved
  }
}

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export const useSunset = () => useSyncExternalStore(subscribe, sunsetOn, () => false);
