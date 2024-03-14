/**
 * Unit tests for src/gitea-get-statuses.js
 */
const { giteaGetStatuses } = require('../src/gitea-get-statuses');
const { expect } = require('@jest/globals');

require('dotenv').config();

describe('gitea-get-statuses.js', () => {
  it('return an empty response', async () => {
    const apiEndpoint = process.env.TEST_GITEA_API_ENDPOINT;
    const apiToken = process.env.TEST_GITEA_API_TOKEN;
    const owner = process.env.TEST_GITEA_OWNER;
    const repository = process.env.TEST_GITEA_REPOSITORY;
    const reference = 'invalid';

    expect(apiEndpoint).toBeDefined();
    expect(apiToken).toBeDefined();
    expect(owner).toBeDefined();
    expect(repository).toBeDefined();
    expect(reference).toBeDefined();

    await expect(
      giteaGetStatuses(apiEndpoint, apiToken, owner, repository, reference)
    ).resolves.toStrictEqual({
      commit_url: '',
      repository: null,
      sha: '',
      state: '',
      statuses: null,
      total_count: 0,
      url: ''
    });
  });

  it('get a valid reference', async () => {
    const apiEndpoint = process.env.TEST_GITEA_API_ENDPOINT;
    const apiToken = process.env.TEST_GITEA_API_TOKEN;
    const owner = process.env.TEST_GITEA_OWNER;
    const repository = process.env.TEST_GITEA_REPOSITORY;
    const reference = process.env.TEST_GITEA_REFERENCE;

    expect(apiEndpoint).toBeDefined();
    expect(apiToken).toBeDefined();
    expect(owner).toBeDefined();
    expect(repository).toBeDefined();
    expect(reference).toBeDefined();

    await expect(
      giteaGetStatuses(apiEndpoint, apiToken, owner, repository, reference)
    ).toBeDefined();
  });
});
