Setup buf for GitHub Actions
============================

This action will install the [bufbuild/buf][buf] tooling inside of your GitHub Action workflow, making it available on the `$PATH` for use in your workflow build steps.

The bufbuild teams also offers [a GitHub Actions workflow example using CMake][buf-example], if that's more to your liking.

## Current limitations

The buf tooling is still a work in progress.

As of `2020-06-25`, only builds for Linux and Darwin are available. For this reason, this action will fail if used with a Windows or macOS runner.

## Usage

Using the action is very simple.

```yaml
name: Quality control pull requests

on: pull_request

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: wizhi/setup-buf@v1
        with:
          version: 0.18.0
      - run: buf check lint

  breaking:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: wizhi/setup-buf@v1
        with:
          version: 0.18.0
      - run: buf check breaking --against-input ".git#ref=${{ github.base_ref }}"

```

[buf]: https://github.com/bufbuild/buf
[buf-example]: https://github.com/bufbuild/buf-example
