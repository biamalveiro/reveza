"use client";

import { Driver, Row } from "@/lib/data";
import React from "react";
import { arc } from "d3-shape";
import cn from "classnames";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";

export const contribution = ({
  data,
  driver,
  window,
}: {
  data: Row[];
  driver: Driver;
  window: number;
}) => {
  return data.slice(0, window).reduce((acc, row) => {
    if (!row.practice || !row.driver?.[0]) return acc;
    if (row.driver?.[0].value === driver) {
      if (row.ride) return acc + 1;
      return acc + 0.5;
    }
    return acc;
  }, 0);
};

const WIDTH = 300;
const HEIGHT = 100;
const MARGIN = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

const ARC_COLORS = [
  "fill-blue-500",
  "fill-blue-500/50",
  "fill-blue-500/25",
  "fill-red-500/25",
  "fill-red-500/50",
  "fill-red-500",
];

const strength = (share: number) => {
  if (share < 1 / 6 || share > 5 / 6) return "Definitivamente";
  if (share < 2 / 6 || share > 4 / 6) return "Provavelmente";
  return "Talvez";
};

export default function Gauge({ data }: { data: Row[] }) {
  const window = useStore((state) => state.window);
  const countSmarta = contribution({ data, driver: "smarta", window });
  const countBia = contribution({ data, driver: "bia", window });
  const shareBia = countBia / (countSmarta + countBia);

  const arcs = [...Array(6).keys()].map((i) => {
    return {
      shape: arc()({
        startAngle: -Math.PI / 2 + (i * Math.PI) / 6,
        endAngle: -Math.PI / 2 + ((i + 1) * Math.PI) / 6,
        innerRadius: HEIGHT - MARGIN.top - MARGIN.bottom - 40,
        outerRadius: HEIGHT - MARGIN.top - MARGIN.bottom,
      }),
      color: ARC_COLORS[i],
    };
  });

  const fullArc = arc()({
    startAngle: -Math.PI / 2,
    endAngle: Math.PI / 2,
    innerRadius: HEIGHT - MARGIN.top - MARGIN.bottom - 40,
    outerRadius: HEIGHT - MARGIN.top - MARGIN.bottom,
  });

  const text = `${strength(shareBia)} a ${shareBia > 0.5 ? "Smarta" : "Bia"}`;

  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className=" text-lg font-medium">Quem deve levar hoje?</h2>
      <svg width={WIDTH} height={HEIGHT}>
        <g
          transform={`translate(${WIDTH / 2 + MARGIN.left},${
            HEIGHT - MARGIN.bottom
          })`}
        >
          {arcs.map(({ shape, color }, i) => {
            return <path key={i} d={shape || ""} className={color} />;
          })}
          <path
            d={fullArc || ""}
            className="stroke-slate-300 dark:stroke-slate-700  fill-transparent"
          />
          {/* <path
            d={needlePosition || ""}
            className="stroke-slate-800 dark:stroke-slate-200"
          /> */}
          <circle r={2} className="fill-slate-800 dark:fill-slate-200" />
        </g>
        <g
          transform={`translate(${WIDTH / 2 + MARGIN.left},${
            HEIGHT - MARGIN.bottom
          })`}
        >
          <motion.g
            initial={{
              rotate: 0,
            }}
            animate={{
              rotate: shareBia * 180,
              originX: "0px",
              originY: "0px",
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <line
              x1={-HEIGHT + MARGIN.top - 4}
              y1={0}
              x2={0}
              y2={0}
              className="stroke-slate-700 dark:stroke-slate-300"
            />
          </motion.g>
        </g>
      </svg>
      <span
        className={cn(
          "font-semibold underline underline-offset-4",
          shareBia > 0.5 ? "decoration-red-500" : "decoration-blue-500"
        )}
      >
        {text}
      </span>
    </div>
  );
}
