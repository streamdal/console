import { NavMenu } from "./menu";
import React from "react";
import { Button } from "flowbite-react";

export const NavBar = () => {
  return (
    <div className="sticky top-4 mx-4 px-4 flex flex-row justify-between h-16 bg-white border-1 border-gray-100 drop-shadow-md items-center rounded">
      <div className={"flex items-center"}>
        <NavMenu />
        <a href="/" className={""}>
          <img
            src="/images/snitch-by-streamdal.svg"
            className="w-44 h-fit ml-4 my-2"
          />
        </a>
      </div>
      {/*<div>*/}
      {/*  <Button className={"bg-streamdalYellow btn-heimdal text-web"}>*/}
      {/*    Action Button*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
};
