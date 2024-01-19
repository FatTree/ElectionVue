import { defineStore } from "pinia";
import { ref } from "vue";
import type { AreaModel } from "~/models/ElectionModel";
import {
  getAreaCityList as getCityListAPI,
  getAreaDistrictList as getDistrictListAPI,
  getAreaLiList as getLiListAPI,
} from "~/services/ElectionService";

const storeName = "area";

export const useAreaStore = defineStore(storeName, () => {
  /**
   * for raw data
   */
  const cities = ref<AreaModel[]>([]);
  const districts = ref<AreaModel[]>([]);
  const lis = ref<AreaModel[]>([]);

  const formatCitySelectOption = (model: AreaModel) => ({
    label: model.area_name,
    value: `${model.prv_code}_${model.city_code}`,
  });

  const formatDistrictSelectOption = (model: AreaModel) => ({
    label: model.area_name,
    value: `${model.area_code}_${model.dept_code}`,
  });

  const formatLiSelectOption = (model: AreaModel) => ({
    label: model.area_name,
    value: model.li_code,
  });

  /**
   * for view data
   */
  const citySelectOptions = computed(() =>
    cities.value.map(formatCitySelectOption)
  );
  const districtSelectOptions = computed(() =>
    districts.value.map(formatDistrictSelectOption)
  );
  const liSelectOptions = computed(() => lis.value.map(formatLiSelectOption));

  const getCities = async (id: string) => {
    try {
      cities.value = await getCityListAPI(id);
    } catch (error) {
      console.error(error);
    }
  };

  const getDistricts = async (id: string, city: string) => {
    try {
      districts.value = await getDistrictListAPI(id, city);
    } catch (error) {
      console.error(error);
    }
  };

  const getLis = async (id: string, city: string) => {
    try {
      lis.value = await getLiListAPI(id, city);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    citySelectOptions,
    districtSelectOptions,
    liSelectOptions,
    getCities,
    getDistricts,
    getLis,
  };
});
