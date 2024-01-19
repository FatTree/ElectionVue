export default (id: string) => {
  const selectedCity = ref();

  const partyStore = usePartyStore();
  const { listByCity: partiesByCity } = storeToRefs(partyStore);
  const { getPartiesByCity } = partyStore;

  const areaStore = useAreaStore();
  const { citySelectOptions } = storeToRefs(areaStore);
  const { getCities, getDistricts } = areaStore;

  watch(selectedCity, async () => {
    if (selectedCity.value) {
      await getDistricts(id, selectedCity.value);
      await getPartiesByCity(id);
    }
  });

  return {
    selectedCity,
    partiesByCity,
    citySelectOptions,
    getCities,
  };
};
