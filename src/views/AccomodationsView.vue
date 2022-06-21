<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Accomodations</h1>
		<!-- List of accomodations -->
		<div class="flex-div">
			<!-- Empty list sign -->
			<NoItemsDiv items="accomodations" v-if="accomodations.length === 0" />
			<!-- List of accomodations -->
			<AccomodationItem v-for="accomodation in accomodations" v-bind:key="accomodation._id" :accomodation="accomodation" />
		</div>
		<!-- Add new accomodation button -->
		<div class="text-center">
			<router-link :to="{ name: 'accomodation-creation' }" class="router-link">
				<AddNewButton/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

import AccomodationItem from '@/components/AccomodationItem.vue';

import AddNewButton from '@/components/ButtonAddNew.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'AccomodationsView',
	data() {
		return {
			accomodations: []
		}
	},
	async mounted() {
		// save all accomodations data
		let response = await AxiosService.get("/privateaccomodations");
		this.accomodations = response.data;
		console.log(this.accomodations);
	},
	components: {
		AccomodationItem,
		AddNewButton,
		NoItemsDiv,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
