# Insider’s Teeter Totter

A simulation/game built with **Vue 3**, **Vite**, and **TypeScript**.  
Objects randomly spawn on the right side, while **falling objects** appear on the left, controlled by **arrow keys** to keep the teeter-totter balanced.

---

## Features

- **Left Side**
    - Objects **fall** from the top. You can move the most recently spawned object **left/right** using arrow keys.
- **Right Side**
    - Objects **automatically spawn** at random positions and random weights.
- **Balance & Bending**
    - The teeter-totter tilts toward the heavier side. If the torque difference exceeds 20 kg·m or the bending surpasses 30%, the simulation ends.
- **Pause & Resume**
    - Freeze the simulation at any time, then resume from the same state.
- **Auto Mode**
    - Automatically spawn objects on the left side (instead of manual arrow-key control).
- **Restart**
    - Clear all objects and start again.
- **Vuex Store**
    - Manages application state, including paused, ended, autoMode, and the list of objects.
- **Atomic Design**
    - Organized into **atoms**, **molecules**, **organisms**, and **pages** for clearer structure.
- **Tests**
    - Basic unit tests with [Vitest](https://vitest.dev/).

---

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)  
  (Disable Vetur if you have it.)

## Type Support for `.vue` Imports in TS

TypeScript doesn’t handle `.vue` files by default. We use:
- [vue-tsc](https://www.npmjs.com/package/vue-tsc) for type checking.
- The [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension for `.vue` types in VSCode.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

---

## Project Setup

```sh
npm install
```
## Compile and Hot-Reload for Development

```sh
npm run dev
```
## Run Unit Tests with Vitest
```sh
npm run test:unit
```
## Lint with ESLint
```sh
npm run lint
```