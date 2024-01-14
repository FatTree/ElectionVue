import { defineStore } from 'pinia';
import { ref } from 'vue';
import { formatTheme as formatter } from '~/formatters/electionFormatter';
import type { ThemeModel } from '~/models/ElectionModel';
import { getThemeList as getListAPI } from '~/services/ElectionService';
import type { ThemeViewModel } from '~/viewModels/ElectionViewModel';

const storeName = 'theme';
type ModelType = ThemeModel;
type ViewModelType = ThemeViewModel;

export const useThemeStore = defineStore(storeName, () => {
  const _list = ref<ModelType[]>([]);
  const list = computed<ViewModelType[]>(() => _list.value.map(formatter));
  const getList = async () => {
    try {
      _list.value = await getListAPI();
    } catch (error) {
      console.error(error);
    }
  };

  return { list, getList };
});
