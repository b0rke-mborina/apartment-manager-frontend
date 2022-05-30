<template>
	<v-card>
		<v-icon>mdi-bed</v-icon>
		<span>{{ accomodation.name }}, {{ accomodation.maxGuestNumber }} - {{ accomodation.currentState }}</span>
		<br>
		<span>{{ accomodation.location.city }}, {{ accomodation.location.country }}</span>
		<br>
		<span>{{ accomodation.categoryStarNumber }} - {{ accomodation.hasYard }}</span>
	</v-card>
</template>

<script>
export default {
	name: 'Item',
	props: {
		accomodation: Object
	}
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
