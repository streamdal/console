import IconListCheck from "tabler-icons/tsx/list-check.tsx";
import IconMenu2 from "tabler-icons/tsx/menu-2.tsx";
import IconBell from "tabler-icons/tsx/bell.tsx";

export const NavMenu = () => {
  return (
    <>
      <div
        data-modal-target="nav-menu"
        data-modal-toggle="nav-menu"
        class="cursor-pointer"
        type="button"
      >
        <IconMenu2 class="w-6 h-6" />
      </div>
      <div
        id="nav-menu"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 "
      >
        <ul class="font-medium bg-white absolute top-[70px] left-0 ml-4 w-64 rounded border shadow">
          <li>
            <a
              href="/"
              className="flex items-center p-2 text-gray-900 hover:bg-sunset group "
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span class="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/pipelines"
              className="flex items-center p-2 text-gray-900 hover:bg-sunset group"
            >
              <IconListCheck class="w-6 h-6 text-gray-500" />
              <span class="ml-3">Pipelines</span>
            </a>
          </li>
          <li>
            <a
              href="/notifications"
              className="flex items-center p-2 text-gray-400 hover:bg-sunset group cursor-not-allowed"
            >
              <IconBell class="w-6 h-6 text-gray-400" />
              <span class="ml-3">Notifications</span>
            </a>
          </li>
          <li class="cursor-not-allowed">
            <div className="flex items-center p-2 text-gray-400 hover:bg-sunset group cursor-not-allowed">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
            </div>
          </li>
          <li>
            <div class="flex items-center p-2 text-gray-400 hover:bg-sunset group cursor-not-allowed">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
