import {Handlers} from "$fresh/src/server/types.ts";
import {sendEmail} from "../../lib/mutation.ts";
import {ResponseCode} from "streamdal-protos/protos/sp_common.ts";
import {AppRegistrationRequest} from "streamdal-protos/protos/sp_external.ts";
import {ErrorType, validate} from "../../components/form/validate.ts";
import {EmailSchema} from "../../components/modals/emailCollectionForm.tsx";

export const handler: Handlers<> = {
    async POST(req, ctx) {
        console.log(ctx.params);
        const emailData = await req.formData();
        const {data: email, errors}: {
            email: AppRegistrationRequest;
            errors: ErrorType
        } = validate(EmailSchema, emailData)
        const response = await sendEmail(email.email);
        const {session} = ctx.state;

        return new Response(
            JSON.stringify({
                status: 307,
                success: {
                    status: response.code === ResponseCode.OK,
                    message: response.code === ResponseCode.OK
                        ? "Email successfully sent"
                        : response.message,
                },
                headers: {Location: "/"},
            }),
            {status: response.code === ResponseCode.OK ? 200 : 400},
        );
    },
};

export default function submitEmailRoute() {
    return null;
}
