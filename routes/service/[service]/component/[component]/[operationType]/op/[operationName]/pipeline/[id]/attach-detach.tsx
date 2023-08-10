import { Handlers } from "$fresh/src/server/types.ts";
import { getPipeline } from "../../../../../../../../../../lib/fetch.ts";
import { SuccessType } from "../../../../../../../../../_middleware.ts";
import { ResponseCode } from "snitch-protos/protos/common.ts";

export const handler: Handlers<SuccessType> = {
  async POST(req, ctx) {
    const attachFormData = await req.formData();
    const response = await getPipeline(ctx.params.id);

    const { session } = ctx.state;

    session.set("success", {
      status: response.code === ResponseCode.OK,
      message: response.code === ResponseCode.OK
        ? "Success!"
        : "Pipeline attachment failed. Please try again later",
      ...response.code !== ResponseCode.OK
        ? { errors: { apiError: response.message } }
        : {},
    });

    return new Response(
      "",
      {
        status: 307,
        headers: {
          Location:
            `/service/${ctx.params.service}/component/${ctx.params.component}/op/${ctx.params.operationName}`,
        },
      },
    );
  },
};

export default function AttachPipeLineRoute(props) {
  console.log(props.params);
  return null;
}
