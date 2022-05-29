<template>
	<v-container absolute fluid class="main-content">
		<span>GUESTS: OK</span>
		<GuestItem/>
	</v-container>
</template>

<script>
import GuestItem from '@/components/GuestItem.vue'

export default {
	name: 'Guests',
	components: {
		GuestItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
