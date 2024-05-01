<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Tooltip from 'primevue/tooltip';

import { capitalize } from '@poolofdeath20/util';

import unicodes from '~/data/unicodes';

const search = ref('');

const filteredUnicodes = computed(() => {
	return !search
		? unicodes
		: unicodes.filter((unicode) => {
				return unicode.name
					.toLowerCase()
					.includes(search.value.toLowerCase());
			});
});

const pagination = reactive({
	state: {
		page: 0,
		rows: 10,
	},
});

const sliceUnicodes = (
	props: Readonly<{
		page: number;
		rows: number;
	}>
) => {
	return filteredUnicodes.value
		.slice(props.page * props.rows, (props.page + 1) * props.rows)
		.map((unicode) => {
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

const vTooltip = Tooltip;
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
			<FloatLabel>
				<InputText id="search" type="text" v-model="search" />
				<label for="search">Search</label>
			</FloatLabel>
			<DataTable
				:value="sliceUnicodes(pagination.state)"
				tableStyle="min-width: 50rem"
			>
				<Column field="name" header="Name" />
				<Column field="short_name" header="Short Name" />
				<Column field="icon" header="Icon">
					<template #body="props">
						<Image :src="props.data.icon" alt="Emoji" />
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
			</DataTable>
			<Paginator
				:rows="10"
				:totalRecords="filteredUnicodes.length"
				:rowsPerPageOptions="[5, 10, 15]"
				@page="
					(event) => {
						pagination.state = event;
					}
				"
			/>
		</div>
	</div>
</template>
