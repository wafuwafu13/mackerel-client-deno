import { assertEquals } from "./deps.ts";
import { Mackerel } from "./mackerel.ts";

const apikey = "myapikey";

Deno.test("initialize", () => {
  const client = new Mackerel.Client(apikey);
  assertEquals(client.apikey, apikey);
});
