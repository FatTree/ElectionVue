import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PartyModel } from '~/models/ElectionModel';
import {
  getPartyList,
  getPartyListByCity,
  getPartyListByDistrict,
  getPartyListByLi,
} from '~/services/ElectionService';
import {
  groupByParty,
  mergeCandidateViceCandidate,
} from '~/formatters/electionFormatter';

const storeName = 'party';

export const usePartyStore = defineStore(storeName, () => {
  const _list = ref<PartyModel[]>([]);
  const _listByCity = ref<PartyModel[]>([]);
  const _listByDistrict = ref<PartyModel[]>([]);
  const _listByLi = ref<PartyModel[]>([]);

  const list = computed(() =>
    Object.values(_list.value.reduce(groupByParty, {})).map(
      mergeCandidateViceCandidate
    )
  );
  const listByCity = computed(() =>
    Object.values(_listByCity.value.reduce(groupByParty, {})).map(
      mergeCandidateViceCandidate
    )
  );
  const listByDistrict = computed(() =>
    Object.values(_listByDistrict.value.reduce(groupByParty, {})).map(
      mergeCandidateViceCandidate
    )
  );
  const listByLi = computed(() =>
    Object.values(_listByLi.value.reduce(groupByParty, {})).map(
      mergeCandidateViceCandidate
    )
  );

  const getParties = async (id: string) => {
    try {
      _list.value = await getPartyList(id);
    } catch (error) {
      console.error(error);
    }
  };

  const getPartiesByCity = async (id: string) => {
    try {
      _listByCity.value = await getPartyListByCity(id);
    } catch (error) {
      console.error(error);
    }
  };

  const getPartiesByDistrict = async (id: string, city: string) => {
    try {
      _listByDistrict.value = await getPartyListByDistrict(id, city);
    } catch (error) {
      console.error(error);
    }
  };

  const getPartiesByLi = async (id: string, city: string, district: string) => {
    try {
      _listByLi.value = await getPartyListByLi(id, city, district);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    list,
    listByCity,
    listByDistrict,
    listByLi,
    getParties,
    getPartiesByCity,
    getPartiesByDistrict,
    getPartiesByLi,
  };
});
