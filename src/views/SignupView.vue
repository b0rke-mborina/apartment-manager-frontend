<template>
	<v-container absolute fluid class="main-content">
		<span>SIGNUP: OK</span>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'SignupView',
	components: {
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
