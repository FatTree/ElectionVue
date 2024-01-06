import { formatProfile, formatTheme } from '~/formatters/electionFormatter';
import type { ProfileListModel, ThemeListModel } from '~/models/ElectionModel';

const GET_THEME_LIST_URL = `https://db.cec.gov.tw/static/elections/list/ELC_P0.json`;
const GET_PROFILE_LIST_PREFIX_URL = `https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/`;

export const getThemeList = async () => {
  try {
    const json = await $fetch<ThemeListModel[]>(GET_THEME_LIST_URL);
    if (Array.isArray(json) && json.length > 0) {
      return json[0].theme_items.map(formatTheme);
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getProfileList = async (
  id: string,
  type: string,
  code: string
) => {
  try {
    const url = `${GET_PROFILE_LIST_PREFIX_URL}/${id}/${type}/${code}.json`;
    const res = await fetch(url);
    const json = (await res.json()) as ProfileListModel;
    const profiles = json[code];
    if (Array.isArray(profiles) && profiles.length > 0) {
      return profiles.map(formatProfile);
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};
