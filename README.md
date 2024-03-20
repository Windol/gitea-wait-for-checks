# gitea-wait-for-checks

![Check Transpiled JavasScript](https://github.com/Legytma/gitea-wait-for-checks/actions/workflows/check-dist.yml/badge.svg)
[![GitHub Super-Linter](https://github.com/Legytma/gitea-wait-for-checks/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/Legytma/gitea-wait-for-checks/actions/workflows/ci.yml/badge.svg)
![CodeQL](https://github.com/Legytma/gitea-wait-for-checks/actions/workflows/codeql-analysis.yml/badge.svg)
![Coverage](badges/coverage.svg)

**_This action was inspired on
[lewagon/wait-on-check-action](https://github.com/lewagon/wait-on-check-action).
And is writed in JavaScript to work on Gitea Actions._**

Pause a workflow until a job in another workflow completes successfully.

This action uses the
[Gitea API (Get a commit's statuses)](https://docs.gitea.com/api/1.21/#tag/repository/operation/repoListStatuses)
to poll for check results. On success, the action exit allowing the workflow
resume. Otherwise, the action will exit with status code 1 and fail the whole
workflow.

This is a workaround to Gitea Action's limitation of non-interdependent
workflows :tada:

You can **run your workflows in parallel** and pause a job until a job in
another workflow completes successfully.

## Minimal example

`.gitea/workflows/test.yaml`

```yml
name: Test

on: [push]

jobs:
  test:
    name: Run tests
    runs-on: ubuntu-latest
      steps:
        ...
```

`.gitea/workflows/push.yaml`

```yml
name: Publish

on: [push]

jobs:
  publish:
    name: Publish the package
    runs-on: ubuntu-latest
    steps:
      - name: Wait for tests to succeed
        uses: Legytma/gitea-wait-for-checks@v1.1.0
      ...
```

### Using Workflow Name

Each workflow name must be on one line.

`.gitea/workflows/push.yaml`

```yml
name: Publish

on: [push]

jobs:
  publish:
    name: Publish the package
    runs-on: ubuntu-latest
    steps:
      - name: Wait for tests to succeed
        uses: Legytma/gitea-wait-for-checks@v1.1.0
        with:
          workflow-names: |-
            Test
      ...
```

### Using Job Name

Each workflow name must be on one line.

`.gitea/workflows/push.yaml`

```yml
name: Publish

on: [push]

jobs:
  publish:
    name: Publish the package
    runs-on: ubuntu-latest
    steps:
      - name: Wait for tests to succeed
        uses: Legytma/gitea-wait-for-checks@v1.1.0
        with:
          job-names: |-
            Run tests
      ...
```

### Wait interval (optional, default: 10)

As it could be seen in many examples, there's a parameter `wait-interval`, and
sets a time in seconds to be waited between requests to the GitHub API. The
default time is 10 seconds.
