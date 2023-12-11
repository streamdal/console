import { DetectiveType } from "streamdal-protos/protos/steps/sp_steps_detective.ts";
import { FormInput } from "../form/formInput.tsx";
import { ErrorType } from "../form/validate.ts";
import { useState } from "preact/hooks";
import IconTrash from "tabler-icons/tsx/trash.tsx";
import IconPlus from "tabler-icons/tsx/plus.tsx";
import { Tooltip } from "../tooltip/tooltip.tsx";
import { FormSelect, optionsFromEnum } from "../form/formSelect.tsx";
import { NotificationType } from "streamdal-protos/protos/sp_notify.ts";
import { titleCase } from "../../lib/utils.ts";

export const oneArgTypes: (keyof typeof DetectiveType)[] = [
  "STRING_EQUAL",
  "REGEX",
  "STRING_LENGTH_MIN",
  "STRING_LENGTH_MAX",
  "NUMERIC_EQUAL_TO",
  "STRING_CONTAINS_ANY",
  "STRING_CONTAINS_ALL",
  "NUMERIC_GREATER_THAN",
  "NUMERIC_GREATER_EQUAL",
  "NUMERIC_LESS_THAN",
  "NUMERIC_LESS_EQUAL",
  "NUMERIC_MIN",
  "NUMERIC_MAX",
  "IS_TYPE",
];

export const nArgTypes: (keyof typeof DetectiveType)[] = [
  "STRING_LENGTH_RANGE",
  "NUMERIC_RANGE",
];

export const argTypes = [...oneArgTypes, ...nArgTypes];

export type StepArgType = {
  stepIndex: number;
  argIndex: number;
  data: any;
  setData: (data: any) => void;
  errors: ErrorType;
};

export type StepArgsType = {
  stepIndex: number;
  type: keyof typeof DetectiveType;
  data: any;
  setData: (data: any) => void;
  errors: ErrorType;
};

export const StepArg = (
  { stepIndex, argIndex, data, setData, errors }: StepArgType,
) => (
  <FormInput
    name={`steps.${stepIndex}.step.detective.args.${argIndex}`}
    data={data}
    setData={setData}
    label="Arg"
    errors={errors}
    inputClass="w-full"
    wrapperClass="w-full"
  />
);

export const StepArgs = (
  { stepIndex, type, data, setData, errors }: StepArgsType,
) => {
  //
  // Peek into step to see how many args there are so we
  // can tell the ui how many args to render initially
  const length = data?.steps[stepIndex]
    ?.step[data?.steps[stepIndex]?.step?.oneofKind]?.args?.length || 1;

  const [args, setArgs] = useState(Array.from({ length }, (v, k) => k));

  return type === "IS_TYPE"
    ? (
      <FormSelect
        name={`steps.0.step.detective.args.0`}
        data={data}
        setData={setData}
        label="Type"
        errors={errors}
        inputClass="w-36"
        children={["string", "number", "boolean", "array", "object", "null"]
          .map((s, i) => (
            <option
              key={`is-type-arg-key-${i}`}
              value={s}
              label={titleCase(s)}
            />
          ))}
      />
    )
    : oneArgTypes.filter((a: string) =>
        !["STRING_CONTAINS_ANY", "STRING_CONTAINS_ALL"].includes(a)
      ).includes(type)
    ? (
      <StepArg
        stepIndex={stepIndex}
        argIndex={0}
        data={data}
        setData={setData}
        errors={errors}
      />
    )
    : (
      <div className="flex flex-col mb-2 border rounded-sm px-2 w-full">
        {args.map((i) => (
          <div
            className="flex flex-row justify-between items-center w-full"
            key={`rule-arg-key-${i}`}
          >
            <StepArg
              stepIndex={stepIndex}
              argIndex={i}
              data={data}
              setData={setData}
              errors={errors}
            />
            {args.length > 1 &&
              (
                <IconTrash
                  class="w-5 h-5 mt-3 ml-2 text-eyelid cursor-pointer"
                  onClick={() => setArgs(args.filter((index) => index !== i))}
                />
              )}
            <IconPlus
              data-tooltip-target="arg-add"
              class="w-5 h-5 mt-3 ml-2 cursor-pointer"
              onClick={() => setArgs([...args, args.length])}
            />
            <Tooltip targetId="arg-add" message="Add an arg" />
          </div>
        ))}
      </div>
    );
};
