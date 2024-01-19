export default (id: string, selectedCity: Ref<string>) => {
  const selectedDistrict = ref();

  const areaStore = useAreaStore();
  const { districtSelectOptions } = storeToRefs(areaStore);
  const { getDistricts, getLis } = areaStore;

  const partyStore = usePartyStore();
  const { listByDistrict: partiesByDistrict } = storeToRefs(partyStore);
  const { getPartiesByDistrict } = partyStore;

  watch(selectedDistrict, async () => {
    if (selectedCity.value) {
      await getLis(id, selectedCity.value);
      await getPartiesByDistrict(id, selectedCity.value);
    }
  });

  watch(districtSelectOptions, () => {
    selectedDistrict.value = null;
  });

  return {
    selectedDistrict,
    districtSelectOptions,
    partiesByDistrict,
    getDistricts,
  };
};
