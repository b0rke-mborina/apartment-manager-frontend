<template>
	<!-- Delete button -->
	<v-btn :loading="loading" elevation="2" rounded large class="ma-4 btn-delete">
		<v-icon color="#000000" class="mr-2">mdi-trash-can-outline</v-icon>
		DELETE
	</v-btn>
</template>

<script>
export default {
	name: 'ButtonDelete',
	props: {
		loading: Boolean
	}
}
</script>

<style scoped>
.btn-delete {
	background-color: #FF6F6F !important;
}
</style>
