import { PageProps, RouteConfig } from "$fresh/src/server/types.ts";
import { RuleSetType } from "../../components/rules/sets.tsx";
import { LoginForm } from "../../components/auth/loginForm.tsx";
import { EmailCollectionForm } from "../../components/auth/emailCollectionForm.tsx";

export const config: RouteConfig = {
  skipInheritedLayouts: true,
};

export const handler: Handlers<> = {
  async GET(_req, ctx) {
    const {session} = ctx.state;
  }
};

export default function Login() {
  return <EmailCollectionForm />;
}
