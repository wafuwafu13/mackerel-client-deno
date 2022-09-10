# mackerel-client-deno

![mackerel-client-deno](https://github.com/wafuwafu13/mackerel-client-deno/actions/workflows/ci.yaml/badge.svg?branch=main)

mackerel-client-deno is a library for mackerel.io API working on Deno.

<img src="https://user-images.githubusercontent.com/50798936/189112754-758afcb5-bd60-4e71-ae55-6f64f9e2a41a.png" width="500">

List of Supported API is
[here](https://github.com/wafuwafu13/mackerel-client-deno/issues/1)

## Links

- [Mackerel](https://en.mackerel.io/)
- [Mackerel API Documents (v0)](https://mackerel.io/api-docs/)
- [Deno](https://deno.land/)
- [x/mackerel_client_deno](https://deno.land/x/mackerel_client_deno@v0.5.1)

## Usage

```ts
import { Mackerel } from "https://deno.land/x/mackerel_client_deno@v0.5.1/mackerel.ts";

const client = new Mackerel.Client(<MACKEREL_API_KEY>);

const service = await client.registerService({
  name: "example-service",
  memo: "this is example-service",
});
```

You can try:

1. [Getting Started with Mackerel](https://mackerel.io/docs/entry/getting-started)
2. [Getting Started with Deno](https://deno.land/manual@v1.25.1/introduction)
3. Clone this repo
4. Setting your API key(`MACKEREL_API_KEY`) at `./example/.env`
5. `$ deno run -A ./example/service.ts`

## Contribute

### [Help Wanted !](https://github.com/wafuwafu13/mackerel-client-deno/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

You can contribute:

1. Fork (https://github.com/wafuwafu13/mackerel-client-deno/fork)
2. Create a feature branch
3. Commit your changes
4. Rebase your local changes against the master branch
5. Run test suite with the `deno test -A` and confirm that it passes
6. Run `deno lint` and `deno fmt`
7. Create new Pull Request

## LICENCE

- wafuwafu13/mackerel-client-deno is licensed under the
  [MIT License](https://github.com/wafuwafu13/mackerel-client-deno/blob/main/LICENCE)
- reference is
  [mackerelio/mackerel-client-go](https://github.com/mackerelio/mackerel-client-go)
  Copyright 2014 Hatena Co., Ltd.
