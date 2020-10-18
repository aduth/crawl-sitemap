export default crawl;
export type Element = {
    path: string[];
    text: string;
};
/**
 * Crawl to discover all URL locations defined in a sitemap or sitemap index.
 *
 * @param {string} url Sitemap URL.
 *
 * @return {AsyncGenerator<string>}
 */
declare function crawl(url: string): AsyncGenerator<string>;
