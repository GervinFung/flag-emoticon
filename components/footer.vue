<script setup lang="ts">
import { computed } from 'vue';
import { breakpointsPrimeFlex, useBreakpoints } from '@vueuse/core';

const repo = 'https://github.com/GervinFung/flag-emoticon';

const links = [
	{
		section: 'Report a bug',
		link: `${repo}/issues`,
	},
	{
		section: 'Open source project',
		link: repo,
	},
];

const breakpoints = useBreakpoints(breakpointsPrimeFlex);

const isSmOrLower = computed(() => {
	const { value } = breakpoints.active();

	return !value || value === 'xs';
});
</script>

<template>
	<div
		class="flex flex-column align-items-center justify-content-center gap-3 sm:pt-2 sm:pb-3 py-4 mt-7 border-top-1 border-gray-200"
	>
		<div
			v-if="!isSmOrLower"
			class="flex flex-row justify-content-between align-items-start container py-1 mt-3"
		>
			<NuxtLink to="/">
				<img
					class="border-round-lg"
					src="~/assets/world.png"
					alt="Logo icon"
					style="width: 48px; height: 48px"
				/>
			</NuxtLink>
			<div class="flex flex-column align-items-start gap-3">
				<template v-for="value in links" :key="value.section">
					<a
						target="_blank"
						rel="external nofollow noopener noreferrer"
						:href="value.link"
						style="color: inherit; text-decoration: none"
					>
						{{ value.section }}
					</a>
				</template>
			</div>
		</div>
		<div
			class="flex sm:flex-row sm:justify-content-between container py-1 align-items-center"
			:class="{
				'justify-content-center': isSmOrLower,
				'flex-column-reverse': isSmOrLower,
				'gap-4': isSmOrLower,
			}"
		>
			<div
				class="flex flex-row align-items-center sm:gap-2"
				:class="{
					'flex-column': isSmOrLower,
					'gap-4': isSmOrLower,
				}"
			>
				<a
					href="https://www.gnu.org/licenses/gpl-3.0.en.html"
					target="_blank"
					rel="external nofollow noopener noreferrer"
					style="color: inherit"
				>
					GPL-3.0 License
				</a>
				<p class="m-0">2024 © Gervin Fung</p>
			</div>
			<div>
				<v-icon class="icon" name="vi-file-type-vue" />
				<v-icon class="icon" name="vi-file-type-typescript-official" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	width: 80%;
}

.icon {
	height: 36px;
	width: 36px;
}
</style>
