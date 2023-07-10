import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RulesetType } from "../rules/rulesetAddEdit";
import { LoginFormInput } from "./loginFormInput";
import * as z from "zod";
import { useState } from "react";
import { Button, CustomFlowbiteTheme } from "flowbite-react";
import { Github, Google } from "../icons/social";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginType = z.infer<typeof loginSchema>;
export const LoginForm = () => {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, defaultValues },
  } = useForm<LoginType>({
    mode: "onBlur",
    shouldUnregister: true,
    resolver: async (data, context, options) =>
      zodResolver(loginSchema)({ ...data }, context, options),
  });

  const customTheme: CustomFlowbiteTheme["button"] = {
    color: {
      primary: "bg:red-100 hover:bg-red-600",
    },
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center align-top items-center bg-[url('/images/login/login-background.png')] bg-cover bg-center bg-no-repeat">
      <form className={"rounded-xl px-6 py-10 items-center bg-white w-[400px]"}>
        <div className={"w-full items-center"}>
          <img
            src={"/images/login/logo.svg"}
            className={"w-16 ml-[144px] mb-4 max-w-16"}
          />
        </div>
        <h2 className={"text-center mb-3 text-3xl font-display tracking-wide"}>
          Welcome Back!
        </h2>
        <LoginFormInput
          name={"email"}
          label={"Email"}
          register={register}
          error={errors["email"]?.message || ""}
        />
        <LoginFormInput
          name={"password"}
          label={"Password"}
          register={register}
          error={errors["password"]?.message || ""}
        />
        <div className={"flex flex-row justify-between items-center mb-8"}>
          <div>
            <input
              type="checkbox"
              className="appearance-none checked:bg-purple-500 focus:ring-purple-200 rounded bg-purple-50 hover:cursor-pointer"
              id="remember-me"
            />
            <label htmlFor="remember-me" className={"text-xs ml-1"}>
              Remember Me
            </label>
          </div>
          <a href="/forgot-password">
            <p className={"underline text-xs"}>Forgot your password?</p>
          </a>
        </div>
        <div className={"flex flex-col items-center"}>
          <Button
            className={
              "bg-streamdalYellow btn-heimdal text-web mb-3 w-full font-bold"
            }
          >
            Log In
          </Button>
          <div className="flex w-full py-5 items-center justify-between">
            <div className="w-[120px] border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="w-[120px] border-t border-gray-300"></div>
          </div>
          <div className={"flex justify-between w-full"}>
            <Button
              color="gray"
              size="xs"
              className="text-white bg-web hover:text-web hover:bg-streamdalYellow w-full md:max-2xl:w-[165px]"
            >
              <Github className="mr-2 h-5 w-5" />
              <p className={"text-xs"}>Sign in with Github</p>
            </Button>
            <Button
              color="gray"
              size="xs"
              className="text-white bg-web hover:text-web hover:bg-streamdalYellow w-full md:max-2xl:w-[165px]"
            >
              <Google className="mr-2 h-5 w-5" />
              <p className={"text-xs"}>Sign in with Google</p>
            </Button>
          </div>
          <div className={"flex justify-start w-full mt-8"}>
            <p className={"text-xs"}>Not Registered?</p>
            <a
              className={
                "text-xs text-purple-300 ml-1 hover:underline hover:cursor-pointer"
              }
            >
              Create an account
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
