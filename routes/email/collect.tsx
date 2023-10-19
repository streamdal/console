import { Handlers, RouteConfig } from "$fresh/src/server/types.ts";
import {
  EmailCollectionForm,
  EmailSchema,
} from "../../components/modals/emailCollectionForm.tsx";
import { AppRegistrationRequest } from "streamdal-protos/protos/sp_external.ts";
import { ErrorType, validate } from "../../components/form/validate.ts";
import { sendEmail } from "../../lib/mutation.ts";
import { ResponseCode } from "streamdal-protos/protos/sp_common.ts";

export const config: RouteConfig = {
  skipInheritedLayouts: true,
};

export const handler: Handlers<> = {
  async GET(req, ctx) {
    return ctx.render({});
  },
  async POST(req, ctx) {
    const emailData = await req.formData();
    const { data: email, errors }: {
      email: AppRegistrationRequest;
      errors: ErrorType;
    } = validate(EmailSchema, emailData);

    if (errors) {
      console.error(errors);
      session.flash("success", {
        status: false,
        message: "Email submission failed",
        errors,
      });
      return new Response(
        "",
        {
          status: 307,
          headers: { Location: `/` },
        },
      );
    }

    const response = await sendEmail(email.email);
    console.log("RESPONSE in handler", response);
    const { session } = ctx.state;

    session.flash("success", {
      status: response.code === ResponseCode.OK,
      message: response.code === ResponseCode.OK
        ? "Success!"
        : "Email submission failed. Please try again later",
      ...response.code !== ResponseCode.OK
        ? { errors: { apiError: response.message, status: response.code } }
        : {},
    });

    return new Response(
      "",
      {
        status: 307,
        headers: {
          Location: "/",
        },
      },
    );
  },
};

export default function Login() {
  return <EmailCollectionForm />;
}
