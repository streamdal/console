import { Handlers } from "$fresh/src/server/types.ts";
import { serviceSignal } from "../../../components/serviceMap/serviceSignal.ts";
import { ResponseCode } from "streamdal-protos/protos/sp_common.ts";
import { getAttachedPipeline } from "../../../lib/utils.ts";
import {
  deleteAudience,
  deleteService,
  detachPipeline,
} from "../../../lib/mutation.ts";

export const handler: Handlers<> = {
  async POST(req, ctx) {
    const serviceName = ctx.params.service;
    const response = deleteService(serviceName);
    console.log(response);
    // const pipelines = serviceSignal.value.pipelines;
    // const config = serviceSignal.value.config;
    // const audiences = serviceSignal.value.audiences.filter((a) =>
    //   a.serviceName === ctx.params.service
    // );
    // const responses = audiences.map(async (a) => {
    //   const attachedPipeline = await getAttachedPipeline(
    //     a,
    //     pipelines,
    //     config,
    //   );
    //   if (attachedPipeline) {
    //     return await detachPipeline(attachedPipeline.id, a);
    //   }
    //   if (!attachedPipeline || response?.code === ResponseCode.OK) {
    //     return await deleteAudience(a);
    //   }
    // });
    //
    // const response = await responses.find((r) => r.code !== ResponseCode.OK) ||
    //   responses.find((r) => r.code === ResponseCode.OK);

    // return new Response(
    //   JSON.stringify({
    //     status: 307,
    //     success: {
    //       status: response.code === ResponseCode.OK,
    //       message: response.code === ResponseCode.OK
    //         ? "Successfully deleted"
    //         : response.message,
    //     },
    //     headers: { Location: "/" },
    //   }),
    //   { status: response.code === ResponseCode.OK ? 200 : 400 },
    // );
  },
};

export default function DeleteServiceRoute() {
  return null;
}
