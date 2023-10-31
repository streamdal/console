import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { redisSession, WithSession } from "fresh-session/mod.ts";
import { ErrorType } from "../components/form/validate.ts";
import { DEMO, PRODUCTION } from "../lib/configs.ts";
import { connect } from "https://deno.land/x/redis/mod.ts";

export type SuccessType = {
  status: boolean;
  message: string;
  errors?: ErrorType;
};

export type SuccessRoute = {
  success: SuccessType;
};

const sessionExcludes = [
  "/ws",
];

const emailExcludes = [
  ...sessionExcludes,
  "/email",
];


export type SessionState = WithSession;
const redis = await connect({
  hostname: Deno.env.get("STREAMDAL_CONSOLE_REDIS_HOST") || "localhost",
  port: Deno.env.get("STREAMDAL_CONSOLE_REDIS_PORT") || 6379,
})

const session = redisSession(redis, {
  maxAge: 1000,
});

const sessionHandler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<SessionState>,
) => {
  const { pathname } = new URL(req.url);

  if (
    sessionExcludes.some((route) => pathname.startsWith(route))
  ) {
    return ctx.next();
  } else {
    return session(req, ctx);
  }
};

const emailPromptHandler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<SessionState>,
) => {
  const { pathname } = new URL(req.url);
  const { session } = ctx.state;
  const emailPrompted = session?.get("emailPrompted");

  if (
    emailPrompted || ctx.destination !== "route" ||
    emailExcludes.some((route) => pathname.startsWith(route)) ||
    PRODUCTION !== "true" ||
    DEMO === "true"
  ) {
    return ctx.next();
  }

  if (!emailPrompted) {
    return new Response(null, {
      status: 307,
      headers: { Location: "/email" },
    });
  }

  return ctx.next();
};

export const handler = [sessionHandler, emailPromptHandler];
