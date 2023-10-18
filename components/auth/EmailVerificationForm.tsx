import { useState } from "preact/hooks";
import { LoginFormInput } from "./loginFormInput.tsx";
import { FormInput } from "../form/formInput.tsx";

export const EmailVerificationForm = () => {
  const [errors, setErrors] = useState<string>("");
  const [data, setData] = useState<string>("");

  const customTheme: CustomFlowbiteTheme["button"] = {
    color: {
      primary: "bg:red-100 hover:bg-red-600",
    },
  };

  return (
    <div class="w-screen h-screen flex flex-col justify-center align-top items-center bg-login bg-cover bg-center  bg-no-repeat">
      <form className={"rounded-xl px-6 py-10 items-center bg-white w-[400px]"}>
        <div className={"w-full items-center"}>
          <img
            src={"/images/logo.svg"}
            className={"w-16 ml-[144px] mb-4 max-w-16"}
          />
        </div>
        <h2 className={"text-center mb-3 text-3xl font-display tracking-wide"}>
          Please enter the verification code
        </h2>
        <FormInput
          name="code"
          label="Verification Code"
          errors={errors}
          data={data}
          setData={setData}
        />
        <div className={"flex flex-col items-center"}>
          <a href={"/"} className={"w-full h-[47px]"}>
            <button
              className={"bg-streamdalYellow btn-heimdal text-web mb-3 w-full font-bold"}
            >
              Verify email
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};
