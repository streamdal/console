import { PageProps, RouteConfig } from "$fresh/src/server/types.ts";
import { RuleSetType } from "../../components/rules/sets.tsx";
import { LoginForm } from "../../components/auth/loginForm.tsx";
import { EmailVerificationForm } from "../../components/auth/EmailVerificationForm.tsx";

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
  console.log("here");
  return <EmailVerificationForm />;
}
