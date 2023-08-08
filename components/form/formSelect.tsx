import { ErrorType, parsePath, resolveValue, updateData } from "./validate.ts";
import { DetectiveType } from "snitch-protos/protos/steps/detective.ts";
import { isNumeric } from "../../lib/utils.ts";

export type FormSelectProps = {
  name: string;
  data: any;
  setData: (data: any) => void;
  placeHolder?: string;
  label?: string;
  errors: ErrorType;
  children: React.ReactNode;
  inputClass?: string;
  wrapperClass?: string;
};

export const FormSelect = ({
  name,
  data,
  setData,
  errors,
  label,
  children,
  placeHolder,
  inputClass,
  wrapperClass,
}: FormSelectProps) => {
  const value = resolveValue(data, name);
  return (
    <div class={`flex flex-col my-2 ${wrapperClass}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-xs mb-[3px] ${errors[name] && "text-streamdalRed"}`}
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        class={`cursor-pointer rounded-sm border outline-0 px-2 pe-6 h-[47px] border-${
          errors[name] ? "streamdalRed" : "twilight"
        } ${inputClass}`}
        value={value}
        onChange={(e) =>
          updateData(data, setData, parsePath(name), e.target.value)}
        placeholder={placeHolder}
      >
        {children}
      </select>

      <div className="text-[12px] mt-1 font-semibold text-streamdalRed">
        {errors[name]}
      </div>
    </div>
  );
};

export const optionsFromEnum = (optionsEnum: any) =>
  Object.entries(optionsEnum).filter((
    [k, _],
  ) => isNumeric(k))
    .map(([
      k,
      v,
    ], i) => (
      <option
        key={`option-type-key-${i}-${k}`}
        value={k}
        label={v}
      />
    ));