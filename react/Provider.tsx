import type {
  PropsWithChildren,
  ReactNode,
} from "react";
import type { Container } from "../core/Container.ts";
import { Context } from "./Context.ts";

/**
 * Provides an IoC {@link Container} to the component tree so that
 * {@link useInjection} can resolve dependencies.
 * @param props - Component props.
 * @param props.container - The container instance to provide.
 * @param props.children - Child components that may use {@link useInjection}.
 * @returns The context provider wrapping `children`.
 */
export function Provider(
  props: PropsWithChildren<{ container: Container }>,
): ReactNode {
  return (
    <Context.Provider value={props.container}>
      {props.children}
    </Context.Provider>
  );
}
Provider.displayName = "Provider";

