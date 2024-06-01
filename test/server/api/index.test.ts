import { beforeAll, afterAll, describe } from 'vitest';

import Server from '../spawn';
import testServerApiCountryName from './country/[name]';

const testServerApi = () => {
	const port = 3000;

	const server = Server.from(port);

	beforeAll(async () => {
		await server.start();
	});

	describe('Server API tests', () => {
		testServerApiCountryName(port);
	});

	afterAll(() => {
		server.kill();
	});
};

testServerApi();
