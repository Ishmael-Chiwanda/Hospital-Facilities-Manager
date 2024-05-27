import Vue from 'vue';
import VueRouter from 'vue-router';
import FacilityForm from '@/components/FacilityForm.vue';
import FacilityList from '@/components/FacilityList.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: FacilityList },
  { path: '/create', component: FacilityForm }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
