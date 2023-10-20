import { HandlerContext, Handlers } from "$fresh/server.ts";
import { AppRegistrationRequest } from "streamdal-protos/protos/sp_external.ts";
import { ErrorType, validate } from "../components/form/validate.ts";
import {
  EmailCollectionForm,
  EmailSchema,
} from "../islands/emailCollectionForm.tsx";
import {
  rejectRegistrationEmail,
  sendRegistrationEmail,
} from "../lib/mutation.ts";
import { WithSession } from "fresh-session/mod.ts";
import { ResponseCode } from "streamdal-protos/protos/sp_common.ts";

export type SessionData = { session: Record<string, string>; message?: string };

export const handler: Handlers<> = {
  async POST(req: Request, ctx: HandlerContext<SessionData, WithSession>) {
    const { session } = ctx.state;
    const emailData = await req.formData();

    if (!emailData.get("email")) {
      void rejectRegistrationEmail();
      session.set("emailPrompted", true);
      return new Response(
        "",
        {
          status: 307,
          headers: { Location: "/" },
        },
      );
    }

    const { data: email, errors }: {
      email: AppRegistrationRequest;
      errors: ErrorType;
    } = validate(EmailSchema, emailData);

    if (errors) {
      session.flash("success", {
        status: false,
        message: "Validation failed",
        errors,
      });
      return new Response("", { status: 400 });
    }

    const response = await sendRegistrationEmail(email.email);

    if (response.code === ResponseCode.OK) {
      session.flash("success", { status: true, message: "Thanks!" });
      session.set("emailPrompted", true);
    }

    return new Response(
      "",
      {
        status: 307,
        headers: { Location: "/" },
      },
    );
  },
};

export default function EmailCollectionRoute() {
  return <EmailCollectionForm />;
}
