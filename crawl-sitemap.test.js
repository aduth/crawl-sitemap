import { createServer } from 'http';
import handler from 'serve-handler';
import chai from 'chai';
import crawl from './crawl-sitemap.js';

const PORT = 6782;

const { expect } = chai;

/** @type {string} */
let rootURL;

/** @type {import('http').Server} */
let server;

before(async () => {
	server = createServer((request, response) => {
		return handler(request, response, {
			public: 'test/fixtures',
			redirects: [{ source: 'redirect-to-d', destination: 'd.html' }],
		});
	}).listen(PORT);

	rootURL = `http://localhost:${PORT}`;
});

after((done) => {
	server.close(done);
});

describe('crawl', () => {
	describe('sitemapindex', () => {
		it('crawls urls', async () => {
			let urls = [];
			for await (const url of crawl(`${rootURL}/sitemap-index.xml`)) urls.push(url);
			expect(urls).to.have.members([`${rootURL}/1`, `${rootURL}/2`]);
		});
	});

	describe('urlset', () => {
		it('crawls urls', async () => {
			let urls = [];
			for await (const url of crawl(`${rootURL}/sitemap.xml`)) urls.push(url);
			expect(urls).to.have.members([`${rootURL}/`]);
		});
	});

	describe('404', () => {
		it('throws error', async () => {
			let urls = [];
			let error;
			try {
				for await (const url of crawl(`${rootURL}/sitemap-missing.xml`)) urls.push(url);
			} catch (_error) {
				error = _error;
			}

			expect(error).to.be.instanceOf(Error);
			expect(error.message).to.equal(`Not found: ${rootURL}/sitemap-missing.xml`);
		});
	});
});
