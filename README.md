# react-ioc

Minimal **Inversion of Control (IoC)** for React: a symbol-based container and a
React provider so you can inject dependencies anywhere in the tree.

## Install

**Node.js / npm**

```bash
npx jsr add @y0n1/react-ioc
```

Then import as usual:

```ts
import { Container, Provider, useInjection } from "@y0n1/react-ioc";
```

**Deno**

```ts
import { Container, Provider, useInjection } from "jsr:@y0n1/react-ioc";
```

Or add to `deno.jsonc`:

```json
{
  "imports": {
    "@y0n1/react-ioc": "jsr:@y0n1/react-ioc"
  }
}
```

## Usage

1. **Define interface symbols** (contracts):

```ts
export const Symbols = {
  UserService: Symbol.for("IUserService"),
  Logger: Symbol.for("Logger"),
};
```

2. **Create a container and register implementations**:

```ts
import { Container, Provider } from "@y0n1/react-ioc";
import {
  type IConsoleLogger,
  type IUserService,
  ConsoleLogger,
  UserService,
} from "./dependencies.ts";

const container = new Container()
  .register(Symbols.UserService, new UserService())
  .register(Symbols.Logger, new ConsoleLogger());
```

3. **Wrap your app with `Provider`**:

```tsx
<Provider container={container}>
  <App />
</Provider>;
```

4. **Resolve dependencies in components** with `useInjection`:

```tsx
import { useAsunc } from "react-use";
import { useInjection } from "@y0n1/react-ioc";

function Profile() {
  const userService = useInjection<IUserService>(Symbols.UserService);
  const logger = useInjection<ILogger>(Symbols.Logger);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    logger.info("Profile mounted");
  }, []);

  const handleClick = useCallback(async () => {
    try {
      const user = await userService.getCurrentUser();
      setUser(user);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return <button onClick={handleClick}>{user?.name ?? "⁉️"}</div>;
}
```

## API

| Export         | Description                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| `Container`    | IoC container: `register(symbol, value)` and `get<T>(symbol)`. Chainable `register`.                    |
| `Provider`     | React component: `props.container` — provides the container to the subtree.                             |
| `useInjection` | Hook: `useInjection<T>(symbol)` — returns the value for that symbol. Throws if used outside `Provider`. |

## Requirements

- React 18+

## License

MIT
