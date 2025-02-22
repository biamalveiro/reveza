import Bars from "@/components/bar";
import Calendar from "@/components/calendar";
import Gauge from "@/components/gauge";
import Legend from "@/components/legend";
import { Button } from "@/components/ui/button";
import { fetchRows } from "@/lib/data";
import { setDefaultOptions } from "date-fns";
import { pt } from "date-fns/locale";
setDefaultOptions({ locale: pt });

export default async function Home() {
  const data = await fetchRows();

  return (
    <div className="flex lg:w-1/2 mx-auto flex-col items-center justify-items-center gap-8 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1 className="text-3xl font-semibold">reveza</h1>
      </div>
      <div className="flex flex-col gap-12 pt-10">
        <Gauge data={data} />
        <div className="flex flex-wrap w-full gap-12 justify-between">
          <Bars data={data} />
          <Legend />
        </div>
        <Calendar data={data} />
      </div>
      <footer className="mt-20">
        <a
          href="https://baserow.io/form/p9tWhjcLSLeSe5BOd4HJUxd8NyufJ6zbCc0k6QR018g"
          target="_blank"
        >
          <Button size="sm" variant="link">
            Registar ida
          </Button>
        </a>
      </footer>
    </div>
  );
}
