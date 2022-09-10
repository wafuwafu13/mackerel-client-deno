import {
  deleteService,
  listServices,
  registerService,
  RegisterServiceParam,
  Service,
} from "./service.ts";
import {
  AWSIntegration,
  AWSIntegrationService,
  getAwsIntegrationSettings,
  listAwsIntegrationSettings,
  RegisterAWSIntegrationParam,
  registerAwsIntegrationSettings,
  UpdateAWSIntegrationParam,
  updateAwsIntegrationSettings,
} from "./awsintegrations.ts";

export const defaultBaseURL = "https://api.mackerelio.com/";

type ClientType = {
  apikey: string;
  baseurl?: string;
};

type ErrorType = {
  error: {
    message: string;
  };
} & {
  error: string;
};

export type PayloadType = Record<
  never | string,
  never | string | number | null | Record<string, AWSIntegrationService>
>;

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

    request = async (req: Request): Promise<Response | Error> => {
      const request = this.buildReq(req);
      const resp = await fetch(request);
      if (resp.ok) {
        return resp;
      } else {
        const respj = await resp.json() as ErrorType;
        if (respj.error.message) {
          return new Error(respj.error.message);
        } else {
          return new Error(respj.error);
        }
      }
    };

    postJSON = (
      path: string,
      payload: PayloadType,
    ): Promise<Response | Error> => {
      return this.requestJSON("POST", path, payload);
    };

    putJSON = (
      path: string,
      payload: PayloadType,
    ): Promise<Response | Error> => {
      return this.requestJSON("PUT", path, payload);
    };

    requestJSON = (
      method: "POST" | "PUT",
      path: string,
      payload: PayloadType,
    ): Promise<Response | Error> => {
      const req = new Request(this.urlFor(path).toString(), {
        method,
        body: JSON.stringify(payload),
      });
      req.headers.set("Content-Type", "application/json");
      return this.request(req);
    };

    listServices = (): Promise<Service[]> => {
      return listServices(this.urlFor, this.request);
    };

    registerService = (param: RegisterServiceParam): Promise<Service> => {
      return registerService(param, this.postJSON);
    };

    deleteService = (serviceName: string): Promise<Service> => {
      return deleteService(serviceName, this.urlFor, this.request);
    };

    listAwsIntegrationSettings = (): Promise<AWSIntegration[]> => {
      return listAwsIntegrationSettings(this.urlFor, this.request);
    };

    getAwsIntegrationSettings = (
      awsIntegrationID: string,
    ): Promise<AWSIntegration> => {
      return getAwsIntegrationSettings(
        awsIntegrationID,
        this.urlFor,
        this.request,
      );
    };

    registerAwsIntegrationSettings = (
      param: RegisterAWSIntegrationParam,
    ): Promise<AWSIntegration> => {
      return registerAwsIntegrationSettings(param, this.postJSON);
    };

    updateAwsIntegrationSettings = (
      awsIntegrationID: string,
      param: UpdateAWSIntegrationParam,
    ): Promise<AWSIntegration> => {
      return updateAwsIntegrationSettings(
        awsIntegrationID,
        param,
        this.putJSON,
      );
    };
  }
}
