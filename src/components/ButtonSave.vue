<template>
	<!-- Save button -->
	<v-btn :loading="loading" elevation="2" rounded large class="ma-4 btn-save">
		<v-icon color="#000000" class="mr-2">mdi-content-save</v-icon>
		SAVE
	</v-btn>
</template>

<script>
export default {
	name: 'ButtonSave',
	props: {
		loading: Boolean
	}
}
</script>

<style scoped>
.btn-save {
	background-color: #55FF66 !important;
}
</style>
