import { Handlers, PageProps } from "$fresh/src/server/types.ts";
import Pipelines from "root/islands/pipelines.tsx";
import { getPipelines } from "root/lib/fetch.ts";
import { PipelineRoute } from "../index.tsx";

export const handler: Handlers<PipelineRoute> = {
  async GET(_req, ctx) {
    return ctx.render({
      pipelines: await getPipelines(),
    });
  },
  async POST(req, ctx) {
    const { session } = ctx.state;
    const success = session.flash("success");
    return ctx.render({
      success,
      pipelines: await getPipelines(),
    });
  },
};

export default function PipelinesRoute(
  props: PageProps<
    & PipelineRoute
    & {
      id: string;
    }
  >,
) {
  return (
    <Pipelines
      id={props?.params?.id}
      pipelines={props?.data?.pipelines}
      success={props?.data?.success}
    />
  );
}
