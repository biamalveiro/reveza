import { InfoIcon } from "lucide-react";

const HEIGHT = 90;
const WIDTH = 124;
const SIDE = 50;

const ARROW_HEAD = 3;
const Arrow = ({
  x1,
  y1,
  x2,
  y2,
  direction,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  direction: "up" | "down";
}) => {
  return (
    <svg width={WIDTH} height={HEIGHT} xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2} L ${x1} ${y2} Z`}
        className={`stroke-slate-700 dark:stroke-slate-400`}
      />
      {direction === "up" ? (
        <path
          d={`M ${x1 - ARROW_HEAD} ${y1 + ARROW_HEAD} L ${x1} ${y1} L ${
            x1 + ARROW_HEAD
          } ${y1 + ARROW_HEAD} Z`}
          className={`fill-slate-700 dark:fill-slate-400`}
        />
      ) : (
        <path
          d={`M ${x1 - ARROW_HEAD} ${y2 - ARROW_HEAD} L ${x1} ${y2} L ${
            x1 + ARROW_HEAD
          } ${y2 - ARROW_HEAD} Z`}
          className={`fill-slate-700 dark:fill-slate-400`}
        />
      )}
    </svg>
  );
};

export default function Legend() {
  return (
    <div>
      <div className="flex gap-1 items-center">
        <InfoIcon size={16} />
        <h3 className=" ">Legenda</h3>
      </div>
      <div className="text-xs relative py-4 " style={{ width: WIDTH }}>
        <div className="flex flex-wrap-reverse gap-2 gap-y-0">
          <p>Quem levou a Smarta?</p>
          <div className="flex flex-wrap items-center gap-1">
            <svg width={8} height={8} viewBox="0 0 1 1">
              <path d="M 0 0 L 1 0 L 0 1 Z" className="fill-blue-500" />
            </svg>
            <span className="text-xs text-blue-500">Bia</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width={8} height={8} viewBox="0 0 1 1">
              <path d="M 0 0 L 1 0 L 0 1 Z" className="fill-red-500" />
            </svg>
            <span className="text-xs text-red-500">Smarta</span>
          </div>
        </div>
        <svg width={WIDTH} height={HEIGHT} xmlns="http://www.w3.org/2000/svg">
          <g
            transform={` translate(${WIDTH / 2 - SIDE / 2}, ${
              HEIGHT / 2 - SIDE / 2
            })`}
          >
            <path
              d="M 0 0 L 50 0 L 0 50  Z"
              className="stroke-slate-800 dark:stroke-slate-100"
            />
            <path
              d="M 50 0 L 50 50 L 0 50  Z"
              className="stroke-slate-800 dark:stroke-slate-100"
            />
          </g>
          <Arrow
            x1={WIDTH / 2 - SIDE / 3}
            y1={5}
            x2={WIDTH / 2 - SIDE / 3}
            y2={HEIGHT / 2 - SIDE / 4}
            direction="up"
          />
          <Arrow
            x1={WIDTH / 2 + SIDE / 3}
            y1={HEIGHT / 2 + SIDE / 4}
            x2={WIDTH / 2 + SIDE / 3}
            y2={HEIGHT - 5}
            direction="down"
          />
        </svg>
        <div className="flex gap-2 gap-y-0 flex-wrap">
          <p className="">Quem levou a Bia?</p>
          <div className="flex items-center gap-1">
            <svg width={8} height={8} viewBox="0 0 1 1">
              <path d="M 1 0 L 1 1 L 0 1 Z" className="fill-blue-500" />
            </svg>
            <span className="text-xs text-blue-500">Bia</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width={8} height={8} viewBox="0 0 1 1">
              <path d="M 1 0 L 1 1 L 0 1 Z" className="fill-red-500" />
            </svg>
            <span className="text-xs text-red-500">Smarta</span>
          </div>
        </div>
      </div>
    </div>
  );
}
