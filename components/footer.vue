<template>
	<div
		class="flex flex-column align-items-center justify-content-center gap-5 pt-2 pb-3 mt-7 border-top-1 border-gray-200"
	>
		<div class="flex flex-row justify-content-between container py-1 mt-3">
			<img
				class="border-round-lg"
				src="~/assets/world.png"
				alt="Logo icon"
				style="width: 48px; height: 48px"
			/>
		</div>
		<div class="flex flex-row justify-content-between container py-1">
			<div class="flex flex-row align-items-center gap-2">
				<a
					href="https://www.gnu.org/licenses/gpl-3.0.en.html"
					target="_blank"
					rel="external nofollow noopener noreferrer"
					style="color: inherit"
				>
					GPL-3.0 License
				</a>
				<p>2024 © Gervin Fung</p>
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
