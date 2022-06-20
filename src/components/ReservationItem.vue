<template>
	<v-card color="#E3EAEF" class="my-3 pa-4 rounded-xl main-grid">
		<router-link :to="{ name: 'reservation-detail', params: { id: reservation.ObjectId }}" class="router-link grid-div">
			<div class="reservation-info">
				<v-icon class="mx-2">mdi-calendar-check</v-icon>
				<span class="mx-2 pa-0 d-inline-block">{{ convertPeriod(reservation.period.start, reservation.period.end) }}</span>
			</div>
			<div class="money">
				<span class="mx-2 pa-0 d-inline">{{ reservation.price.value }} {{ reservation.price.currency }}</span>
				<v-chip v-if="reservation.currentState === 'CONFIRMED'" color="#55FF66" class="mx-2 d-inline">
					CONFIRMED
				</v-chip>
				<v-chip v-else-if="reservation.currentState === 'PENDING'" color="#6666ff" class="mx-2 d-inline">
					PENDING
				</v-chip>
				<v-chip v-else-if="reservation.currentState === 'CANCELLED'" color="#FF6F6F" class="mx-2 d-inline">
					CANCELLED
				</v-chip>
				<v-chip v-else-if="reservation.currentState === 'INQUIRY'" color="#FFCC00" class="mx-2 d-inline">
					INQUIRY
				</v-chip>
				<v-chip v-else-if="reservation.currentState === 'COMPLETED'" color="#B5B5B5" class="mx-2 d-inline">
					COMPLETED
				</v-chip>
			</div>
			<div class="guest-info">
				<span v-if="reservation.madeByGuest.email && reservation.madeByGuest.phoneNumber" class="mx-2 pa-0 d-inline text-center">
					{{ reservation.madeByGuest.email }}
				</span>
				<span v-if="reservation.madeByGuest.email && reservation.madeByGuest.phoneNumber" class="mx-2 pa-0 d-inline text-center">
					{{ reservation.madeByGuest.phoneNumber }}
				</span>
				<span v-else class="mx-2 pa-0 d-inline text-center">
					{{ reservation.madeByGuest.firstName }} {{ reservation.madeByGuest.lastName }}
				</span>
			</div>
		</router-link>
		<div class="edit-delete-icons">
			<router-link :to="{ name: 'reservation-modification', params: { id: reservation.ObjectId }}" class="router-link">
				<IconEdit/>
			</router-link>
			<IconDelete itemType="reservation" itemCaptionType="period"
							:itemName="'from ' + reservation.period.start + ' to ' + reservation.period.end" />
		</div>
	</v-card>
</template>

<script>
import { convertPeriod } from '@/services';

import IconDelete from '@/components/IconDelete.vue';
import IconEdit from '@/components/IconEdit.vue';

export default {
	name: 'ReservationItem',
	methods: {
		convertPeriod
	},
	props: {
		reservation: Object
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
}
.grid-div {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
}
.reservation-info {
	display: flex;
	flex-direction: row;
	justify-content: left;
	flex-wrap: wrap;
	align-items: center;
}
.money {
	display: flex;
	flex-direction: row;
	justify-content: right;
	flex-wrap: wrap;
	align-items: center;
}
.guest-info {
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
}
.edit-delete-icons {
	display: flex;
	justify-content: right;
	flex-wrap: wrap;
	align-items: center;
}
@media (max-width:1100px) {
	.grid-div {
		grid-template-columns: 1fr 1fr;
		align-items: center;
	}
	.guest-info {
		grid-column-start: 1;
  		grid-column-end: 3;
		margin-top: 5px;
	}
}
@media (max-width:600px) {
	.grid-div {
		grid-template-columns: auto;
	}
	.guest-info {
		grid-column-start: 1;
  		grid-column-end: 2;
		margin-top: 5px;
	}
	.reservation-info {
		justify-content: center;
	}
	.money {
		margin-top: 5px;
		justify-content: center;
	}
}
</style>
