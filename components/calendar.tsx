import React from "react";
import Square from "./square";
import { TooltipProvider } from "./ui/tooltip";
import { add, eachWeekOfInterval, format, getWeekOfMonth } from "date-fns";
import { Row } from "@/lib/data";

export default function Calendar({ data }: { data: Row[] }) {
  const weeks = eachWeekOfInterval(
    {
      start: new Date(2024, 8, 3),
      end: new Date(),
    },
    { weekStartsOn: 2 }
  ).reverse();

  const resultsPerWeek = weeks.map((week) => {
    return {
      week,
      first:
        1 ===
        getWeekOfMonth(week, {
          weekStartsOn: 3,
        }),
      results: data.filter((result) => {
        return (
          new Date(result.date).getTime() >= week.getTime() &&
          new Date(result.date).getTime() <
            week.getTime() + 7 * 24 * 60 * 60 * 1000
        );
      }),
    };
  });
  return (
    <div className="border-t border-slate-300 dark:border-slate-700 pt-4">
      <h2 className="mb-4 font-medium">Histórico</h2>
      <TooltipProvider>
        <div className="flex items-center w-full flex-wrap gap-y-5 gap-x-1">
          <div className="flex gap-1 flex-col [&_*]:h-4 [&_*]:text-xs [&_*]:table-cell [&_*]:align-middle pt-8 ">
            <div>T</div>
            <div>Q</div>
            <div>D</div>
          </div>
          {resultsPerWeek.map(({ week, first, results }) => {
            return (
              <div key={week.toString()}>
                <div className="h-8 w-4 overflow-visible flex justify-end">
                  {first && <span>{format(week, "MMM")}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  {[2, 4, 0].map((day) => {
                    if (
                      add(week, { days: { 2: 0, 4: 2, 0: 4 }[day] }) >
                      new Date()
                    ) {
                      return <div key={day} className="w-4 h-4" />;
                    }
                    const result = results.find(
                      (result) => result.weekday === day
                    );
                    if (result) {
                      return <Square key={day} row={result} />;
                    }
                    return (
                      <div
                        key={day}
                        className="w-4 h-4 border-slate-200 dark:border-slate-700 border dark:bg-slate-900 bg-slate-100 "
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
