<script setup lang="ts">
import Index from '../index.vue';

import { Defined } from '@poolofdeath20/util';

const route = useRoute();

const category = Defined.parse(route.params.category)
	.map((category) => {
		if (typeof category === 'string') {
			return category;
		}

		throw new Error(
			`Expected string, got "${category}" with type '${typeof category}'`
		);
	})
	.orThrow('Category not found');
</script>

<template>
	<Index :category="category" />
</template>
