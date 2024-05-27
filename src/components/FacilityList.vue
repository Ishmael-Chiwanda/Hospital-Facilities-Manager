<template>
  <div class="container">
    <h1>Facilities</h1>
    <b-form-group label="Search" label-for="search">
      <b-form-input id="search" v-model="searchQuery" @input="filterFacilities"></b-form-input>
    </b-form-group>
    <b-table :items="filteredFacilities" :fields="fields"></b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class FacilityList extends Vue {
  facilities = [];
  filteredFacilities = [];
  searchQuery = '';
  fields = ['facility_code', 'facility_name', 'district_id', 'owner_id'];

  async created() {
    try {
      const response = await axios.get('https://zipatala.health.gov.mw/api/facilities');
      this.facilities = response.data;
      this.filteredFacilities = this.facilities;
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  }

  filterFacilities() {
    this.filteredFacilities = this.facilities.filter(facility =>
      facility.facility_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
</script>
