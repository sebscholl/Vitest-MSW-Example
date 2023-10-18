# Vue 3 + Vite + MSW

## Steps to Re-create

```sh
$ npm create vite@latest
=> Vue
=> Javascript

$ npm i -D @vue/test-utils @vitejs/plugin-vue happy-dom msw
$ npm run dev
```

However, just clone the repo if you rather use the examples:

```sh
$ git clone git@github.com:sebscholl/Vitest-MSW-Example.git
```

### Relevant App Directories

- src/utils/api
- src/stores/users
- src/views/UsersList
- src/views/UsersListItem


## Relevant Test Directories

- **vitest.config.js**
- test/setup.js
- test/mocks/index.js
- test/views/UserList.spec.js
- test/support/renderSupport.js
- test/mocks/randomuser/_api.js
