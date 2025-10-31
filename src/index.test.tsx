import { describe, it, expect } from "bun:test";
import { server } from "./index";

const domain = `http://${server.hostname}:${server.port}`;

describe("Bun React App API", () => {
  it("should return HTML for the root route", async () => {
    // Note: We use the global fetch() here
    const res = await fetch(`${domain}/`);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/html");
  });

  it("should handle GET requests to /api/hello", async () => {
    const res = await fetch(`${domain}/api/hello`);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({
      message: "Hello, world!",
      method: "GET",
    });
  });

  it("should handle PUT requests to /api/hello", async () => {
    const res = await fetch(`${domain}/api/hello`, { method: "PUT" });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({
      message: "Hello, world!",
      method: "PUT",
    });
  });

  it("should handle dynamic routes like /api/hello/:name", async () => {
    const name = "Tester";
    const res = await fetch(`${domain}/api/hello/${name}`);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({
      message: `Hello, ${name}!`,
    });
  });
});