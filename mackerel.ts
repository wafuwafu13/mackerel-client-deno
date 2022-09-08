import { listServices, Service } from "./service.ts";

export const defaultBaseURL = "https://api.mackerelio.com/";

type ClientType = {
  apikey: string;
  baseurl?: string;
};

// deno-lint-ignore no-namespace
export namespace Mackerel {
  export class Client<T extends ClientType> {
    apikey: T["apikey"];
    baseurl: T["baseurl"];

    constructor(apikey: string, baseurl?: string) {
      this.apikey = apikey;
      this.baseurl = baseurl;
    }

    urlFor = (path: string): URL => {
      const newURL = new URL(this.baseurl || defaultBaseURL);
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
