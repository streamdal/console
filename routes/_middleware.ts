import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { cookieSession, WithSession } from "fresh-session/mod.ts";
import { ErrorType } from "../components/form/validate.ts";
import { DEMO, PRODUCTION } from "../lib/configs.ts";

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
const session = await cookieSession();

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
    !PRODUCTION || DEMO ||
    emailPrompted || ctx.destination !== "route" ||
    emailExcludes.some((route) => pathname.startsWith(route))
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
