import { assertEquals, mf } from "./deps.ts";
import { Mackerel } from "./mackerel.ts";

const dummyApiKey = "dummy-apikey";
const dummyBaseurl = "https://example.com/";

Deno.test("listAwsIntegrationSettings", async () => {
  mf.install();
  mf.mock("GET@/api/v0/aws-integrations", (_req, _params) => {
    return new Response(
      JSON.stringify({
        aws_integrations: [
          {
            id: "12345",
            name: "test-aws-integration",
            memo: "this is test",
            key: null,
            roleArn: "test-rolearn",
            externalID: "test-externalid",
            region: "test-region",
            includedTags: "",
            excludedTags: "",
            services: {
              "EC2": {
                enable: false,
                role: null,
                retireAutomatically: false,
                excludedMetrics: [""],
              },
            },
          },
        ],
      }),
      { status: 200 },
    );
  });
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.listAwsIntegrationSettings();
  assertEquals(resp[0].name, "test-aws-integration");
  assertEquals(resp[0].services["EC2"].retireAutomatically, false);
  mf.uninstall();
});
