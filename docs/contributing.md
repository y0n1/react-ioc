# Contributing

## Prerequisites

- [Deno](https://deno.land/) v2 or later
- A GitHub account

## Development workflow

1. Fork and clone the repository.
2. Create a feature branch from `main`.
3. Make your changes.
4. Validate your changes by running the publish dry-run task:

   ```bash
   deno task check:publish
   ```

   This runs the full JSR publish pipeline (type-checking, module graph
   validation, slow types check) without actually publishing. Every change
   must pass this check before it can be merged.

5. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
   format. Pull request titles are validated automatically and used as the
   squash commit message. Examples:

   - `fix: correct type annotation in Context`
   - `feat: add scoped container support`
   - `docs: update API reference`

6. Open a pull request against `main`. The CI will run two checks:
   - **lint-pr-title** — validates your PR title follows conventional commits.
   - **dry-run-publish** — runs `deno task check:publish` to catch type errors
     and publish issues before merging.

7. Once approved and merged, [release-please](https://github.com/googleapis/release-please)
   will automatically create a release PR that bumps the version and updates
   the changelog based on your commit type (`fix:` = patch, `feat:` = minor,
   `feat!:` / `BREAKING CHANGE:` = major).

## Available tasks

| Task              | Command                      | Description                          |
| ----------------- | ---------------------------- | ------------------------------------ |
| `check:publish`   | `deno task check:publish`    | Dry-run JSR publish (type-check + validation) |
