import { Mackerel } from "./mackerel.ts";
import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";

const apikey = "myapikey";

Deno.test("initialize", () => {
  const client = new Mackerel.Client(apikey);
  assertEquals(client.apikey, apikey);
});
