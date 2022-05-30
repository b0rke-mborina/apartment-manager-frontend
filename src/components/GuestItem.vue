<template>
	<v-card>
		<v-icon>mdi-account</v-icon>
		<span>{{ guest.firstName }} {{ guest.lastName }}</span>
		<br>
		<span>{{ guest.city }}, {{ guest.country }}</span>
		<br>
		<span>{{ guest.period.startDate }} - {{ guest.period.endDate }}</span>
	</v-card>
</template>

<script>
export default {
	name: 'GuestItem',
	props: {
		guest: Object
	}
}
</script>

<style scoped>

</style>
