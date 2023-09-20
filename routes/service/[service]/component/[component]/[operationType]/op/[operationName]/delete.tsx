import { Handlers } from "$fresh/src/server/types.ts";
import { getAudienceFromParams } from "../../../../../../../../lib/utils.ts";
import { deleteAudience } from "../../../../../../../../lib/mutation.ts";
import { ResponseCode } from "snitch-protos/protos/sp_common.ts";

export const handler: Handlers<> = {
  async POST(req, ctx) {
    console.log("shit", ctx.params);
    const audience = getAudienceFromParams(ctx.params);
    const response = await deleteAudience(audience);

    return new Response("", {
      status: 307,
      success: {
        status: response.code === ResponseCode.OK,
        message: response.code === ResponseCode.OK
          ? "Successfully deleted"
          : response.message,
      },
      headers: { Location: "/" },
    });
  },
};

export default function DeleteAudienceRoute() {
  return null;
}
