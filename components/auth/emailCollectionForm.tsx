import { useState } from "preact/hooks";
import { LoginFormInput } from "./loginFormInput.tsx";

export const EmailCollectionForm = (
  { verificationStatus }: { verificationStatus: any },
) => {
  const [error, setError] = useState<string>("");

  const customTheme: CustomFlowbiteTheme["button"] = {
    color: {
      primary: "bg:red-100 hover:bg-red-600",
    },
  };

  // const onSubmit = () = {
  //
  // }

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
          Please enter your email to continue
        </h2>
        <LoginFormInput
          name={"email"}
          label={"Email"}
        />
        <div className={"flex flex-col items-center"}>
          <a href={"/"} className={"w-full h-[47px]"}>
            <button
              className={"bg-streamdalYellow btn-heimdal text-web mb-3 w-full font-bold"}
            >
              Send verification code
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};
