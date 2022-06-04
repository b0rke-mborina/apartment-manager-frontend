<template>
	<v-btn v-if="notElevated === false" elevation="2" rounded large class="mt-2 mb-4 btn-see-more">
		<v-icon color="#000000" class="mr-2">mdi-dots-horizontal</v-icon>
		SEE MORE
	</v-btn>
	<v-btn v-else-if="notElevated === true" elevation="0" rounded large class="mt-2 mb-4 btn-see-more">
		<v-icon color="#000000" class="mr-2">mdi-dots-horizontal</v-icon>
		SEE MORE
	</v-btn>
</template>

<script>
export default {
	name: 'ButtonSeeMore',
	props: {
		notElevated: Boolean
	}
}
</script>

<style scoped>
.btn-see-more {
	background-color: #E3EAEF !important;
}
</style>
