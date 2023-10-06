import { PageProps, RouteConfig } from "$fresh/src/server/types.ts";
import { RuleSetType } from "../../components/rules/sets.tsx";
import { LoginForm } from "../../components/auth/loginForm.tsx";
import { EmailVerificationForm } from "../../components/auth/EmailVerificationForm.tsx";

export const config: RouteConfig = {
  skipInheritedLayouts: true,
};

export const handler: Handlers<> = {
  async POST(req, ctx) {
    //this doesn't exist yet
    // const response = sendEmail();
    const email = await req.formData();
    console.log("to be verified");

    //If success, then render the email verification for below
    //If fail, then redirect back to /email/collect
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
