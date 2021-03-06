import qs from "querystring";
import { useLocation } from "react-router-dom";

export const memProps = (arr) => (Array.isArray(arr) ? (prev, next) => !arr.some((key) => prev[key] !== next[key]) : undefined);

export const handleEvent = (fn) => (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (typeof fn !== "function") return false;
  return fn(event);
};

export const array = (length) => Array.from(Array(length), (_, i) => i + 1);

export const useQueryString = () => {
  const { search } = useLocation();
  return qs.parse((search || "").replace(/\?/g, ""));
};
