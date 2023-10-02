import { opModal } from "../serviceMap/opModalSignal.ts";

export const SchemaModal = ({ schema }: { schema: string }) => {
  return (
    <div
      id="schemaModal"
      aria-modal="true"
      class="absolute mt-12 z-40 w-full h-full px-4 py-2 max-h-full justify-center items-center flex"
      role="dialog"
    >
      <div class="relative h-full w-[700px] min-w-[400px] max-w-5xl">
        <div class="flex justify-center relative bg-white h-5/6 overflow-y-auto rounded-lg shadow-2xl shadow-stormCloud">
          <a
            href="/"
            className="flex justify-center items-center absolute right-0 w-10 h-10"
          >
            <button
              type="button"
              className="flex justify-center items-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
