/**
 * Unit tests for src/gitea-get-statuses.js
 */
const { giteaGetStatuses } = require('../src/gitea-get-statuses');
const { expect, it, describe, beforeEach } = require('@jest/globals');

jest.mock('cross-fetch');

const crossFetch = require('cross-fetch');

describe('gitea-get-statuses.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('return an empty response', async () => {
    const apiEndpoint = 'https://localhost';
    const apiToken = 'gitea_api_secret_token';
    const owner = 'example-owner';
    const repository = 'example-repository';
    const reference = 'invalid-reference';
    const expectedResponse = {
      commit_url: '',
      repository: null,
      sha: '',
      state: '',
      statuses: null,
      total_count: 0,
      url: ''
    };

    crossFetch.mockImplementationOnce(async () =>
      Response.json(expectedResponse)
    );

    await expect(
      giteaGetStatuses(apiEndpoint, apiToken, owner, repository, reference)
    ).resolves.toEqual(expectedResponse);
  });

  it('get a valid reference', async () => {
    const apiEndpoint = 'https://localhost';
    const apiToken = 'gitea_api_secret_token';
    const owner = 'example-owner';
    const repository = 'example-repository';
    const reference = 'valid-reference';
    const expectedResponse = {
      commit_url: '',
      repository: {
        id: 1,
        owner: {
          id: 2,
          login: 'example-owner',
          login_name: '',
          full_name: '',
          email: '',
          avatar_url: 'https://localhost/avatars/avatar_hash',
          language: '',
          is_admin: false,
          last_login: '0001-01-01T00: 00: 00Z',
          created: '2023-12-07T21: 23: 03Z',
          restricted: false,
          active: false,
          prohibit_login: false,
          location: '',
          website: '',
          description: '',
          visibility: 'private',
          followers_count: 0,
          following_count: 0,
          starred_repos_count: 0,
          username: 'example-owner'
        },
        name: 'example-repository',
        full_name: 'example-owner/example-repository',
        description: '',
        empty: false,
        private: true,
        fork: false,
        template: false,
        parent: null,
        mirror: false,
        size: 7613,
        language: '',
        languages_url:
          'https://localhost/api/v1/repos/example-owner/example-repository/languages',
        html_url: 'https://localhost/example-owner/example-repository',
        url: 'https://localhost/api/v1/repos/example-owner/example-repository',
        link: '',
        ssh_url: 'ssh://git@localhost:122/example-owner/example-repository.git',
        clone_url: 'https://localhost/example-owner/example-repository.git',
        original_url: '',
        website: '',
        stars_count: 0,
        forks_count: 0,
        watchers_count: 2,
        open_issues_count: 0,
        open_pr_counter: 1,
        release_counter: 0,
        default_branch: 'master',
        archived: false,
        created_at: '2023-12-07T21: 23: 56Z',
        updated_at: '2024-03-15T12: 39: 00Z',
        archived_at: '1970-01-01T00: 00: 00Z',
        permissions: {
          admin: true,
          push: true,
          pull: true
        },
        has_issues: true,
        internal_tracker: {
          enable_time_tracker: true,
          allow_only_contributors_to_track_time: true,
          enable_issue_dependencies: true
        },
        has_wiki: true,
        has_pull_requests: true,
        has_projects: true,
        has_releases: true,
        has_packages: true,
        has_actions: true,
        ignore_whitespace_conflicts: false,
        allow_merge_commits: true,
        allow_rebase: true,
        allow_rebase_explicit: true,
        allow_squash_merge: true,
        allow_rebase_update: true,
        default_delete_branch_after_merge: false,
        default_merge_style: 'merge',
        default_allow_maintainer_edit: false,
        avatar_url: '',
        internal: false,
        mirror_interval: '',
        mirror_updated: '0001-01-01T00: 00: 00Z',
        repo_transfer: null
      },
      sha: 'valid-reference',
      state: 'failure',
      statuses: [
        {
          id: 13,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/285/jobs/0',
          description: 'Successful in 2s',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context: 'Context testing / dump_contexts_to_log (push)',
          creator: null,
          created_at: '2024-03-15T12: 34: 36Z',
          updated_at: '2024-03-15T12: 34: 36Z'
        },
        {
          id: 14,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/286/jobs/0',
          description: 'Successful in 3s',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context: 'Context testing / dump_contexts_to_log (pull_request)',
          creator: null,
          created_at: '2024-03-15T12: 34: 36Z',
          updated_at: '2024-03-15T12: 34: 36Z'
        },
        {
          id: 15,
          status: 'failure',
          target_url:
            '/example-owner/example-repository/actions/runs/287/jobs/0',
          description: 'Failing after 8s',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context: 'Pull Request Labeler / labeler (pull_request)',
          creator: null,
          created_at: '2024-03-15T12: 34: 44Z',
          updated_at: '2024-03-15T12: 34: 44Z'
        },
        {
          id: 16,
          status: 'failure',
          target_url:
            '/example-owner/example-repository/actions/runs/288/jobs/0',
          description: 'Failing after 56s',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context:
            'Generate and Publish Release Version / wait-checks (pull_request)',
          creator: null,
          created_at: '2024-03-15T12: 35: 33Z',
          updated_at: '2024-03-15T12: 35: 33Z'
        },
        {
          id: 17,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/288/jobs/1',
          description: 'Has been skipped',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context:
            'Generate and Publish Release Version / pre-build (pull_request)',
          creator: null,
          created_at: '2024-03-15T12: 35: 33Z',
          updated_at: '2024-03-15T12: 35: 33Z'
        },
        {
          id: 18,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/288/jobs/2',
          description: 'Has been skipped',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context:
            'Generate and Publish Release Version / build-release (pull_request)',
          creator: null,
          created_at: '2024-03-15T12: 35: 33Z',
          updated_at: '2024-03-15T12: 35: 33Z'
        },
        {
          id: 19,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/288/jobs/3',
          description: 'Has been skipped',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context:
            'Generate and Publish Release Version / publish-release (pull_request)',
          creator: null,
          created_at: '2024-03-15T12: 35: 33Z',
          updated_at: '2024-03-15T12: 35: 33Z'
        },
        {
          id: 20,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/283/jobs/0',
          description: 'Successful in 1m7s',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context: 'Make Project Builds Workflow / Pre Build Job (push)',
          creator: null,
          created_at: '2024-03-15T12: 35: 40Z',
          updated_at: '2024-03-15T12: 35: 40Z'
        },
        {
          id: 21,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/284/jobs/0',
          description: 'Successful in 1m34s',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context:
            'Check Commit Messages Using Conventional Commit Patterns / check-commits (push)',
          creator: null,
          created_at: '2024-03-15T12: 36: 08Z',
          updated_at: '2024-03-15T12: 36: 08Z'
        },
        {
          id: 22,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/283/jobs/3',
          description: 'Successful in 3m10s',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context: 'Make Project Builds Workflow / Build Release Job (push)',
          creator: null,
          created_at: '2024-03-15T12: 38: 54Z',
          updated_at: '2024-03-15T12: 38: 54Z'
        },
        {
          id: 23,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/283/jobs/1',
          description: 'Successful in 3m13s',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context: 'Make Project Builds Workflow / Build Debug Job (push)',
          creator: null,
          created_at: '2024-03-15T12: 38: 56Z',
          updated_at: '2024-03-15T12: 38: 56Z'
        },
        {
          id: 24,
          status: 'success',
          target_url:
            '/example-owner/example-repository/actions/runs/283/jobs/2',
          description: 'Successful in 3m16s',
          url: 'https://localhost/api/v1/repos/example-owner/example-repository/statuses/valid-reference',
          context: 'Make Project Builds Workflow / Build Stage Job (push)',
          creator: null,
          created_at: '2024-03-15T12: 39: 00Z',
          updated_at: '2024-03-15T12: 39: 00Z'
        }
      ],
      total_count: 12,
      url: ''
    };

    crossFetch.mockImplementationOnce(async () =>
      Response.json(expectedResponse)
    );

    await expect(
      giteaGetStatuses(apiEndpoint, apiToken, owner, repository, reference)
    ).resolves.toEqual(expectedResponse);
  });
});
