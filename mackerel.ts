import { listServices, Service } from "./service.ts";

export const defaultBaseURL = "https://api.mackerelio.com/";

type ClientType = {
  apikey: string;
};

// deno-lint-ignore no-namespace
export namespace Mackerel {
  export class Client<T extends ClientType> {
    apikey: T["apikey"];

    constructor(apikey: string) {
      this.apikey = apikey;
    }

    urlFor = (path: string): URL => {
      const newURL = new URL(defaultBaseURL);
      newURL.pathname = path;
      return newURL;
    };

    buildReq = (req: Request): Request => {
      req.headers.set("X-Api-Key", this.apikey);
      return req;
    };

    request = async (req: Request): Promise<Response> => {
      const request = this.buildReq(req);
      const resp = await fetch(request);
      return resp;
    };

    listServices = (): Promise<Service[]> => {
      return listServices(this.urlFor, this.request);
    };
  }
}
