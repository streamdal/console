import { SuccessType } from "../routes/_middleware.ts";
import { FormInput } from "../components/form/formInput.tsx";
import { FormSelect, optionsFromEnum } from "../components/form/formSelect.tsx";
import { FormHidden } from "../components/form/formHidden.tsx";
import { ErrorType, validate } from "../components/form/validate.ts";
import { useEffect, useState } from "preact/hooks";
import { zfd } from "https://esm.sh/v130/zod-form-data@2.0.1/denonext/zod-form-data.mjs";
import { z } from "zod/index.ts";
import {
  NotificationEmail_Type,
  NotificationPagerDuty_Urgency,
  NotificationType,
} from "snitch-protos/protos/sp_notify.ts";
import { CheckboxGroup } from "../components/form/checkboxGroup.tsx";

const slack = {
  botToken: "",
  channel: "",
};

const emailSMTP = {
  type: "SMTP",
};

const newEmailSESConfig = {
  type: "SES",
};

const newEmailSMTPConfig = {
  oneOfKind: "email",
  email: emailSMTP,
};

const newNotificationConfig = {
  name: "",
  type: "1",
  config: {
    oneofKind: "slack",
    slack: slack,
  },
};

enum smtpUseTlsOptions {
  UNSET,
  TRUE,
  FALSE,
}

const NotificationTypeEnum = z.nativeEnum(NotificationType);
const EmailNotificationTypeEnum = z.nativeEnum(NotificationEmail_Type);
const NotificationPaterDutyUrgencyEnum = z.nativeEnum(
  NotificationPagerDuty_Urgency,
);

const SMTPEmailNotificationSchema = z.object({
  host: z.string().min(1, { message: "Required" }),
  port: z.number({ message: "Required" }).int(),
  user: z.string().min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Required" }),
  useTls: z.boolean({ message: "Required" }),
});

const SESEmailNotificationSchema = z.object({
  sesRegion: z.string().min(1, { message: "Required" }),
  sesAccessKeyId: z.string().min(1, { message: "Required" }),
  sesSecretAccessKey: z.string().min(1, { message: "Required" }),
});

const EmailNotificationKindSchema = z.discriminatedUnion("oneofKind", [
  z.object({
    oneofKind: z.literal("smtp"),
    smtp: SMTPEmailNotificationSchema,
  }),
  z.object({
    oneofKind: z.literal("ses"),
    ses: SESEmailNotificationSchema,
  }),
]);

const NotificationKindSchema = z.discriminatedUnion("oneofKind", [
  z.object({
    oneofKind: z.literal("slack"),
    slack: z.object({
      botToken: z.string().min(1, { message: "Required" }),
      channel: z.string().min(1, { message: "Required" }),
    }),
  }),
  z.object({
    oneofKind: z.literal("email"),
    email: z.object({
      type: zfd.numeric(EmailNotificationTypeEnum),
      recipients: zfd.repeatable(z.array(z.string()).default([])),
      fromAddress: z.string().min(1, { message: "Required" }),
      config: EmailNotificationKindSchema,
    }),
  }),
  z.object({
    oneofKind: z.literal("pagerduty"),
    pagerduty: z.object({
      token: z.string().min(1, { message: "Required" }),
      email: z.string().min(1, { message: "Required" }),
      serviceId: z.string().min(1, { message: "Required" }),
      urgency: zfd.numeric(NotificationPaterDutyUrgencyEnum),
    }),
  }),
]);

export const NotificationSchema = zfd.formData({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Required" }),
  type: zfd.numeric(NotificationTypeEnum),
  config: NotificationKindSchema,
});

