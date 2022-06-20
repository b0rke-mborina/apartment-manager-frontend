<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 text-center">Create a new note</h1>
		<div class="head-flex">
			<!-- Note heading -->
			<v-text-field v-model="note.heading" solo rounded
							clearable clear-icon="mdi-close-circle"
							label="Note heading..."
							background-color="#A5D4FF"
							class="heading-text-field mt-5 mr-3">
			</v-text-field>
			<!-- Is note important? - select -->
			<v-select v-model="note.important"
						 :items="selectItems"
						 item-value="value"
						 item-text="name"
						 label="Select importance"
						 solo rounded
						 background-color="#A5D4FF" class="importance-select mt-5 ml-3">
				<template v-slot:append>
					<v-icon color="#000000">mdi-menu-down</v-icon>
				</template>
			</v-select>
		</div>
		<!-- Note body -->
		<v-textarea v-model="note.body" solo rounded auto-grow
						clearable clear-icon="mdi-close-circle"
						label="Write a note here..."
						background-color="#A5D4FF"></v-textarea>
		<!-- Main action buttons -->
		<div class="text-center mt-5">
			<router-link :to="{ name: 'notes' }" class="router-link">
				<ButtonCancel/>
			</router-link>
			<!-- <router-link :to="{ name: 'notes' }" class="router-link"> -->
				<ButtonSave @click.native="printNote()" />
			<!-- </router-link> -->
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import FormLabel from '@/components/FormLabel.vue';

import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'PeriodAddNewView',
	data() {
		return {
			note: {
				ObjectId: null,
				heading: null,
				body: null,
				important: null
			},
			selectItems: [
				{
					value: true,
					name: "IMPORTANT"
				},
				{
					value: false,
					name: "NOT IMPORTANT"
				}
			]
		}
	},
	mounted() {
		
	},
	methods: {
		printNote() {
			console.log(this.note);
		}
	},
	components: {
		FormLabel,
		ButtonCancel,
		ButtonSave,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.head-flex {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.heading-text-field {
		font-size: 1.75em;
		width: 50%;
	}
	.v-input__slot, textarea {
		padding-top: 10px !important;
		padding-bottom: 10px !important;
	}
	.heading-text-field .v-icon {
		color: #000000 !important;
	}
	@media (max-width:700px) {
		.head-flex {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.heading-text-field {
			width: 100%;
			margin: 0px !important;
		}
		.importance-select {
			margin: 0px !important;
		}
	}
</style>
