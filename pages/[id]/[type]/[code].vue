<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getProfileList, getPartyList, getAreaList } from '../../../services/ElectionService';
import type { ProfileViewModel, partyViewModel } from '../../../viewModels/ElectionViewModel';

const route = useRoute();
const id = route.params.id as string;
const type = route.params.type as string;
const code = route.params.code as string;

// console.log(`id`, id);
// console.log(`type`, type);
// console.log(`code`, code);

const list = ref();
const parties_list = ref();
const city_list = ref();


list.value = await getProfileList(id, type, code);
parties_list.value = await getPartyList(id, type, code);
city_list.value = await getAreaList(id, 'C', code)


</script>

<template>
  <!-- <div>{{ parties_list }}</div> -->
  <content 
    :id="id"
    :list="list"
    :parties_list="parties_list"
    :city_list="city_list"
  />
    <!-- :valid_ticket="valid_ticket" :invalid_ticket="invalid_ticket" :vote_ticket="vote_ticket"  -->
</template>

<style scoped></style>
