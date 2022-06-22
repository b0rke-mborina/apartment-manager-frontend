<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Guests</h1>
		<!-- Empty list sign -->
		<NoItemsDiv items="guests" v-if="guests.length === 0" />
		<!-- List of guests -->
		<GuestItem v-for="guest in guests" v-bind:key="guest.ObjectId" :guest="guest" /> <!-- _id -->
		<!-- Add new guest button -->
		<div class="text-center">
			<router-link :to="{ name: 'guest-creation' }" class="router-link">
				<AddNewButton/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

import GuestItem from '@/components/GuestItem.vue';

import AddNewButton from '@/components/ButtonAddNew.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';


export default {
	name: 'GuestsView',
	data() {
		return {
			guests: []
		}
	},
	async mounted() {
		console.log("call data");
		let response = await AxiosService.get("/guests");
		this.guests = response.data;
		console.log(this.guests);
	},
	components: {
		GuestItem,
		AddNewButton,
		NoItemsDiv,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
