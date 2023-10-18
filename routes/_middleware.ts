import { MiddlewareHandlerContext } from "$fresh/server.ts";
import {
  cookieSession,
  WithSession,
} from "https://deno.land/x/fresh_session@0.2.2/mod.ts";
import { ErrorType } from "../components/form/validate.ts";
import { ServiceMapper } from "../lib/serviceMapper.ts";

export type SuccessType = {
  status: boolean;
  message: string;
  errors?: ErrorType;
};

export type SuccessRoute = {
  success: SuccessType;
};

const excludes = [
  "/ws",
  "/email/collect",
  "/email/submit",
  "/email/verify",
];

//
// ensure session key is present
!Deno.env.get("APP_KEY") && Deno.env.set("APP_KEY", crypto.randomUUID());

export type State =
  & { success: SuccessType; serviceMap: ServiceMapper }
  & WithSession;

const session = await cookieSession();

const sessionHandler = async (
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) => {
  const { pathname } = new URL(req.url);

  if (
    ctx.destination !== "route" ||
    excludes.some((route) => pathname.startsWith(route))
  ) {
    return ctx.next();
  } else {
    return session(req, ctx as any);
  }
};

const emailVerifier = async (
  req: Request,
  ctx: MiddlewareHandlerContext<{ isReturning: boolean }>,
) => {
  const { pathname } = new URL(req.url);
  console.log(ctx.state.isReturning);

  if (
    ctx.state.isReturning || ctx.destination !== "route" ||
    excludes.some((route) => pathname.startsWith(route))
  ) {
    return ctx.next();
  } else if (!ctx.state.isReturning) {
    return new Response("", {
      status: 307,
      headers: { Location: "/email/collect" },
    });
  }
  //check if isReturning is true (get cookie flag), if false => redirect to
  // email/collect
};
export const handler = [sessionHandler, emailVerifier];
