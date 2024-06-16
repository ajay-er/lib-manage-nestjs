/* eslint-disable @typescript-eslint/no-explicit-any */
const Configuration = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  ignores: [
    (commitMessage: any) => commitMessage.startsWith('chore(release): :bookmark: bump version'),
  ],
};

export default Configuration;
