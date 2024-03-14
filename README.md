# gitea-wait-for-checks

[![GitHub Super-Linter](https://github.com/Legytma/gitea-wait-for-checks/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/Legytma/gitea-wait-for-checks/actions/workflows/ci.yml/badge.svg)
![Coverage](badges/coverage.svg)

**_This action was inspired on
[lewagon/wait-on-check-action](https://github.com/lewagon/wait-on-check-action).
And is writed in Javascript to work on Gitea Actions._**

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

### Using Workflow Name

```yml
name: Publish

on: [push]

jobs:
  publish:
    name: Publish the package
    runs-on: ubuntu-latest
    steps:
      - name: Wait for tests to succeed
        uses: Legytma/gitea-wait-for-checks@v1.0.0
        with:
          api-endpoint: ${{ gitea.server_url }}
          ref: ${{ gitea.sha }}
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          wait-interval: 10
          workflow-names:
            - 'Test'
      ...
```

### Using Job Name

```yml
name: Publish

on: [push]

jobs:
  publish:
    name: Publish the package
    runs-on: ubuntu-latest
    steps:
      - name: Wait for tests to succeed
        uses: Legytma/gitea-wait-for-checks@v1.0.0
        with:
          api-endpoint: ${{ gitea.server_url }}
          ref: ${{ gitea.sha }}
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          wait-interval: 10
          job-names:
            - 'Run tests'
      ...
```

### Wait interval (optional, default: 10)

As it could be seen in many examples, there's a parameter `wait-interval`, and
sets a time in seconds to be waited between requests to the GitHub API. The
default time is 10 seconds.
