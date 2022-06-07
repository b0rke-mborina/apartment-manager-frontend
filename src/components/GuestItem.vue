<template>
	<v-card color="#E3EAEF" class="my-3 pa-4 rounded-xl main-grid">
		<div class="grid-div">
			<div class="name-location">
				<v-icon class="mx-2">mdi-account</v-icon>
				<span class="mx-2">{{ guest.firstName }} {{ guest.lastName }}</span>
				<span class="mx-2 location">{{ guest.city }}, {{ guest.country }}</span>
			</div>
			<div class="period-dates">
				<span class="mx-2 my-1">{{ guest.period.startDate }} - {{ guest.period.endDate }}</span>
				<v-chip v-if="guest.guestState === 'CANCELLED GUEST'"
						  color="#FF6F6F" class="mx-2 my-1">
					CANCELLED GUEST
				</v-chip>
				<v-chip v-else-if="guest.guestState === 'POSSIBLE GUEST'"
						  color="#6666ff" class="mx-2 my-1">
					POSSIBLE GUEST
				</v-chip>
				<v-chip v-else-if="guest.guestState === 'POTENTIAL GUEST'"
						  color="#FFCC00" class="mx-2 my-1">
					POTENTIAL GUEST
				</v-chip>
				<v-chip v-else-if="guest.period.endDate < currentDate()
						  && guest.guestState === 'CONFIRMED GUEST'"
						  color="#B5B5B5" class="mx-2 my-1">
					FORMER GUEST
				</v-chip>
				<v-chip v-else-if="guest.period.startDate >= currentDate()
						  && guest.period.endDate <= currentDate()
						  && guest.guestState === 'CONFIRMED GUEST'"
						  icon color="#55FF66" class="pr-2">
					CURRENT GUEST
				</v-chip>
				<v-chip v-else-if="guest.period.startDate > currentDate()
						  && guest.guestState === 'CONFIRMED GUEST'"
						  icon color="#55FF66" class="pr-2">
					FUTURE GUEST
				</v-chip>
			</div>
		</div>
		<div class="edit-delete-icons">
			<IconEdit/>
			<IconDelete itemType="guest" :itemName="guest.firstName + ' ' + guest.lastName" />
		</div>
	</v-card>
</template>

<script>
import IconDelete from '@/components/IconDelete.vue'
import IconEdit from '@/components/IconEdit.vue'

export default {
	name: 'GuestItem',
	methods: {
		currentDate() {
			const current = new Date();
			const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
			return date;
		}
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
	align-items: right;
	padding: 10px 0px;
}
@media (max-width:500px) {
	.grid-div {
		grid-template-columns: auto;
	}
}
</style>
