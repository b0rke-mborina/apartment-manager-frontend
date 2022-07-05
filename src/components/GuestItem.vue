<template>
	<v-card color="#E3EAEF" class="my-3 pa-4 rounded-xl main-grid">
		<router-link :to="{ name: 'guest-detail', params: { id: guest._id } }" class="router-link grid-div">
			<!-- Guest main information (name and address) -->
			<div class="name-location">
				<v-icon class="mx-2">mdi-account</v-icon>
				<span class="mx-2">{{ guest.firstName }} {{ guest.lastName }}</span>
				<span class="mx-2 location">{{ guest.city }}, {{ guest.country }}</span>
			</div>
			<div class="period-dates">
				<!-- Guest period dates -->
				<span v-if="guest.newestPeriod.start && guest.newestPeriod.end" class="mx-2 my-1">
					{{ convertPeriod(guest.newestPeriod.start, guest.newestPeriod.end) }}
				</span>
				<!-- Guest type (based on guest state) -->
				<v-chip v-if="!guest.newestPeriod.start && !guest.newestPeriod.end && guest.currentState === 'NOT A GUEST YET'"
						  color="#B5B5B5" class="mx-2 my-1">
					NOT A GUEST YET
				</v-chip>
				<v-chip v-else-if="guest.newestPeriod.start && guest.newestPeriod.end && guest.currentState === 'CANCELLED GUEST'"
						  color="#FF6F6F" class="mx-2 my-1">
					CANCELLED GUEST
				</v-chip>
				<v-chip v-else-if="guest.newestPeriod.start && guest.newestPeriod.end && guest.currentState === 'POSSIBLE GUEST'"
						  color="#6666ff" class="mx-2 my-1">
					POSSIBLE GUEST
				</v-chip>
				<v-chip v-else-if="guest.newestPeriod.start && guest.newestPeriod.end && guest.currentState === 'POTENTIAL GUEST'"
						  color="#FFCC00" class="mx-2 my-1">
					POTENTIAL GUEST
				</v-chip><!-- guest.newestPeriod.end < currentDate() -->
				<v-chip v-else-if="guest.newestPeriod.start && guest.newestPeriod.end
										&& guest.newestPeriod.end.localeCompare(currentDate()) === -1
										&& guest.currentState === 'CONFIRMED GUEST'"
						  color="#B5B5B5" class="mx-2 my-1">
					FORMER GUEST
				</v-chip><!-- guest.newestPeriod.start >= currentDate(), guest.newestPeriod.end <= currentDate() -->
				<v-chip v-else-if="guest.newestPeriod.start && guest.newestPeriod.end
										&& (guest.newestPeriod.start.localeCompare(currentDate())
											|| guest.newestPeriod.start.localeCompare(currentDate()) === 0)
										&& (guest.newestPeriod.end.localeCompare(currentDate()) === -1
											|| guest.newestPeriod.end.localeCompare(currentDate()) === 0)
										&& guest.currentState === 'CONFIRMED GUEST'"
						  icon color="#55FF66" class="mx-2 my-1">
					CURRENT GUEST
				</v-chip><!-- guest.newestPeriod.start > currentDate() -->
				<v-chip v-else-if="guest.newestPeriod.start && guest.newestPeriod.end
										&& guest.newestPeriod.start.localeCompare(currentDate())
										&& guest.currentState === 'CONFIRMED GUEST'"
						  icon color="#55FF66" class="mx-2 my-1">
					FUTURE GUEST
				</v-chip>
			</div>
		</router-link>
		<!-- Main action icons -->
		<div class="edit-delete-icons">
			<router-link :to="{ name: 'guest-modification', params: { id: guest._id } }" class="router-link">
				<IconEdit/>
			</router-link>
			<IconDelete itemType="guest" itemCaptionType="name" :itemName="guest.firstName + ' ' + guest.lastName"
							service="guest" :_id="guest._id" />
		</div>
	</v-card>
</template>

<script>
import { convertPeriod } from '@/services';

import IconDelete from '@/components/IconDelete.vue';
import IconEdit from '@/components/IconEdit.vue';

export default {
	name: 'GuestItem',
	methods: {
		// returns current date in YYYY-MM-DD format
		currentDate() {
			const current = new Date();
			let year = current.getFullYear();
			let month = current.getMonth()+1;
			let day = current.getDate();
			if (month < 10) month = "0" + month;
			if (day < 10) day = "0" + day;
			const date = `${year}-${month}-${day}`;
			return date;
		},
		// imported function for converting period
		convertPeriod
	},
	props: {
		guest: Object
	},
	components: {
		IconDelete,
		IconEdit
	}
}
</script>

<style scoped>
.main-grid {
	display: grid;
	grid-template-columns: 6fr 1fr;
	font-size: 16px;
}
.grid-div {
	display: grid;
	grid-template-columns: 1fr 1fr;
}
.location {
	font-size: 12px;
}
.name-location, .period-dates {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
	padding: 10px 0px;
}
.edit-delete-icons {
	display: flex;
	justify-content: right;
	flex-wrap: wrap;
	align-items: center;
	padding: 10px 0px;
}
@media (max-width:500px) {
	.grid-div {
		grid-template-columns: auto;
	}
}
</style>
