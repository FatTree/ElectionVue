export default (
  id: string,
  selectedCity: Ref<string>,
  selectedDistrict: Ref<string>
) => {
  const selectedLi = ref();
  const areaStore = useAreaStore();
  const { liSelectOptions } = storeToRefs(areaStore);
  const { getLis } = areaStore;

  const partyStore = usePartyStore();
  const { listByLi: partiesByLi } = storeToRefs(partyStore);
  const { getPartiesByLi } = partyStore;

  watch(selectedLi, async () => {
    if (selectedCity.value && selectedDistrict.value) {
      await getPartiesByLi(id, selectedCity.value, selectedDistrict.value);
    }
  });

  watch(liSelectOptions, () => {
    selectedLi.value = null;
  });

  return { selectedLi, liSelectOptions, partiesByLi, getPartiesByLi };
};