export const NotificationDetail = (success: SuccessType) => {
  const e: ErrorType = {};

  const [errors, setErrors] = useState({});
  const [data, setData] = useState(newNotificationConfig);
  console.log("shit", data);
  console.log("hello", NotificationType[data?.type]);

  const onSubmit = async (e: any) => {
    const notificationFormData = new FormData(e.target);
    const { errors } = validate(NotificationSchema, notificationFormData);
    setErrors(errors || {});

    if (errors) {
      e.preventDefault();
      return;
    }
  };

  useEffect(() => {
    if (data?.type === "2") {
      setData({
        ...data,
        config: {
          email: {},
        },
      });
    }
    if (data?.type === "1") {
      setData({
        ...data,
        config: {
          ...newEmailSESConfig,
        },
      });
    }
  }, [data.type]);

  // useEffect(() => {
  //   if (data?.config.email.type) {
  //     setData({
  //       ...data,
  //       config: {},
  //     });
  //   }
  // }, [data?.config.email.type]);

  return (
    <form
      onSubmit={onSubmit}
      action="/notifications/configure"
      method="post"
    >
      <div class="flex justify-between rounded-t items-center w-full min-w-full px-[18px] pt-[18px] pb-[8px]">
        <div class="flex flex-row items-center w-full justify-center">
          <div class="text-[16px] font-medium mr-2 h-[54px] w-full">
            <FormInput
              name="name"
              data={data}
              setData={setData}
              label="Notification Name"
              placeHolder=""
              errors={errors}
              wrapperClass={"w-full"}
            />
            <FormSelect
              name={"type"}
              data={data}
              setData={setData}
              label="Notification Type"
              errors={errors}
              inputClass="w-36"
              children={optionsFromEnum(NotificationType)}
            />
            <FormHidden
              name={`config.oneofKind.${
                NotificationType[data?.type].toLowerCase()
              }`}
              value={NotificationType[data?.type].toLowerCase()}
            />
            {data?.type === NotificationType.SLACK.toString() &&
              (
                <>
                  <h2 className="mb-6 w-full">
                    In order to get Slack Alerts, you'll need to provide a Slack
                    API token. To generate a token, follow the instructions{" "}
                    <a
                      href="https://api.slack.com/tutorials/tracks/getting-a-token"
                      target="_new"
                      className="underline underline-offset-2"
                    >
                      here
                    </a>
                    .
                  </h2>
                  <FormInput
                    name={`config.slack.botToken`}
                    data={data}
                    setData={setData}
                    label="Slack token"
                    placeHolder=""
                    errors={errors}
                    wrapperClass={"w-full"}
                  />
                  <FormInput
                    name={`config.slack.channel`}
                    data={data}
                    setData={setData}
                    label="Slack Channel"
                    placeHolder=""
                    errors={errors}
                    wrapperClass={"w-full"}
                  />
                </>
              )}
            {data?.type === NotificationType.EMAIL.toString() && (
              <>
                <FormSelect
                  name={"config.email.type"}
                  data={data}
                  setData={setData}
                  label="Email Notification Type"
                  errors={errors}
                  inputClass="w-36"
                  children={optionsFromEnum(NotificationEmail_Type)}
                />
                {data?.config.email?.type ===
                    NotificationEmail_Type.SMTP.toString() &&
                  (
                    <div class={"flex-col"}>
                      <div class={"flex"}>
                        <FormInput
                          name={"config.email.config.smtp.host"}
                          data={data}
                          setData={setData}
                          label="Host name"
                          placeHolder=""
                          errors={errors}
                          wrapperClass={"w-[225px] mr-2"}
                        />
                        <FormInput
                          name={"config.email.config.smtp.port"}
                          data={data}
                          setData={setData}
                          label="Port"
                          placeHolder=""
                          errors={errors}
                          wrapperClass={"w-[225px]"}
                        />
                      </div>
                      <div class={"flex"}>
                        <FormInput
                          name={"config.email.config.smtp.user"}
                          data={data}
                          setData={setData}
                          label="User"
                          placeHolder=""
                          errors={errors}
                          wrapperClass={"w-[225px] mr-2"}
                        />
                        <FormInput
                          name={"config.email.config.smtp.password"}
                          data={data}
                          setData={setData}
                          label="Password"
                          placeHolder=""
                          errors={errors}
                          wrapperClass={"w-[225px]"}
                        />
                      </div>

                      <CheckboxGroup
                        name={"config.email.config.smtp.useTls"}
                        data={data}
                        label={"Use Tls?"}
                        options={smtpUseTlsOptions}
                        errors={errors}
                      />
                    </div>
                  )}
                {data?.config.email?.type ===
                    NotificationEmail_Type.SES.toString() &&
                  (
                    <>
                      <FormInput
                        name={"config.email.config.ses.sesRegion"}
                        data={data}
                        label="Region"
                        setData={setData}
                        errors={errors}
                      />
                      <FormInput
                        name={"config.email.config.ses.sesAccessKeyId"}
                        data={data}
                        label="Access Key Id"
                        setData={setData}
                        errors={errors}
                      />
                      <FormInput
                        name={"config.email.config.ses.sesSecretAccessKey"}
                        data={data}
                        label="Secret Access Key"
                        setData={setData}
                        errors={errors}
                      />
                    </>
                  )}
              </>
            )}
            <div class="flex flex-row justify-center items-center">
              <button
                className="btn-heimdal"
                type="submit"
              >
                Configure Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
