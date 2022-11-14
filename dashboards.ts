import { PayloadType } from "./mackerel.ts";

export type Dashboard = {
  id?: string;
  title: string;
  urlPath: string;
  createdAt?: number;
  updatedAt?: number;
  memo: string;
  widgets: Widget[];
};

export type Widget = {
  type: string;
  title: string;
  layout: Layout;
  metric?: Metric;
  graph?: Graph;
  range?: Range;
  markdown?: string;
  fractionSize?: number;
  suffix?: string;
  roleFullName?: string;
};

type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Metric = {
  type: string;
  name?: string;
  hostID?: string;
  serviceName?: string;
  expression?: string;
};

type Graph = {
  type: string;
  name?: string;
  hostID?: string;
  roleFullName?: string;
  isStacked?: boolean;
  serviceName?: string;
  expression?: string;
};

type Range = {
  type: string;
  period: number;
  offset: number;
  start: number;
  end: number;
};

export const createDashboards = async (
  param: Dashboard,
  postJSON: (
    path: string,
    payload: PayloadType,
  ) => Promise<Response | Error>,
): Promise<Dashboard> => {
  const resp = await postJSON("/api/v0/dashboards", param);
  if (resp instanceof Error) {
    throw resp;
  }
  const dashboard = await resp.json() as Dashboard;
  return dashboard;
};

export const getDashboards = async (
  dashboardID: string,
  urlFor: (path: string) => URL,
  req: (req: Request) => Promise<Response | Error>,
): Promise<Dashboard> => {
  const request = new Request(
    urlFor(`/api/v0/dashboards/${dashboardID}`).toString(),
    {
      method: "GET",
    },
  );
  const resp = await req(request);
  if (resp instanceof Error) {
    throw resp;
  }
  const dashboard = await resp.json() as Dashboard;
  return dashboard;
};

export const updateDashboards = async (
  dashboardID: string,
  param: Dashboard,
  putJSON: (
    path: string,
    payload: PayloadType,
  ) => Promise<Response | Error>,
): Promise<Dashboard> => {
  const resp = await putJSON(`/api/v0/dashboards/${dashboardID}`, param);
  if (resp instanceof Error) {
    throw resp;
  }
  const dashboard = await resp.json() as Dashboard;
  return dashboard;
};

export const deleteDashboards = async (
  dashboardID: string,
  urlFor: (path: string) => URL,
  req: (req: Request) => Promise<Response | Error>,
): Promise<Dashboard> => {
  const request = new Request(
    urlFor(`/api/v0/dashboards/${dashboardID}`).toString(),
    {
      method: "DELETE",
    },
  );
  request.headers.set("Content-Type", "application/json");
  const resp = await req(request);
  if (resp instanceof Error) {
    throw resp;
  }
  const dashboard = await resp.json() as Dashboard;
  return dashboard;
};

export const listDashboards = async (
  urlFor: (path: string) => URL,
  req: (req: Request) => Promise<Response | Error>,
): Promise<Dashboard[]> => {
  const request = new Request(urlFor("/api/v0/dashboards").toString(), {
    method: "GET",
  });
  const resp = await req(request);
  if (resp instanceof Error) {
    throw resp;
  }
  const dashboards = await resp.json() as {
    dashboards: Dashboard[];
  };
  return dashboards["dashboards"];
};
