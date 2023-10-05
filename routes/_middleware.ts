import { MiddlewareHandlerContext } from "$fresh/server.ts";
import {
  cookieSession,
  WithSession,
} from "https://deno.land/x/fresh_session@0.2.2/mod.ts";
import { ErrorType } from "../components/form/validate.ts";
import { ServiceMapper } from "../lib/serviceMapper.ts";
import { checkEmailVerified, RegistrationStatus } from "../lib/fetch.ts";

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
  "/email/verify",
];

//
// ensure session key is present
!Deno.env.get("APP_KEY") && Deno.env.set("APP_KEY", crypto.randomUUID());

export type State =
  & { success: SuccessType; serviceMap: ServiceMapper }
  & WithSession;

const session = cookieSession();

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
  ctx: MiddlewareHandlerContext<{ isEmailVerified: boolean }>,
) => {
  const { pathname } = new URL(req.url);

  if (
    ctx.state.isEmailVerified || ctx.destination !== "route" ||
    excludes.some((route) => pathname.startsWith(route))
  ) {
    return ctx.next();
  }

  const { status } = await checkEmailVerified();

  switch (status) {
    case RegistrationStatus.SUBMIT:
      return new Response("", {
        status: 307,
        headers: { Location: "/email/collect" },
      });
    case RegistrationStatus.VERIFY:
      return new Response("", {
        status: 307,
        headers: { Location: "/email/verify" },
      });
    default:
      return ctx.next();
  }
};
export const handler = [sessionHandler, emailVerifier];
