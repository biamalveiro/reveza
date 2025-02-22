import { Row } from "@/lib/data";
import React from "react";
import cn from "classnames";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function Square({ row }: { row: Row }) {
  const drivers = row.driver?.map((d) => d.value);

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            "w-4 h-4 items-center justify-center flex text-xs",
            drivers.length === 0 &&
              "border-slate-200 dark:border-slate-700 border"
          )}
        >
          {!row.practice && <span>🚫</span>}
          {drivers.length > 0 ? (
            <svg
              viewBox="0 0 100 100"
              width={16}
              height={16}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 0 L 100 0 L 0 100  Z"
                className={
                  drivers.includes("smarta")
                    ? "fill-red-500"
                    : row.ride
                    ? "fill-blue-500"
                    : "dark:fill-slate-900 fill-slate-50 stroke-slate-800 dark:stroke-slate-100"
                }
              />
              <path
                d="M 100 0 L 100 100 L 0 100  Z"
                className={
                  drivers.includes("bia")
                    ? "fill-blue-500"
                    : row.ride
                    ? "fill-red-500"
                    : "dark:fill-slate-900 fill-slate-50 stroke-slate-800 dark:stroke-slate-100"
                }
              />
            </svg>
          ) : (
            <>
              {row.practice && (
                <svg
                  viewBox="0 0 100 100"
                  width={16}
                  height={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 100 0 L 0 100"
                    className="dark:stroke-slate-200 stroke-slate-800  "
                  />
                </svg>
              )}
            </>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="flex flex-col gap-1">
        <span className=" font-medium">{row.date}</span>
        {drivers.length === 2 && (
          <span>{`🚘 ${drivers[0]} e ${drivers[1]} foram sozinhas`}</span>
        )}
        {drivers.length === 1 && (
          <span>
            {`🚘 ${drivers[0]} ${row.ride ? "levou a" : "foi sozinha"} ${
              row.ride ? (drivers[0] === "bia" ? "smarta" : "bia") : ""
            }`}{" "}
          </span>
        )}
        {!row.practice && <span>treino cancelado</span>}
      </TooltipContent>
    </Tooltip>
  );
}
