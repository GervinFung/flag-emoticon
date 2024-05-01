<script setup lang="ts">
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
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
