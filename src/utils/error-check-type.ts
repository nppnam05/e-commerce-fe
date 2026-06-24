import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import type {
  CustomError,
  FetchError,
  HttpError,
  ParsingError,
  TimeoutError,
} from "@/types/error-types";

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isSerializedError(error: unknown): error is SerializedError {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    !("status" in error)
  );
}

export function isFetchError(error: FetchBaseQueryError): error is FetchError {
  return error.status === "FETCH_ERROR";
}

export function isParsingError(
  error: FetchBaseQueryError,
): error is ParsingError {
  return error.status === "PARSING_ERROR";
}
export function isTimeoutError(
  error: FetchBaseQueryError,
): error is TimeoutError {
  return error.status === "TIMEOUT_ERROR";
}
export function isCustomError(
  error: FetchBaseQueryError,
): error is CustomError {
  return error.status === "CUSTOM_ERROR";
}
export function isHttpError(error: FetchBaseQueryError): error is HttpError {
  const isAnotherError =
    isFetchError(error) ||
    isParsingError(error) ||
    isTimeoutError(error) ||
    isCustomError(error);
  return !isAnotherError;
}

function getMessageField(error: HttpError): string | null {
  if (
    typeof error.data === "object" &&
    error.data != null &&
    "message" in error.data &&
    typeof error.data.message === "string"
  ) {
    return error.data.message;
  }
  return null;
}

export function getErrorMessage(error: unknown): string | null {
  if (isSerializedError(error)) {
    return error.message;
  }
  if (isFetchBaseQueryError(error)) {
    if (isHttpError(error)) {
      return getMessageField(error);
    }
    if (isFetchError(error)) {
      return error.error;
    }
    if (isParsingError(error)) {
      return error.error;
    }
    if (isTimeoutError(error)) {
      return error.error;
    }
    if (isCustomError(error)) {
      return error.error;
    }
  }

  return null;
}
