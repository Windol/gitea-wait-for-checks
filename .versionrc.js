module.exports = {
  scripts: {
    prerelease: 'npm run all && test -z "$(git status --porcelain)"',
    postchangelog: 'npm run format:write'
  },
  types: [
    {
      type: 'feat',
      section: 'Features'
    },
    {
      type: 'fix',
      section: 'Bug Fixes'
    },
    {
      type: 'chore',
      hidden: true
    },
    {
      type: 'docs',
      section: 'Documentation'
    },
    {
      type: 'style',
      section: 'Changes that do not affect the meaning of the code'
    },
    {
      type: 'refactor',
      section: 'Code change that neither fixes a bug nor adds a feature'
    },
    {
      type: 'perf',
      section: 'Code changes that improves performance'
    },
    {
      type: 'test',
      section: 'Tests'
    },
    {
      type: 'build',
      section: 'Build System',
      hidden: true
    },
    {
      type: 'ci',
      section: 'Continuous Integration'
    }
  ],
  bumpFiles: [
    {
      filename: 'README.md',
      updater: {
        readVersion: contents => {
          const versionRegex =
            /(gitea-wait-for-checks@v)((0|(?:[1-9]\d*))\.(0|(?:[1-9]\d*))\.(0|(?:[1-9]\d*))(?:-((?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*))(?:\.(?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*)))*))?(?:\+((?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*))(?:\.(?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*)))*))?)/gm;

          const result = versionRegex.exec(contents);

          return result === null ? null : result[2];
        },
        writeVersion: (contents, version) => {
          const versionRegex =
            /(gitea-wait-for-checks@v)((0|(?:[1-9]\d*))\.(0|(?:[1-9]\d*))\.(0|(?:[1-9]\d*))(?:-((?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*))(?:\.(?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*)))*))?(?:\+((?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*))(?:\.(?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*)))*))?)/gm;

          return contents.replace(versionRegex, `$1${version}`);
        }
      }
    }
  ],
  'tag-prefix': 'v',
  releaseCommitMessageFormat:
    'chore(release): version {{currentTag}}\n\nAuto generated version.',
  sign: false
};
