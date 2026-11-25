import { assertEquals, assertThrows } from "jsr:@std/assert@^1";
import { Container } from "./Container.ts";

Deno.test("get() returns the registered value", () => {
  const container = new Container();
  const Token = Symbol("Token");
  const value = { id: 1 };

  container.register(Token, value);

  assertEquals(container.get<typeof value>(Token), value);
});

Deno.test("get() throws when the symbol is not registered", () => {
  const container = new Container();
  const Missing = Symbol("Missing");

  assertThrows(
    () => container.get(Missing),
    Error,
    `No binding found for ${Missing.toString()}. Did you forget to register it?`,
  );
});

Deno.test("get() returns undefined when undefined was registered", () => {
  const container = new Container();
  const Token = Symbol("UndefinedToken");

  container.register(Token, undefined);

  assertEquals(container.get(Token), undefined);
});

Deno.test("get() returns null when null was registered", () => {
  const container = new Container();
  const Token = Symbol("NullToken");

  container.register(Token, null);

  assertEquals(container.get(Token), null);
});
