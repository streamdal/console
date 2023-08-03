import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/copy.tsx";
import IconDots from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/dots.tsx";
import IconTrash from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trash.tsx";

export const PipelineMenu = ({ id }: { id?: string }) => (
  <div className="z-40">
    <div
      id="pipelineMenuButton"
      data-dropdown-toggle="pipeline-menu"
      type="button"
      className="cursor-pointer z-40"
    >
      <IconDots class="w-6 h-6 ml text-lunar cursor-pointer" />
    </div>

    <div
      id="pipeline-menu"
      class="z-40 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="pipelineMenuButton"
      >
        <a href="#">
          <li className="flex flex-start items-center px-2 py-2 hover:bg-sunset text-sm">
            <IconCopy class="w-4 h-4 mr-2" />
            Duplicate Pipeline
          </li>
        </a>
        <a href="#" className={"flex items-center"}>
          <li className="group flex w-full items-center py-2 px-2 text-eyelid hover:text-white hover:bg-eyelid text-sm">
            <IconTrash class="w-4 h-4 mr-2 text-eyelid group-hover:text-white" />
            Delete
          </li>
        </a>
      </ul>
    </div>
  </div>
);