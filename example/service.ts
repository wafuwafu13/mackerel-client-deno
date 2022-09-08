import { config, Mackerel } from "../deps.ts";

const client = new Mackerel.Client(
  config({ path: "./example/.env" })["MACKELEL_API_KEY"],
);
const resp = await client.listServices();
console.log(resp);
