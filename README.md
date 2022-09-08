# mackerel-client-deno
mackerel-client-deno is a library for mackerel.io API working on Deno.

## Links
- [Mackerel](https://en.mackerel.io/)
- [Mackerel API Documents (v0)](https://mackerel.io/api-docs/)
- [Deno](https://deno.land/)
- [x/mackerel_client_deno](https://deno.land/x/mackerel_client_deno@v0.5.1)

## Usage

```ts
import { Mackerel } from "https://deno.land/x/mackerel_client_deno@v0.5.1/mackerel.ts";

const client = new Mackerel.Client(<MACKELEL_API_KEY>);

const service = await client.registerService({
  name: "example-service",
  memo: "this is example-service",
});
```

You can try:
1. [Getting Started with Mackerel](https://mackerel.io/docs/entry/getting-started)
2. [Getting Started with Deno](https://deno.land/manual@v1.25.1/introduction)
3. Clone this repo
4. Setting your API key(`MACKELEL_API_KEY`) at `./example/.env`
5. `$ deno run -A ./example/service.ts`

## LICENCE

- wafuwafu13/mackerel-client-deno is licensed under the [MIT License](https://github.com/wafuwafu13/mackerel-client-deno/blob/main/LICENCE)
- reference is [mackerelio/mackerel-client-go](https://github.com/mackerelio/mackerel-client-go) Copyright 2014 Hatena Co., Ltd.

