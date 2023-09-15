import { Handlers } from "$fresh/src/server/types.ts";
import { Pipeline } from "snitch-protos/protos/sp_pipeline.ts";
import { ErrorType, validate } from "../../components/form/validate.ts";
import { pipelineSchema } from "../../islands/pipeline.tsx";
import { ResponseCode } from "snitch-protos/protos/sp_common.ts";
import { upsertPipeline } from "../../lib/mutation.ts";
import { SuccessType } from "../_middleware.ts";
import { logFormData } from "../../lib/utils.ts";

export const handler: Handlers<SuccessType> = {
  async POST(req, ctx) {
    const formData = await req.formData();
    logFormData(formData);

    const { data: pipeline, errors }: {
      pipeline: Pipeline;
      errors: ErrorType;
    } = validate(
      pipelineSchema,
      formData,
    );

    const { session } = ctx.state;

    if (errors) {
      session.set("success", {
        status: false,
        message: "Validation failed",
        errors,
      });
      return new Response(
        "",
        {
          status: 307,
          headers: { Location: `/pipelines/${pipeline.id ? pipeline.id : ""}` },
        },
      );
    }

    const response = await upsertPipeline(pipeline);

    session.set("success", {
      status: response.code === ResponseCode.OK,
      message: response.code === ResponseCode.OK
        ? "Success!"
        : "Save pipeline failed. Please try again later",
      ...response.code !== ResponseCode.OK
        ? { errors: { apiError: response.message } }
        : {},
    });

    return new Response(
      "",
      {
        status: 307,
        headers: {
          Location: `/pipelines/${response.pipelineId}`,
        },
      },
    );
  },
};

export default function PipelineSaveRoute() {
  return null;
}
