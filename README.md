# crawl-sitemap

Crawl to discover all URL locations defined in a sitemap or sitemap index.

## Example

```js
import crawl from 'crawl-sitemap';

for await (const url of crawl('https://andrewduthie.com/sitemap.xml')) {
	console.log(url);
}

// → https://andrewduthie.com/2019/11/29/back-to-basics-a-possible-future-without-javascript-build-tools/
// → https://andrewduthie.com/2020/03/15/typescript-types-for-productivity/
// → https://andrewduthie.com/2019/12/22/font-loading-performance-for-single-page-applications/
// ...
```

## Installation

`crawl-sitemap` is authored as an [ESM module](https://nodejs.org/api/esm.html), and therefore requires Node 12.0 or newer.

Install using NPM or Yarn:

```
npm install crawl-sitemap
```

```
yarn add crawl-sitemap
```

## Usage

The default export will return an async generator when called, which can be iterated asynchronously with `for await` to operate on crawled links as soon as they're discovered:

```js
for await (const url of crawl('https://andrewduthie.com/sitemap.xml')) {
	console.log(url);
}
```

## API

```ts
function crawl(url: string): AsyncGenerator<string>;
```

## License

Copyright 2020 Andrew Duthie

Released under the MIT License. See [LICENSE.md](./LICENSE.md).
