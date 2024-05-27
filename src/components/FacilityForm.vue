<template>
  <div class="container">
    <h1>Create Facility</h1>
    <b-form @submit.prevent="createFacility">
      <b-form-group label="Facility Name" label-for="facility-name">
        <b-form-input id="facility-name" v-model="facilityName" required></b-form-input>
      </b-form-group>
      <b-form-group label="District" label-for="district">
        <b-form-select id="district" v-model="districtId" :options="districts" required></b-form-select>
      </b-form-group>
      <b-form-group label="Owner" label-for="owner">
        <b-form-select id="owner" v-model="ownerId" :options="owners" required></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Create</b-button>
    </b-form>
    <b-alert v-if="error" variant="danger">{{ error }}</b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class FacilityForm extends Vue {
  facilityName = '';
  districtId = '';
  ownerId = '';
  districts = [];
  owners = [];
  error = '';

  async created() {
    this.districts = await this.fetchData('https://zipatala.health.gov.mw/api/districts');
    this.owners = await this.fetchData('https://zipatala.health.gov.mw/api/owners');
  }

  async fetchData(url: string) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async createFacility() {
    try {
      const facilities = await axios.get('https://zipatala.health.gov.mw/api/facilities');
      const existingFacility = facilities.data.find((facility: any) => facility.name === this.facilityName);
      
      if (existingFacility) {
        this.error = 'Facility already exists!';
        return;
      }

      const districtCode = this.districts.find((district: any) => district.id === this.districtId).code;
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const facilityCode = `${districtCode}${randomNum}`;

      const newFacility = {
        facility_code: facilityCode,
        facility_name: this.facilityName,
        district_id: this.districtId,
        owner_id: this.ownerId,
      };

      // Assume a POST endpoint for creating a facility
      await axios.post('https://zipatala.health.gov.mw/api/facilities', newFacility);

      this.$router.push('/');
    } catch (error) {
      console.error('Error creating facility:', error);
      this.error = 'Error creating facility. Please try again.';
    }
  }
}
</script>
