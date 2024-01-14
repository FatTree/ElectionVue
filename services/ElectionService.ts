import { formatProfile } from '~/formatters/electionFormatter';
import type {
  ProfileListModel,
  ThemeListModel,
  PartyListModel,
  PartyModel,
  ThemeModel,
  AreaListModel,
  AreaModel,
} from '~/models/ElectionModel';

const GET_THEME_LIST_URL = `https://db.cec.gov.tw/static/elections/list/ELC_P0.json`;
const GET_PROFILE_LIST_PREFIX_URL = `https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/`;
const GET_PARTY_LIST_URL =
  'https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/';
const GET_AREA_LIST_URL = `https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00`;

// how to share this?
type defaultVal = {
  id: string;
  type: string;
  code: string;
};

export const getThemeList = async (): Promise<ThemeModel[]> => {
  try {
    const json = await $fetch<ThemeListModel[]>(GET_THEME_LIST_URL);
    if (Array.isArray(json) && json.length > 0) {
      return json[0].theme_items;
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
      return profiles.map(formatProfile)[0];
    }
  } catch (error) {
    console.error(error);
  }
};

// https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/61b4dda0ebac3332203ef3729a9a0ada/N/00_000_00_000_0000.json?_t=1705222707
export const getPartyList = async (id: string): Promise<PartyModel[]> => {
  const key = '00_000_00_000_0000';
  const url = `${GET_PARTY_LIST_URL}/${id}/N/${key}.json`;
  const res = await $fetch<PartyListModel>(url);
  return res[key];
};

// https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/61b4dda0ebac3332203ef3729a9a0ada/C/00_000_00_000_0000.json?_t=1705222707
export const getPartyListByCity = async (id: string): Promise<PartyModel[]> => {
  const key = `00_000_00_000_0000`;
  const url = `${GET_PARTY_LIST_URL}/${id}/C/${key}.json`;
  const res = await $fetch<PartyListModel>(url);
  return res[key];
};

// https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/61b4dda0ebac3332203ef3729a9a0ada/D/63_000_00_000_0000.json?_t=1705222707
export const getPartyListByDistrict = async (
  id: string,
  city: string
): Promise<PartyModel[]> => {
  const key = `${city}_00_000_0000`;
  const url = `${GET_PARTY_LIST_URL}/${id}/D/${key}.json`;
  const res = await $fetch<PartyListModel>(url);
  return res[key];
};

// https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/61b4dda0ebac3332203ef3729a9a0ada/L/63_000_00_000_0000.json?_t=1705223186
export const getPartyListByLi = async (
  id: string,
  city: string,
  district: string
): Promise<PartyModel[]> => {
  const key = `${city}_00_000_0000`;
  const url = `${GET_PARTY_LIST_URL}/${id}/L/${key}.json`;
  const res = await $fetch<PartyListModel>(url);
  return res[`${city}_${district}_0000`];
};

// https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/61b4dda0ebac3332203ef3729a9a0ada/C/00_000_00_000_0000.json?_t=1705222707
export const getAreaCityList = async (id: string): Promise<AreaModel[]> => {
  const key = '00_000_00_000_0000';
  const url = `${GET_AREA_LIST_URL}/${id}/C/${key}.json`;
  const res = await $fetch<AreaListModel>(url);
  return res[key];
};

// https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/61b4dda0ebac3332203ef3729a9a0ada/D/63_000_00_000_0000.json?_t=1705222707
export const getAreaDistrictList = async (
  id: string,
  city: string
): Promise<AreaModel[]> => {
  const key = `${city}_00_000_0000`;
  const url = `${GET_AREA_LIST_URL}/${id}/D/${key}.json`;
  const res = await $fetch<AreaListModel>(url);
  return res[key];
};

// https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/61b4dda0ebac3332203ef3729a9a0ada/L/63_000_00_000_0000.json?_t=1705223186
export const getAreaLiList = async (
  id: string,
  city: string
): Promise<AreaModel[]> => {
  const key = `${city}_00_000_0000`;
  const url = `${GET_AREA_LIST_URL}/${id}/L/${key}.json`;
  const res = await $fetch<AreaListModel>(url);
  return Object.values(res).flat();
};
