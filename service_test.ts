import { assertEquals, mf } from "./deps.ts";
import { Mackerel } from "./mackerel.ts";

const dummyApiKey = "dummy-apikey";
const dummyBaseurl = "https://example.com/";

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
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.listServices();
  assertEquals(resp[0].name, "test-service1");
  assertEquals(resp[1].roles[1], "test-role3");
  mf.uninstall();
});

Deno.test("registerService", async () => {
  mf.install();
  mf.mock("POST@/api/v0/services", (_req, _params) => {
    return new Response(
      JSON.stringify({ name: "test-service1", memo: "this is 1", roles: [] }),
      { status: 200 },
    );
  });
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.registerService({
    name: "test-service1",
    memo: "this is 1",
  });
  assertEquals(resp.name, "test-service1");
  assertEquals(resp.memo, "this is 1");
  assertEquals(resp.roles, []);
  mf.uninstall();
});

Deno.test("deleteService", async () => {
  mf.install();
  mf.mock("DELETE@/api/v0/services", (_req, _params) => {
    return new Response(
      JSON.stringify({
        name: "test-service1",
        memo: "this is 1",
        roles: ["test-role1"],
      }),
      { status: 200 },
    );
  });
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.deleteService("test-service1");
  assertEquals(resp.name, "test-service1");
  assertEquals(resp.memo, "this is 1");
  assertEquals(resp.roles, ["test-role1"]);
  mf.uninstall();
});
