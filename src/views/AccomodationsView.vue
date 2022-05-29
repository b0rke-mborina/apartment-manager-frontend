<template>
	<v-container absolute fluid class="main-content">
		<span>ACCOMODATIONS: OK</span>
		<AccomodationItem/>
	</v-container>
</template>

<script>
import AccomodationItem from '@/components/AccomodationItem.vue'

export default {
	name: 'AccomodationsView',
	components: {
		AccomodationItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
