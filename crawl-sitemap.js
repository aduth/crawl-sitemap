import { get } from 'http-or-https';
// @ts-ignore
import saxophonist from 'saxophonist';
import decompressResponse from 'decompress-response';

/** @typedef {{path:string[], text:string}} Element */

/**
 * Returns a promise resolving to the incoming message value of a HTTP or HTTPS get request.
 *
 * @param {string} url URL to request.
 *
 * @return {Promise<import('http').IncomingMessage>}
 */
function getResponse(url) {
	return new Promise((resolve) => get(url, resolve));
}

/**
 * Crawl to discover all URL locations defined in a sitemap or sitemap index.
 *
 * @param {string} url Sitemap URL.
 *
 * @return {AsyncGenerator<string>}
 */
async function* crawl(url) {
	const response = decompressResponse(await getResponse(url));

	const locs = response.pipe(saxophonist('loc'));
	for await (const loc of locs) {
		const { text, path } = /** @type {Element} */ (loc);
		const pathParent = path[path.length - 2];
		if (pathParent === 'sitemap') {
			yield* crawl(text);
		} else {
			yield text;
		}
	}
}

export default crawl;
