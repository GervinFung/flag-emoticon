<script setup lang="ts">
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';

const title = 'Flag Emoticon';

const description =
	'A website that house unicode for multiple flags, including country flag and subdivision flag';

useServerSeoMeta({
	title,
	ogTitle: title,
	description,
	ogDescription: description,
	robots: 'index, follow',
});
</script>

<template>
	<div class="flex-row justify-content-center align-items-center">
		<NuxtLayout style="flex-direction: column">
			<Header />
			<NuxtPage />
			<Footer />
		</NuxtLayout>
	</div>
</template>

<style>
body {
	margin: 0 !important;
}
</style>
