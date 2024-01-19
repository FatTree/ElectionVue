<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import { useAreaStore } from "~/stores/useAreaStore";
import { usePartyStore } from "~/stores/usePartyStore";
import type { ProfileViewModel } from "~/viewModels/ElectionViewModel";

type Props = {
  id?: string;
  profile?: ProfileViewModel;
};

const props = withDefaults(defineProps<Props>(), {
  id: "",
  profile: undefined,
});

const areaStore = useAreaStore();
const { citySelectOptions, districtSelectOptions, liSelectOptions } =
  storeToRefs(areaStore);
const { getCities, getDistricts, getLis } = areaStore;

const partyStore = usePartyStore();
const {
  list: parties,
  listByCity: partiesByCity,
  listByDistrict: partiesByDistrict,
  listByLi: partiesByLi,
} = storeToRefs(partyStore);
const { getParties, getPartiesByCity, getPartiesByDistrict, getPartiesByLi } =
  partyStore;

const selectedCity = ref();
const selectedDistrict = ref();
const selectedLi = ref();

watch(selectedCity, async () => {
  if (selectedCity.value) {
    await getDistricts(props.id, selectedCity.value);
    await getPartiesByCity(props.id);
  }
});

watch(selectedDistrict, async () => {
  if (selectedCity.value) {
    await getLis(props.id, selectedCity.value);
    await getPartiesByDistrict(props.id, selectedCity.value);
  }
});

watch(selectedLi, async () => {
  if (selectedCity.value && selectedDistrict.value) {
    await getPartiesByLi(props.id, selectedCity.value, selectedDistrict.value);
  }
});

watch(districtSelectOptions, () => {
  selectedDistrict.value = null;
});

watch(liSelectOptions, () => {
  selectedLi.value = null;
});

getCities(props.id);
getParties(props.id);
</script>

<template>
  <div class="option">
    <Dropdown
      v-model:selected-value="selectedCity"
      :options="citySelectOptions"
    ></Dropdown>
    <Dropdown
      v-model:selected-value="selectedDistrict"
      :options="districtSelectOptions"
    ></Dropdown>
    <Dropdown
      v-model:selected-value="selectedLi"
      :options="liSelectOptions"
    ></Dropdown>
    <button>delete</button>
  </div>
  <div class="content">
    <div class="detaile">
      <div class="percent">
        <div class="percent__title">
          <h2>投票概況</h2>
        </div>
        <div class="percent__total">
          <h2>總體percent</h2>
          <p>
            投票數：
            <label for="">{{ props.profile?.formatted_vote_ticket }}</label>
          </p>
          <p>
            無效票數：
            <label for="">{{ props.profile?.formatted_invalid_ticket }}</label>
          </p>
          <p>
            有效票數：
            <label for="">{{ props.profile?.formatted_valid_ticket }}</label>
          </p>
        </div>
        <div class="percent__parties">
          <h2>政黨percent</h2>
          <div class="party" v-for="(party, i) in parties" :key="i">
            <div>
              <p>{{ party.cand_no }} | {{ party.party_name }}</p>
              <p>{{ party.cand_name }} / {{ party.vice_candidate }}</p>
            </div>
            <div>
              <p>percent: {{ party.ticket_percent }} %</p>
              <p>tickets: {{ party.ticket_num }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="city">
      <Result
        :title="'縣市投票結果'"
        :selected-value="selectedCity"
        :list="partiesByCity"
      >
        <template #default="{ item }">
          <p>{{ item.cand_no }} | {{ item.party_name }}</p>
          <p>{{ item.cand_name }} / {{ item.vice_candidate }}</p>
          <p>{{ item.ticket_percent }}%</p>
          <p>{{ item.ticket_num }}</p>
        </template>
      </Result>
      <Result
        :title="'區投票結果'"
        :selected-value="selectedDistrict"
        :list="partiesByDistrict"
      >
        <template #default="{ item }">
          <p>{{ item.cand_no }} | {{ item.party_name }}</p>
          <p>{{ item.cand_name }} / {{ item.vice_candidate }}</p>
          <p>{{ item.ticket_percent }}%</p>
          <p>{{ item.ticket_num }}</p>
        </template>
      </Result>
      <Result
        :title="'里投票結果'"
        :selected-value="selectedLi"
        :list="partiesByLi"
      >
        <template #default="{ item }">
          <p>{{ item.cand_no }} | {{ item.party_name }}</p>
          <p>{{ item.cand_name }} / {{ item.vice_candidate }}</p>
          <p>{{ item.ticket_percent }}%</p>
          <p>{{ item.ticket_num }}</p>
        </template>
      </Result>
      <div class="hints">
        <div class="hints__hint1">hint 1</div>
        <div class="hints__hint1">hint 2</div>
      </div>
    </div>
  </div>
</template>

<style scope lang="scss">
.party {
  border: 1px solid #000;
}

.city {
  display: flex;
}
.content {
  display: flex;
}
</style>
