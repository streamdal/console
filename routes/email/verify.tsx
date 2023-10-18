import { Handlers, PageProps, RouteConfig } from "$fresh/src/server/types.ts";
import { RuleSetType } from "../../components/rules/sets.tsx";
import { LoginForm } from "../../components/auth/loginForm.tsx";
import { EmailVerificationForm } from "../../components/auth/EmailVerificationForm.tsx";

export const config: RouteConfig = {
  skipInheritedLayouts: true,
};

export default function VerificationFormRoute() {
  return <EmailVerificationForm />;
}
