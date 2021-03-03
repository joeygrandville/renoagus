export const memProps = (arr) => (Array.isArray(arr) ? (prev, next) => !arr.some((key) => prev[key] !== next[key]) : undefined);

export const handleEvent = (fn) => (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (typeof fn !== "function") return false;
  return fn(event);
};
