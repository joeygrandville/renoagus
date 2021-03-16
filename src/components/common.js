import qs from "querystring";
import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import * as yup from "yup";

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

export const isEmail = (email) => {
  try {
    yup.string().nullable().email().required().validateSync(email);
    return true;
  } catch (_e) {
    return false;
  }
};

export const isNumber = (number) => {
  try {
    yup.number().required().validateSync(number);
    return true;
  } catch (_e) {
    return false;
  }
};

export const useValidation = (schema) => {
  const [{ error, valid }, setState] = useState({ error: {}, valid: true });
  const validateSchema = useCallback(
    (data) => {
      const state = { valid: true, error: {} };
      try {
        schema.validateSync(data, { abortEarly: false });
      } catch (e) {
        state.valid = false;
        if (typeof e?.inner === "object") state.error = e.inner.reduce((acc, error) => ({ ...acc, [error.path]: error.message }), {});
      }
      setState(state);
      return state;
    },
    [schema]
  );
  const clearError = useCallback(() => setState({ error: {}, valid: true }), []);
  return { error, validateSchema, clearError, valid };
};

export const openLink = (href) => {
  const link = document.createElement("a");
  link.rel = "noreferrer";
  link.href = href;
  link.target = "_blank";
  link.click();
  link.remove();
};

export const rsvpHref = (id) => `${window.location.origin}?rsvp=${id}`;
