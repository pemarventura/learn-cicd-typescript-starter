import { IncomingHttpHeaders } from "http";
import { describe, expect, test } from "vitest";

import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("extracts the key from a well-formed header", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey abc123" };
    expect(getAPIKey(headers)).toBe("abc123");
  });

  test("ignores anything after the key", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey abc123 xyz" };
    expect(getAPIKey(headers)).toBe("abc123");
  });

  test("returns null when the authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when the authorization header is empty", () => {
    expect(getAPIKey({ authorization: "" })).toBeNull();
  });

  test("returns null for a different scheme", () => {
    expect(getAPIKey({ authorization: "Bearer abc123" })).toBeNull();
  });

  test("returns null when the scheme casing does not match", () => {
    expect(getAPIKey({ authorization: "apikey abc123" })).toBeNull();
  });

  test("returns null when the key is missing", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });
});
