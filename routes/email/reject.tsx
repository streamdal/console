import { Handlers } from "$fresh/src/server/types.ts";
import { rejectEmailCollection } from "../../lib/mutation.ts";
import { ResponseCode } from "streamdal-protos/protos/sp_common.ts";

export const handler: Handlers<> = {
  async POST(req, ctx) {
    const response = await rejectEmailCollection();

    const { session } = ctx.state;

    session.flash("success", {
      status: response.code === ResponseCode.OK,
      message: response.code === ResponseCode.OK
        ? "Success!"
        : "Registration rejection failed. Please try again later",
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
