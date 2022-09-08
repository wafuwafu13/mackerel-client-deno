import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";
import { Mackerel } from "./mackerel.ts";

Deno.test("listServices", async () => {
  mf.install();
  mf.mock("GET@/api/v0/services", (_req, _params) => {
    return new Response(
      JSON.stringify({
        services: [
          { name: "test-service1", memo: "this is 1", roles: ["test-role1"] },
          {
            name: "test-service2",
            memo: "this is 2",
            roles: ["test-role2", "test-role3"],
          },
        ],
      }),
      { status: 200 },
    );
  });
  const client = new Mackerel.Client("dummy-apikey");
  const resp = await client.listServices();
  assertEquals(resp[0].name, "test-service1");
  assertEquals(resp[1].roles[1], "test-role3");
  mf.uninstall();
});
