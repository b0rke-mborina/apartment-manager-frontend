<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 text-center">Period</h1>
		<!-- Main information grid -->
		<div class="details-grid"></div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'CalendarItem',
	props: {
		
	},
	components: {
		EmptyDiv
	}
}
</script>

<style scoped>

</style>
