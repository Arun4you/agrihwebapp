module.exports = {
  extends: [
    "eslint-config-universe/shared/core.js",
    "eslint-config-universe/shared/react.js",
    "eslint-config-universe/shared/prettier.js"
  ],
  env: { browser: true, commonjs: true },
  globals: {
    __DEV__: false,
    Atomics: false,
    ErrorUtils: false,
    FormData: false,
    SharedArrayBuffer: false,
    XMLHttpRequest: false,
    alert: false,
    cancelAnimationFrame: false,
    cancelIdleCallback: false,
    clearImmediate: false,
    clearInterval: false,
    clearTimeout: false,
    fetch: false,
    navigator: false,
    process: false,
    requestAnimationFrame: false,
    requestIdleCallback: false,
    setImmediate: false,
    setInterval: false,
    setTimeout: false,
    window: false
  }
};
