**package.json**

```json
{
  "scripts": {
    "lint": "eslint --ext \".ts\" --ignore-path .gitignore .",
    "lintfix": "npm run lint -- --fix",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.ts": "eslint --cache"
  },
  "dependencies": {},
  "devDependencies": {
    "@commitlint/cli": "17.4.4",
    "@commitlint/config-conventional": "17.4.4",
    "@rocketseat/eslint-config": "1.2.0",
    "eslint": "8.35.0",
    "husky": "8.0.3",
    "lint-staged": "13.1.2"
  }
}
```

**commitlint.config.js**

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

`npm run prepare`

`npx kusky add .husky/pre-commit "npx --no-install lint-staged"`

`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`
