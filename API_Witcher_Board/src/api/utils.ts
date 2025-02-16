import { z } from "zod";

export const getId = (id: string | number | undefined) =>
  z.coerce.number().parse(id);
