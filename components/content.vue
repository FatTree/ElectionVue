<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue';
import { useAreaStore } from '~/stores/useAreaStore';
import { usePartyStore } from '~/stores/usePartyStore';
import type { ProfileViewModel } from '~/viewModels/ElectionViewModel';

type Props = {
  id?: string;
  profile?: ProfileViewModel;
};

const props = withDefaults(defineProps<Props>(), {
  id: '',
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

const selectedCity = ref(null);
const selectedDistrict = ref(null);
const selectedLi = ref(null);

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
    <select name="pets" id="select-1" v-model="selectedCity">
      <option disabled value="">Please select city</option>
      <option
        v-for="(item, index) in citySelectOptions"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <select name="pets" id="select-2" v-model="selectedDistrict">
      <option disabled :value="null">Please select area</option>
      <option
        v-for="(item, index) in districtSelectOptions"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <select name="pets" id="select-3" v-model="selectedLi">
      <option disabled :value="null">Please select town</option>
      <option
        v-for="(item, index) in liSelectOptions"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
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
      <div>
        <h2>縣市投票結果</h2>
        <p>city: {{ selectedCity }}</p>
        <div class="party" v-for="(party, i) in partiesByCity">
          <p>{{ party.cand_no }} | {{ party.party_name }}</p>
          <p>{{ party.cand_name }} / {{ party.vice_candidate }}</p>
          <p>{{ party.ticket_percent }}%</p>
          <p>{{ party.ticket_num }}</p>
        </div>
      </div>
      <div>
        <h2>區投票結果</h2>
        <p>Area: {{ selectedDistrict }}</p>
        <div class="party" v-for="(party, i) in partiesByDistrict">
          <p>{{ party.cand_no }} | {{ party.party_name }}</p>
          <p>{{ party.cand_name }} / {{ party.vice_candidate }}</p>
          <p>{{ party.ticket_percent }}%</p>
          <p>{{ party.ticket_num }}</p>
        </div>
      </div>
      <div>
        <h2>里投票結果</h2>
        <p>Area: {{ selectedLi }}</p>
        <div class="party" v-for="(party, i) in partiesByLi">
          <p>{{ party.cand_no }} | {{ party.party_name }}</p>
          <p>{{ party.cand_name }} / {{ party.vice_candidate }}</p>
          <p>{{ party.ticket_percent }}%</p>
          <p>{{ party.ticket_num }}</p>
        </div>
      </div>
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
