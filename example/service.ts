import { config, Mackerel } from "../deps.ts";

const client = new Mackerel.Client(
  config({ path: "./example/.env" })["MACKELEL_API_KEY"],
);

const createService = await client.registerService({
  name: "example-service",
  memo: "this is example-service",
});
console.log(createService);
// { name: "example-service", memo: "this is example-service", roles: [] }

const listServices = await client.listServices();
console.log(listServices);
// [ { name: "example-service", memo: "this is example-service", roles: [] } ]

const deleteService = await client.deleteService("example-service");
console.log(deleteService);
// { name: "example-service", memo: "this is example-service", roles: [] }
