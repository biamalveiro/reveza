import Bars from "@/components/bar";
import Calendar from "@/components/calendar";
import Gauge from "@/components/gauge";
import { fetchRows } from "@/lib/data";
import { setDefaultOptions } from "date-fns";
import { pt } from "date-fns/locale";
setDefaultOptions({ locale: pt });

export default async function Home() {
  const data = await fetchRows();

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-semibold">reveza</h1>
      <div className="flex flex-col gap-8 pt-10">
        <Gauge data={data} />
        <Bars data={data} />
        <Calendar data={data} />
      </div>
    </div>
  );
}
