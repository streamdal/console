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
    pathname.includes("/ws/")
  ) {
    console.log("case 1");
    return ctx.next();
  } else {
    console.log("case 2");
    console.log("up here", await session(req, ctx));
    return session(req, ctx as any);
  }
};

const emailVerifier = async (
  req: Request,
  ctx: MiddlewareHandlerContext<{ isEmailVerified: boolean }>,
) => {
  if (ctx.state.isEmailVerified) {
    return ctx.next();
  }

  const { status } = await checkEmailVerified();
  console.log(status);
  switch (status) {
    case RegistrationStatus.SUBMIT:
      console.log("in switch collect");
      return new Response("", {
        status: 307,
        headers: { Location: "/email/collect" },
      });
    case RegistrationStatus.VERIFY:
      console.log("in switch verify");
      return new Response("", {
        status: 307,
        headers: { Location: "/email/verify" },
      });
    default:
      return ctx.next();
  }
};
export const handler = [sessionHandler, emailVerifier];
