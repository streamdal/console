import {useState} from "preact/hooks";
import {FormInput} from "../form/formInput.tsx";
import {validate} from "../form/validate.ts";
import {zfd} from "zod-form-data";
import * as z from "zod/index.ts";


export const EmailSchema = zfd.formData({
    email: z.string().min(1, {message: "Required to submit"}),
});
export const EmailCollectionForm = (
    {verificationStatus}: { verificationStatus: any },
) => {
    const [errors, setErrors] = useState<string>("");
    const [data, setData] = useState("");

    const customTheme: CustomFlowbiteTheme["button"] = {
        color: {
            primary: "bg:red-100 hover:bg-red-600",
        },
    };

    const onSumbit = async (e: any) => {
        const emailData = new FormData(e.target);
        const {errors} = validate(EmailSchema, emailData);
        setErrors(errors || {});

        if (errors) {
            e.preventDefault();
            return;
        }
    };

    return (
        <div
            class="w-screen h-screen flex flex-col justify-center align-top items-center bg-login bg-cover bg-center  bg-no-repeat">
            <form
                class={"rounded-xl px-6 py-10 items-center bg-white w-[400px] rounded-xl px-6 py-10 items-center bg-white w-[400px]"}
                action="/email/submit"
                method="post"
                onSubmit={() => onSumbit()}
            >
                <div className={"w-full items-center"}>
                    <img
                        src={"/images/logo.svg"}
                        className={"w-16 ml-[144px] mb-4 max-w-16"}
                    />
                </div>
                <h2 className={"text-center mb-3 text-3xl font-display tracking-wide"}>
                    Please enter your email to continue
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
                        type={"submit"}
                        className={"bg-streamdalYellow btn-heimdal text-web mb-3 w-full font-bold"}
                    >
                        Get verification code
                    </button>
                </div>
            </form>
        </div>
    );
};
