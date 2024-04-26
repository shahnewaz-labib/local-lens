## Development Setup

Install packages with,

```sh
bun install
```

### Setup Database

1. Start the postgres container. Make sure to populate `.dockerenv`.

    ```sh
    bun db:start
    ```

2. Push schema changes to database.

    ```sh
    bun db:migrate:deploy
    ```

3. Generate prisma definitions.

    ```sh
    bun db:generate
    ```
