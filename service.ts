import { PayloadType } from "./mackerel.ts";

export type Service = {
  name: string;
  memo: string;
  roles: string[];
};

export type RegisterServiceParam = {
  name: string;
  memo: string;
};

export const listServices = async (
  urlFor: (path: string) => URL,
  req: (req: Request) => Promise<Response | Error>,
): Promise<Service[]> => {
  const request = new Request(urlFor("/api/v0/services").toString(), {
    method: "GET",
  });
  const resp = await req(request);
  if (resp instanceof Error) {
    throw resp;
  }
  const services = await resp.json() as { services: Service[] };
  return services["services"];
};

export const registerService = async (
  param: RegisterServiceParam,
  postJSON: (
    path: string,
    payload: PayloadType,
  ) => Promise<Response | Error>,
): Promise<Service> => {
  const resp = await postJSON("/api/v0/services", param);
  if (resp instanceof Error) {
    throw resp;
  }
  const service = await resp.json() as Service;
  return service;
};

export const deleteService = async (
  serviceName: string,
  urlFor: (path: string) => URL,
  req: (req: Request) => Promise<Response | Error>,
): Promise<Service> => {
  const request = new Request(
    urlFor(`/api/v0/services/${serviceName}`).toString(),
    {
      method: "DELETE",
    },
  );
  request.headers.set("Content-Type", "application/json");
  const resp = await req(request);
  if (resp instanceof Error) {
    throw resp;
  }
  const service = await resp.json() as Service;
  return service;
};
