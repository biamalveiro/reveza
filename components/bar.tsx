"use client";

import { Row } from "@/lib/data";
import { useStore } from "@/lib/store";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import React, { useMemo } from "react";
import { Slider } from "./ui/slider";
import Square from "./square";
import { TooltipProvider } from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { contribution } from "./gauge";

export default function Bars({ data }: { data: Row[] }) {
  const { window, setWindow } = useStore();
  const [sliderValue, setSliderValue] = React.useState(window);

  const bars = useMemo(() => {
    return [
      {
        driver: "bia" as const,
        data: data
          .slice(0, window)
          .filter((row) => row.driver?.[0]?.value === "bia"),
      },
      {
        driver: "smarta" as const,
        data: data
          .slice(0, window)
          .filter((row) => row.driver?.[0]?.value === "smarta"),
      },
    ];
  }, [data, window]);

  return (
    <div>
      <div className="flex gap-1 mb-2">
        <span>Considerando os ultimos</span>
        <Popover>
          <PopoverTrigger className=" underline underline-offset-4 decoration-dashed ">
            {window}
          </PopoverTrigger>
          <PopoverContent>
            <Slider
              value={[sliderValue]}
              onValueChange={(value) => {
                setSliderValue(value[0]);
              }}
              onValueCommit={(value) => {
                setWindow(value[0]);
              }}
              min={4}
              step={4}
              max={data.length}
            />
          </PopoverContent>
        </Popover>
        <span>treinos</span>
      </div>
      <div className="flex flex-col gap-1">
        <TooltipProvider>
          {bars.map(({ driver, data }) => {
            return (
              <div key={driver} className="flex gap-1">
                <span className="mr-1">{driver === "bia" ? "B" : "S"}</span>
                {data.map((row) => (
                  <Square key={row.date} row={row} />
                ))}
                <Badge variant="outline">
                  {contribution({ data, driver, window })}
                </Badge>
              </div>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
