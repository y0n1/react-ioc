/**
 * A minimal IoC container that maps symbol keys to registered values.
 * Use with {@link Provider} and {@link useInjection} in React.
 */
export class Container {
    readonly #registry: Record<symbol, unknown>;

    /** Creates an empty container. */
    constructor() {
        this.#registry = {};
    }

    /**
     * Resolves a value by its registration symbol.
     * @param registeredInterfaceSymbol - The symbol used when registering the value.
     * @returns The registered value.
     * @template T - The type of the resolved value.
     */
    get<T>(registeredInterfaceSymbol: symbol): T {
        const value = this.#registry[registeredInterfaceSymbol] as T;
        return value;
    }

    /**
     * Registers a value under the given symbol. Enables fluent chaining.
     * @param registeredInterfaceSymbol - Symbol to use as the key for this value.
     * @param value - The value to register (implementation of the interface).
     * @returns This container for method chaining.
     * @template T - The type of the value (defaults to unknown).
     */
    register<T = unknown>(
        registeredInterfaceSymbol: symbol,
        value: T
    ): Container {
        this.#registry[registeredInterfaceSymbol] = value;

        return this;
    }
}