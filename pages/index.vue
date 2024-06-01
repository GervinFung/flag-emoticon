<script setup lang="ts">
import { ref, computed } from 'vue';

import { useDebounceFn } from '@vueuse/core';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Tooltip from 'primevue/tooltip';

import { capitalize } from '@poolofdeath20/util';

import unicodes from '~/data/unicodes';

const props = defineProps<{
	category: undefined | string;
}>();

const category = ref(
	!props.category
		? undefined
		: {
				code: props.category,
				name: capitalize(props.category),
			}
);

const route = useRoute();

const router = useRouter();

const pagination = computed(() => {
	const { page, rows } = route.query;

	return {
		page: typeof page !== 'string' ? 0 : parseInt(page),
		rows: typeof rows !== 'string' ? 10 : parseInt(rows),
	};
});

const search = useSearch();

const categories = ref(
	Array.from(
		new Set(
			unicodes.map((unicode) => {
				return unicode.subcategory.replace('-flag', '');
			})
		)
	).map((category) => {
		return {
			name: capitalize(category),
			code: category,
		};
	})
);

const filteredUnicodes = computed(() => {
	if (search.value && props.category) {
		return unicodes.filter((unicode) => {
			return (
				unicode.name
					.toLowerCase()
					.includes(search.value.toLowerCase()) &&
				unicode.subcategory === `${props.category}-flag`
			);
		});
	}

	if (props.category) {
		return unicodes.filter((unicode) => {
			return unicode.subcategory === `${props.category}-flag`;
		});
	}

	if (search.value) {
		return unicodes.filter((unicode) => {
			return unicode.name
				.toLowerCase()
				.includes(search.value.toLowerCase());
		});
	}

	return unicodes;
});

const sliceUnicodes = (
	props: Readonly<{
		page: number;
		rows: number;
	}>
) => {
	const start = props.page * props.rows;

	const end = (props.page + 1) * props.rows;

	return filteredUnicodes.value.slice(start, end).map((unicode) => {
		const unified = unicode.unified.toLowerCase();

		const available = [
			{
				label: 'Apple',
				value: unicode.has_img_apple,
			},
			{
				label: 'Google',
				value: unicode.has_img_google,
			},
			{
				label: 'Twitter',
				value: unicode.has_img_twitter,
			},
			{
				label: 'Facebook',
				value: unicode.has_img_facebook,
			},
		];

		return {
			...unicode,
			unified,
			available,
			icon: `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${unified}.svg`,
			name: unicode.name
				.replace(' Flag', '')
				.toLowerCase()
				.split(' ')
				.map(capitalize)
				.join(' '),
		};
	});
};

const copy = (text: string) => {
	if (navigator?.clipboard?.writeText) {
		navigator.clipboard.writeText(text);
	} else {
		const element = document.createElement('textarea');

		element.value = text;

		element.setAttribute('readonly', '');

		element.style.position = 'absolute';

		element.style.left = '-9999px';

		document.body.appendChild(element);

		element.select();

		document.execCommand('copy');

		document.body.removeChild(element);
	}
};

watch(
	search,
	useDebounceFn((newSearch, oldSearch) => {
		if (oldSearch !== newSearch) {
			router.push({
				query: !newSearch
					? undefined
					: {
							search: newSearch,
						},
			});
		}
	}, 500)
);

watch(
	() => {
		return route.query.search;
	},
	(newSearch, oldSearch) => {
		if (oldSearch !== newSearch) {
			search.value = typeof newSearch !== 'string' ? '' : search.value;
		}
	},
	{
		immediate: true,
	}
);

watch(
	() => {
		return category.value;
	},
	(newCategory, oldCategory) => {
		router.push(
			newCategory === oldCategory ? '/' : `/category/${newCategory?.code}`
		);
	},
	{
		immediate: true,
	}
);

const vTooltip = Tooltip;

const slicedUnicodes = computed(() => {
	return sliceUnicodes(pagination.value);
});
</script>

<template>
	<div class="flex justify-content-center">
		<div
			class="gap-6 flex flex-column align-items-center justify-content-center"
			style="width: fit-content"
		>
			<h2 class="font-bold" style="margin: 0">
				Want to know the Unicode of a flag? Search below!
			</h2>
			<div class="flex flex-row gap-5">
				<FloatLabel style="width: fit-content">
					<InputText id="search" type="text" v-model="search" />
					<label for="search">Search</label>
				</FloatLabel>
				<Dropdown
					v-model="category"
					style="width: fit-content"
					:options="categories"
					optionLabel="name"
					placeholder="Category"
				/>
			</div>
			<template v-if="!slicedUnicodes.length">
				<div style="min-height: 40vh">
					<p>
						No results found
						{{ search ? `for "${search}"` : undefined }}
						{{
							category
								? `for category "${category.code}"`
								: 'in all categories'
						}}
					</p>
				</div>
			</template>
			<template v-else>
				<DataTable
					:value="slicedUnicodes"
					tableStyle="min-width: 50rem"
				>
					<Column field="name" header="Name" />
					<Column field="short_name" header="Short Name" />
					<Column field="icon" header="Icon">
						<template #body="props">
							<Image
								:src="props.data.icon"
								:alt="props.data.name + ' Icon'"
							/>
						</template>
					</Column>
					<Column field="unified" header="Unicode">
						<template #body="props">
							<div
								v-tooltip.bottom="'Click to copy'"
								class="cursor-pointer"
								@click="copy(props.data.unified)"
							>
								{{ props.data.unified }}
							</div>
						</template>
					</Column>
					<Column field="available" header="Availability">
						<template #body="props">
							<div
								v-for="item in props.data.available"
								:key="item.label"
							>
								<div class="flex gap-2 align-items-center">
									<i
										style="color: var(--primary-400)"
										class="pi"
										:class="{
											'pi-verified': item.value,
											'pi-times-circle': !item.value,
										}"
									/>
									{{ item.label }}
								</div>
							</div>
						</template>
					</Column>
					<Column field="subcategory" header="Category">
						<template #body="props">
							<div
								v-tooltip.bottom="'Click to copy'"
								class="cursor-pointer"
							>
								{{
									props.data.subcategory.replace('-flag', '')
								}}
							</div>
						</template>
					</Column>
				</DataTable>
				<Paginator
					:rows="pagination.rows"
					:totalRecords="filteredUnicodes.length"
					:rowsPerPageOptions="[5, 10, 15]"
					@page="
						(event) => {
							router.push({
								query: {
									...route.query,
									page: event.page,
									rows: event.rows,
								},
							});
						}
					"
				/>
			</template>
		</div>
	</div>
</template>
