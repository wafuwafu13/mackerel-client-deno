import { Mackerel } from "https://deno.land/x/mackerel_client_deno@v0.1.0/mackerel.ts";

const client = new Mackerel.Client("<MACKEREL_API_KEY>");
client.listServices().then((res) => {
  console.log(res);
});
