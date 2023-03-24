module.exports = {
  extends: ['@commitlint/config-conventional'],
  rulles: {
    /** @前缀 */
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
    /** @scope必须小写 */
    'scope-case': [2, 'always', 'lower-case'],
  },
}
