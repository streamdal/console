import { useState } from "preact/hooks";
import { FormInput } from "../components/form/formInput.tsx";
import { validate } from "../components/form/validate.ts";
import { zfd } from "zod-form-data";
import * as z from "zod/index.ts";

export const EmailSchema = zfd.formData({
  email: z.string().email({ message: "Must be a valid email." }).optional().or(
    z.literal(""),
  ),
});
export const EmailCollectionForm = () => {
  const [errors, setErrors] = useState<string>("");
  const [data, setData] = useState("");

  const onSubmit = async (e: any) => {
    const emailData = new FormData(e.target);
    const { errors } = validate(EmailSchema, emailData);
    setErrors(errors || {});

    if (errors) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div class="w-screen h-screen flex flex-col justify-center align-top items-center bg-login bg-cover bg-center  bg-no-repeat">
      <form
        class={"rounded-xl px-6 py-10 items-center bg-white w-[400px] rounded-xl px-6 py-10 items-center bg-white w-[400px]"}
        method="post"
        onSubmit={onSubmit}
      >
        <div className={"w-full items-center"}>
          <img
            src={"/images/logo.svg"}
            className={"w-16 ml-[144px] mb-4 max-w-16"}
          />
        </div>
        <h2 className={"text-center mb-3 text-3xl font-display tracking-wide"}>
          We'd love to send you updates!
        </h2>
        <FormInput
          name="email"
          label="Email"
          errors={errors}
          data={data}
          setData={setData}
        />
        <div className={"flex flex-col items-center"}>
          <button
            type="submit"
            className={"bg-streamdalYellow btn-heimdal text-web mb-3 w-full font-bold"}
          >
            Send
          </button>
          <button
            type="submit"
            className="btn-secondary mr-2 w-full"
          >
            No thanks
          </button>
        </div>
      </form>
    </div>
  );
};
