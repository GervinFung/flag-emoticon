import { it, expect, describe } from 'vitest';

import axios from 'axios';

const testServerApiCountryName = (port: number) => {
	return describe('api country name test suite', () => {
		it.each(['united kingdom', 'United Kingdom'])(
			'should return success result if country name is in valid format (%s)',
			async (country) => {
				const { data } = await axios.get(
					encodeURI(`http://localhost:${port}/api/country/${country}`)
				);

				expect(data).toStrictEqual({
					status: 'success',
					code: {
						name: 'United Kingdom',
						svg: '1f1ec-1f1e7.svg',
					},
				});
			}
		);

		it.each(['united-kingdom', 'los santos'])(
			'should return failure result if country name is not in valid format (%s)',
			async (country) => {
				const { data } = await axios.get(
					encodeURI(`http://localhost:${port}/api/country/${country}`)
				);

				expect(data).toStrictEqual({
					status: 'failed',
					reason: `Country '${country}' not found`,
				});
			}
		);
	});
};

export default testServerApiCountryName;
