import Bars from "@/components/bar";
import Calendar from "@/components/calendar";
import Gauge from "@/components/gauge";
import { Button } from "@/components/ui/button";
import { fetchRows } from "@/lib/data";
import { setDefaultOptions } from "date-fns";
import { pt } from "date-fns/locale";
setDefaultOptions({ locale: pt });

export default async function Home() {
  const data = await fetchRows();

  return (
    <div className="flex flex-col items-center justify-items-center gap-8 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1 className="text-3xl font-semibold">reveza</h1>
        <a
          href="https://baserow.io/form/p9tWhjcLSLeSe5BOd4HJUxd8NyufJ6zbCc0k6QR018g"
          target="_blank"
        >
          <Button size="sm" variant="link">
            Registar ida
          </Button>
        </a>
      </div>
      <div className="flex flex-col gap-12 pt-10">
        <Gauge data={data} />
        <Bars data={data} />
        <Calendar data={data} />
      </div>
    </div>
  );
}
