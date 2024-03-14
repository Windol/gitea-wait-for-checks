const { giteaApi } = require('gitea-js');
const fetch = require('cross-fetch'); // You have to use a fetch compatible polyfill like cross-fetch for Node.JS

/**
 * Wait for a number of milliseconds.
 *
 * @param {number} milliseconds The number of milliseconds to wait.
 * @returns {Promise<string>} Resolves with 'done!' after the wait is over.
 */
async function giteaGetStatuses(
  apiEndpoint,
  repoToken,
  owner,
  repository,
  reference
) {
  const sanitizedEndpoint = apiEndpoint
    .replaceAll('/api/v1/', '')
    .replaceAll('/api/v1', '');
  const api = new giteaApi(sanitizedEndpoint, {
    token: repoToken, // generate one at https://gitea.example.com/user/settings/applications
    customFetch: fetch
  });

  const response = await api.repos.repoGetCombinedStatusByRef(
    owner,
    repository,
    reference
  );

  return response.data;
}

module.exports = { giteaGetStatuses };
