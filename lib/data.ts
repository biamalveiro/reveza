import axios from "axios";
import { getDay } from "date-fns";
import { z } from "zod";

const driversSchema = z.enum(["bia", "smarta"]);

export type Driver = z.infer<typeof driversSchema>;

export const schema = z
  .object({
    id: z.number(),
    uuid: z.string(),
    date: z.string().date(),
    ride: z.boolean(),
    practice: z.boolean(),
    driver: z.array(
      z.object({
        id: z.number(),
        value: driversSchema,
      })
    ),
  })
  .transform((data) => ({
    ...data,
    weekday: getDay(new Date(data.date)),
  }));

export type Row = z.infer<typeof schema>;

export const fetchRows = async () => {
  const data = await axios({
    method: "get",
    url: "https://api.baserow.io/api/database/rows/table/435962/",
    headers: {
      Authorization: `Token ${process.env.BASEROW_TOKEN}`,
    },
    params: {
      user_field_names: true,
      order_by: "-date",
      size: 200,
    },
  });
  return schema.array().parse(data.data?.results);
};
