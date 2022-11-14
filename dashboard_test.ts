import { Dashboard } from "./dashboards.ts";
import { assertEquals, mf } from "./deps.ts";
import { Mackerel } from "./mackerel.ts";

const dummyApiKey = "dummy-apikey";
const dummyBaseurl = "https://example.com/";

Deno.test("createDashboards", async () => {
  const param: Dashboard = {
    title: "test title",
    urlPath: "aaaaaaaa",
    memo: "this is test",
    widgets: [
      {
        type: "markdown",
        title: "test",
        layout: {
          x: 1,
          y: 1,
          width: 3,
          height: 3,
        },
        markdown: "### h3",
      },
    ],
  };
  mf.install();
  mf.mock(
    "POST@/api/v0/dashboards",
    (_req, _params) => {
      const resp = {
        id: "testid",
        createdAt: 111111111,
        updatedAt: 111111111,
        ...param,
      };
      return new Response(
        JSON.stringify(
          resp,
        ),
        { status: 200 },
      );
    },
  );
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.createDashboards(param);
  assertEquals(resp.id, "testid");
  assertEquals(resp.widgets[0].title, "test");
  mf.uninstall();
});

Deno.test("getDashboards", async () => {
  const dashboardID = "testid";
  mf.install();
  mf.mock(`GET@/api/v0/dashboards/${dashboardID}`, (_req, _params) => {
    return new Response(
      JSON.stringify({
        id: dashboardID,
        createdAt: 1111111111,
        updatedAt: 2222222222,
        title: "Test Dashbord",
        urlPath: "aaaaaaaaaaa",
        memo: "this is test dashbord",
        widgets: [
          {
            type: "markdown",
            title: "Test Markdown",
            markdown: "# Markdown\n\nthis is markdown",
            layout: { x: 0, y: 0, width: 6, height: 6 },
          },
          {
            type: "graph",
            title: "test title",
            graph: {
              type: "role",
              roleFullname: "hatena-mac:hatena-mac",
              name: "cpu.{user,system}",
              isStacked: true,
            },
            layout: { x: 6, y: 0, width: 6, height: 6 },
          },
          {
            type: "alertStatus",
            title: "test title",
            roleFullname: "test:test",
            layout: { x: 12, y: 0, width: 6, height: 6 },
          },
        ],
      }),
      { status: 200 },
    );
  });
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.getDashboards(dashboardID);
  assertEquals(resp.id, dashboardID);
  assertEquals(resp.widgets[0].type, "markdown");
});

Deno.test("updateDashboards", async () => {
  const dashboardID = "testid";
  const param: Dashboard = {
    title: "test title",
    urlPath: "aaaaaaaa",
    memo: "this is test",
    widgets: [
      {
        type: "markdown",
        title: "test",
        layout: {
          x: 1,
          y: 1,
          width: 3,
          height: 3,
        },
        markdown: "#### h4",
      },
    ],
  };
  mf.install();
  mf.mock(
    `PUT@/api/v0/dashboards/${dashboardID}`,
    (_req, _params) => {
      const resp = {
        id: dashboardID,
        createdAt: 111111111,
        updatedAt: 222222222,
        ...param,
      };
      return new Response(
        JSON.stringify(
          resp,
        ),
        { status: 200 },
      );
    },
  );
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.updateDashboards(dashboardID, param);
  assertEquals(resp.id, dashboardID);
  assertEquals(resp.widgets[0].title, "test");
  mf.uninstall();
});

Deno.test("deleteDashboards", async () => {
  const dashboardID = "testid";
  mf.install();
  mf.mock(`DELETE@/api/v0/dashboards/${dashboardID}`, (_req, _params) => {
    return new Response(
      JSON.stringify({
        id: dashboardID,
        createdAt: 1111111111,
        updatedAt: 2222222222,
        title: "Test Dashbord",
        urlPath: "aaaaaaaa",
        memo: "this is test",
      }),
      { status: 200 },
    );
  });
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.deleteDashboards(dashboardID);
  assertEquals(resp.id, dashboardID);
  assertEquals(resp.memo, "this is test");
  mf.uninstall();
});

Deno.test("listDashboards", async () => {
  mf.install();
  mf.mock("GET@/api/v0/dashboards", (_req, _params) => {
    return new Response(
      JSON.stringify({
        dashboards: [
          {
            id: "test id",
            createdAt: 1111111111,
            updatedAt: 2222222222,
            title: "Test Dashbord",
            urlPath: "aaaaaaaa",
            memo: "this is test",
          },
        ],
      }),
      { status: 200 },
    );
  });
  const client = new Mackerel.Client(dummyApiKey, dummyBaseurl);
  const resp = await client.listDashboards();
  assertEquals(resp[0].title, "Test Dashbord");
  assertEquals(resp[0].memo, "this is test");
  mf.uninstall();
});
