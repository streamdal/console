import IconX from "tabler-icons/tsx/x.tsx";
import { Audience } from "snitch-protos/protos/sp_common.ts";
import { Pipeline } from "snitch-protos/protos/sp_pipeline.ts";
import { getAudienceOpRoute } from "../../lib/utils.ts";
import { opModal } from "../serviceMap/opModalSignal.ts";
import { opUpdateSignal } from "../../islands/serviceMap.tsx";
import { Toast, toastSignal } from "../toasts/toast.tsx";
import { useState } from "preact/hooks";

export const DeleteOperationModal = (
  { audience, pipeline }: {
    audience: Audience;
    pipeline?: Pipeline;
  },
) => {
  const [open, setOpen] = useState(true);
  const close = () => opModal.value = null;

  const deleteOp = async () => {
    const response = await fetch(
      `${getAudienceOpRoute(audience)}/delete`,
      {
        method: "POST",
      },
    );

    const { success } = await response.json();

    if (success.message) {
      toastSignal.value = {
        id: "operationDelete",
        type: success.status ? "success" : "error",
        message: success.message,
      };
      opModal.value.delete = false;
      setOpen(false);
      opUpdateSignal.value = null;
    }
  };

  return (
    <>
      <Toast id={"operationDelete"} />
      {open && (
        <div
          class={"absolute top-[8%] left-[35%] z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 max-h-[80vh]"}
        >
          <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg border border-burnt shadow-xl shadow-burnt">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                onClick={close}
              >
                <IconX class="w-6 h-6" />
              </button>
              <div class="p-6 text-center">
                {pipeline
                  ? (
                    <>
                      <div class="my-4">
                        <p class={"text-medium font-bold mb-2"}>
                          A pipeline is attached to this operation
                        </p>
                        <p class={"text-medium"}>
                          Do you want to detach{"  "}
                          <span class="text-medium font-italic ">
                            {pipeline.name}
                          </span>{" "}
                          and delete operation?
                        </p>
                      </div>
                    </>
                  )
                  : (
                    <>
                      <div class="my-4">
                        <p class={"text-medium font-bold"}>
                          Are you sure you want to delete this operation?
                        </p>
                      </div>
                    </>
                  )}

                <button
                  className="btn-secondary mr-2"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  class="btn-heimdal"
                  type="submit"
                  onClick={deleteOp}
                >
                  {`${pipeline ? "Detach and Delete" : "Delete"}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
