import type { ProfileModel, ThemeModel } from '~/models/ElectionModel';
import type {
  ProfileViewModel,
  ThemeViewModel,
} from '~/viewModels/ElectionViewModel';

export const formatTheme = (model: ThemeModel): ThemeViewModel => {
  const id = model.theme_id;
  const type = model.data_level;
  const code = `${model.prv_code}_${model.city_code}_${model.area_code}_${model.dept_code}_${model.li_code}`;
  return { id, type, code, theme_name: model.theme_name };
};

export const formatProfile = (model: ProfileModel): ProfileViewModel => {
  return {
    ...model,
    formatted_valid_ticket: model.valid_ticket.toLocaleString(),
  };
};
