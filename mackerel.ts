import { listServices } from "./service.ts";

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

    listServices() {
      return listServices();
    }
  }
}
