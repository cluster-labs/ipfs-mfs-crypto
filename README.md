# MFS(Mutable File System) JavaScript Implementation with Crypto

[![](https://img.shields.io/badge/made%20by-Cluster%20Labs-blue.svg?style=flat-square)](https://clusterlabs.io)

> JavaScript implementation of the IPFS Mutable File System

[The MFS spec can be found inside the ipfs/specs repository](https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#mutable-file-system)

## Lead Maintainer

[Vaibhav Saini](https://github.com/vasa-develop)

## Table of Contents

- [Install](#install)
  - [npm](#npm)
  - [Use in Node.js](#use-in-nodejs)
  - [Use in a browser with browserify, webpack or any other bundler](#use-in-a-browser-with-browserify-webpack-or-any-other-bundler)
  - [Use in a browser using a script tag](#use-in-a-browser-using-a-script-tag)
  - [A note on concurrency](#a-note-on-concurrency)
- [Contribute](#contribute)
- [Changelog](#changelog)
- [License](#license)

## Install

### npm

```sh
> npm i ipfs-mfs-crypto
```

### Use in Node.js

```JavaScript
const mfs = require('ipfs-mfs-crypto')
```
***See [`encrypt.spec.js`](./test/encrypt.spec.js) and [`decrypt.spec.js`](./test/decrypt.spec.js) for encryption and decryption methods.***

### Use in a browser with browserify, webpack or any other bundler

The code published to npm that gets loaded on require is an ES5 transpiled version with the right shims added. This means that you can require it and use with your favourite bundler without having to adjust asset management process.

```JavaScript
const mfs = require('ipfs-mfs-crypto')
```

### Use in a browser using a script tag

Loading this module through a script tag will make the `mfs` obj available in the global namespace.

```html
<script src="https://npmcdn.com/ipfs-mfs-crypto/dist/index.min.js"></script>
<!-- OR -->
<script src="https://npmcdn.com/ipfs-mfs-crypto/dist/index.js"></script>
```

### A note on concurrency

The mfs works by storing a reference to the root node's CID in LevelDB. LevelDB does not support concurrent access so there are read/write locks around bits of the code that modify the the root node's CID.

A lock is kept on the main thread and any requests to read/write from workers or the main thread itself are queued pending release of the lock by the existing holder.

Reads are executed together, writes are executed sequentially and prevent any reads from starting.

If you are using IPFS in a single process or with the node [cluster](https://nodejs.org/api/cluster.html) module this should be completely transparent.

If you are using [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) there is no way to globally listen to messages sent between workers and the main thread so you will need to also use the [observable-webworkers](https://www.npmjs.com/package/observable-webworkers) module to ensure the right message transports are set up to allow requesting/releasing the locks.

## Contribute

All are welcome, please join in!

<!-- This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md). -->

Open an [issue](https://github.com/cluster-labs/ipfs-mfs-crypto/issues) or send a [PR](https://github.com/cluster-labs/ipfs-mfs-crypto/pulls) - see [CONTRIBUTING.md](./CONTRIBUTING.md) for how to make sure your branch is ready for PRing.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for details of what has changed between releases.

## License

[MIT](LICENSE)
