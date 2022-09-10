import { assertEquals, mf } from "./deps.ts";
import { Mackerel } from "./mackerel.ts";
import { RegisterAWSIntegrationParam } from "./awsintegrations.ts";

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
                excludedMetrics: [],
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

Deno.test("getAwsIntegrationSettings", async () => {
  const awsIntegrationID = "testid";
  mf.install();
  mf.mock(
    `GET@/api/v0/aws-integrations/${awsIntegrationID}`,
    (_req, _params) => {
      return new Response(
        JSON.stringify(
          {
            id: awsIntegrationID,
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
                excludedMetrics: [],
              },
            },
          },
        ),
        { status: 200 },
      );
    },
  );
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.getAwsIntegrationSettings(awsIntegrationID);
  assertEquals(resp.id, awsIntegrationID);
  assertEquals(resp.services["EC2"].retireAutomatically, false);
  mf.uninstall();
});

Deno.test("registerAwsIntegrationSettings", async () => {
  const registerParam: RegisterAWSIntegrationParam = {
    name: "test-aws-integration",
    memo: "this is test",
    key: null,
    secretKey: null,
    roleArn: "testRoleArn",
    externalId: "testexternalid",
    region: "test-region",
    includedTags: "",
    excludedTags: "",
    services: {
      "S3": {
        enable: true,
        role: null,
        excludedMetrics: [],
      },
    },
  };
  mf.install();
  mf.mock(
    "POST@/api/v0/aws-integrations",
    (_req, _params) => {
      const resp = {
        id: "testid",
        ...registerParam,
      };
      // @ts-ignore: just want to test
      delete resp.secretKey;
      return new Response(
        JSON.stringify(
          resp,
        ),
        { status: 200 },
      );
    },
  );
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.registerAwsIntegrationSettings(registerParam);
  assertEquals(resp.id, "testid");
  assertEquals(resp.services["S3"].enable, true);
  mf.uninstall();
});
