import { load } from "$std/dotenv/mod.ts";

const env = await load();

//
// fresh session needs an "APP_KEY" in the deno env
Deno.env.set(
  "APP_KEY",
  env["STREAMDAL_CONSOLE_SESSION_KEY"] ?? crypto.randomUUID(),
);
export const GRPC_URL = env["STREAMDAL_CONSOLE_GRPC_WEB_URL"] ??
  Deno.env.get("STREAMDAL_CONSOLE_GRPC_WEB_URL") ?? "http://localhost:9091";
export const GRPC_TOKEN = env["STREAMDAL_CONSOLE_GRPC_AUTH_TOKEN"] ??
  Deno.env.get("STREAMDAL_CONSOLE_GRPC_AUTH_TOKEN");
export const PRODUCTION = env["STREAMDAL_CONSOLE_PRODUCTION"] ??
  Deno.env.get("STREAMDAL_CONSOLE_PRODUCTION");
export const DEMO = env["STREAMDAL_CONSOLE_DEMO"] ??
  Deno.env.get("STREAMDAL_CONSOLE_DEMO");
