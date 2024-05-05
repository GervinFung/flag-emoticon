import { Defined } from '@poolofdeath20/util';

import unicodes from '../../../data/unicodes';

export default defineEventHandler((event) => {
	const countryName = Defined.parse(getRouterParam(event, 'name'))
		.map(decodeURIComponent)
		.orThrow(`Missing required parameter 'name'`);

	const code = unicodes.find((unicode) => {
		const name = unicode.name.replace(' Flag', '');

		if (countryName === 'BRITAIN' && name === 'United Kingdom') {
			return true;
		}

		return (
			name.toLowerCase() === countryName.toLowerCase() ||
			name
				.split(' ')
				.map((character) => {
					return character.charAt(0);
				})
				.filter((character) => {
					return character === character.toUpperCase();
				})
				.join('') === countryName
		);
	});

	return !code
		? ({
				status: 'failed',
				reason: `Country '${countryName}' not found`,
			} as const)
		: ({
				status: 'success',
				code: {
					name: code.name.replace(' Flag', ''),
					svg: `${code.unified.toLowerCase()}.svg`,
				},
			} as const);
});
