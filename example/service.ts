import { Mackerel } from "../deps.ts";

const client = new Mackerel.Client("<MACKEREL_API_KEY>");
client.listServices().then((res) => {
  console.log(res);
});
