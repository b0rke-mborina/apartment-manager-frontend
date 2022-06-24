<template>
	<div class="flex-div">
		<!-- Main label -->
		<FormLabel text="Guest not available?" class="details-label my-2" />
		<router-link :to="{ name: 'guest-creation'}" class="router-link">
			<!-- Create new guest button -->
			<v-btn elevation="2" rounded class="new-guest-btn mx-3 my-2">
				<v-icon color="#000000" class="mr-2">mdi-plus</v-icon>
				CREATE NEW GUEST
			</v-btn>
		</router-link>
	</div>
</template>

<script>
import FormLabel from '@/components/FormLabel.vue';

export default {
	name: 'ButtonCreateNewGuest',
	components: {
		FormLabel
	}
}
</script>

<style scoped>
	.new-guest-btn {
		background-color: #A5D4FF !important;
	}
	.details-label {
		line-height: 36px;
	}
</style>
