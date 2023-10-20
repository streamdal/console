import {
  Audience,
  ResponseCode,
  StandardResponse,
} from "streamdal-protos/protos/sp_common.ts";
import { client, meta } from "./grpc.ts";
import { Pipeline } from "streamdal-protos/protos/sp_pipeline.ts";
import {
  AppRegisterRejectRequest,
  AppRegistrationRequest,
  AttachPipelineRequest,
  CreateNotificationRequest,
  DeleteAudienceRequest,
  DeleteServiceRequest,
  DetachPipelineRequest,
  PausePipelineRequest,
} from "streamdal-protos/protos/sp_external.ts";
import { NotificationConfig } from "streamdal-protos/protos/sp_notify.ts";

export type PatchedPipelineResponse = StandardResponse & {
  pipelineId?: string;
};
export const upsertPipeline = async (
  pipeline: Pipeline,
): Promise<PatchedPipelineResponse> => {
  if (pipeline.id) {
    const { response: updateResponse } = await client
      .updatePipeline(
        { pipeline },
        meta,
      );
    return { ...updateResponse, pipelineId: pipeline.id };
  }

  const { response: createResponse } = await client
    .createPipeline({ pipeline }, meta);

  //
  // Create pipeline returns a non-standard response with no code so
  // we have to handle it specifically
  return {
    ...createResponse,
    id: "createPipelineRequest",
    pipelineId: createResponse.pipelineId,
    code: createResponse.pipelineId
      ? ResponseCode.OK
      : ResponseCode.INTERNAL_SERVER_ERROR,
  };
};

export const deletePipeline = async (
  pipelineId: string,
): Promise<StandardResponse> => {
  const { response }: { response: StandardResponse } = await client
    .deletePipeline(
      { pipelineId },
      meta,
    );

  return response;
};

export const attachPipeline = async (
  pipelineId: string,
  audience: Audience,
) => {
  try {
    const request: AttachPipelineRequest = { audience, pipelineId };
    const { response } = await client.attachPipeline(
      request,
      meta,
    );
    return response;
  } catch (error) {
    return {
      id: "attachPipelineRequest",
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const detachPipeline = async (
  pipelineId: string,
  audience: Audience,
) => {
  try {
    const request = DetachPipelineRequest.create({ audience, pipelineId });
    const { response } = await client.detachPipeline(
      request,
      meta,
    );
    return response;
  } catch (error) {
    console.error("error detaching pipeline", error);
    return {
      id: "detachPipelineRequest",
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const createNotification = async (
  notificationConfig: NotificationConfig,
) => {
  try {
    const request: CreateNotificationRequest = {
      notification: notificationConfig,
    };
    const { response } = await client.createNotification(
      request,
      meta,
    );
    return response;
  } catch (error) {
    console.error("error configuring notifications", error);
    return {
      id: "configNotificationRequest",
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const pausePipeline = async (
  pipelineId: string,
  audience: Audience,
) => {
  try {
    const request: PausePipelineRequest = { audience, pipelineId };
    const { response } = await client.pausePipeline(
      request,
      meta,
    );
    return response;
  } catch (error) {
    console.error("error pausing pipeline", error);
    return {
      id: "pausePipelineRequest",
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const deleteAudience = async (audience: Audience, force: boolean) => {
  try {
    const request: DeleteAudienceRequest = { audience, force };
    const { response } = await client.deleteAudience(
      request,
      meta,
    );
    return response;
  } catch (error) {
    console.error("error deleting audience", error);
    return {
      id: "deleteAudienceRequest",
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const deleteService = async (serviceName: string) => {
  try {
    const request: DeleteServiceRequest = { serviceName, force: true };
    const { response } = await client.deleteService(
      request,
      meta,
    );
    return response;
  } catch (error) {
    console.error("error deleting service", error);
    return {
      id: "deleteServiceRequest",
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const sendRegistrationEmail = async (email: string) => {
  try {
    const request = AppRegistrationRequest.create({ email });
    const { response } = await client.appRegister(request, meta);
    return response;
  } catch (error) {
    console.error("error sending registration email", error);
    return {
      id: "appRegistrationRequest",
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const rejectRegistrationEmail = async () => {
  try {
    const { response } = await client.appRegisterReject(
      AppRegisterRejectRequest.create(),
      meta,
    );
    return response;
  } catch (error) {
    console.error("error sending registration email reject", error);
    return {
      id: "appRegistrationRejectRequest",
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};
