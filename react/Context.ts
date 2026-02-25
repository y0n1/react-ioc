import type { Context as ReactContext } from "react";
import { createContext, useContext } from "react";
import type { Container } from "../core/Container.ts";
import { Provider } from "./Provider.ts";

/** React context holding the IoC {@link Container} (or null when outside a {@link Provider}). */
export const Context: ReactContext<Container | null> = createContext<Container | null>(null);

/**
 * Resolves a dependency from the nearest {@link Provider}'s container.
 * Must be called within a component tree that is wrapped by {@link Provider}.
 * @param registeredInterfaceSymbol - The symbol the dependency was registered with.
 * @returns The resolved dependency.
 * @throws {ReferenceError} When used outside of {@link Provider}.
 * @template T - The type of the resolved dependency.
 */
export function useInjection<T>(registeredInterfaceSymbol: symbol): T {
  const container = useContext(Context);
  if (!container) {
    throw new ReferenceError(
      `useInjection must be used inside ${Provider.displayName}`,
    );
  }

  return container.get<T>(registeredInterfaceSymbol);
}
