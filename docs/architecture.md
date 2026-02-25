# Architecture

## Project structure

```
├── core/
│   └── Container.ts      # IoC container implementation
├── react/
│   ├── Context.ts         # React context and useInjection hook
│   └── Provider.ts        # React provider component
├── mod.ts                 # Public API entry point
└── deno.jsonc             # Deno configuration and package metadata
```

`mod.ts` is the public entry point that re-exports everything from `core/` and
`react/`. Consumers import exclusively from `mod.ts`.

`Container` is framework-agnostic -- it maps `symbol` keys to arbitrary values.
The React integration (`Provider` + `useInjection`) is a thin layer that puts a
`Container` instance into React context.
