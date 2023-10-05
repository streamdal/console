import { PageProps } from "$fresh/src/server/types.ts";
import { RuleSetType } from "../components/rules/sets.tsx";
import { LoginForm } from "../components/auth/loginForm.tsx";

import { RouteConfig } from "$fresh/server.ts";
import { getPipelines } from "../lib/fetch.ts";

export const config: RouteConfig = {
  skipInheritedLayouts: true,
};

export const handler: Handlers<> = {
  async GET(req, ctx) {
    return ctx.render({
      verified: false,
      email: true,
    });
  },
};

export default function Login(props: PageProps<RuleSetType>) {
  return <LoginForm verificationStatus={props.data} />;
}
