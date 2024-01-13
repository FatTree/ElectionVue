import {
  formatProfile,
  formatTheme,
  formaterParties,
  groupByParty,
  mergeCandidateViceCandidate,
} from '~/formatters/electionFormatter';
import type {
  ProfileListModel,
  ThemeListModel,
  PartyListModel,
  PartyModel,
} from '~/models/ElectionModel';
import type { partyViewModel } from '~/viewModels/ElectionViewModel';

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

export const getThemeList = async () => {
  try {
    const json = await $fetch<ThemeListModel[]>(GET_THEME_LIST_URL);
    if (Array.isArray(json) && json.length > 0) {
      return json[0].theme_items.map(formatTheme); // ???
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
  return [];
};

export const getPartyList = async (
  id: string,
  type: string,
  code: string
): Promise<partyViewModel[]> => {
  try {
    const url = `${GET_PARTY_LIST_URL}/${id}/${type}/${code}.json`;
    console.log(url);

    // const res = await fetch(url);  <== can't get any thing
    // const json = await res.json;

    const res = await $fetch<PartyListModel>(url);
    // console.log(`res`, res);
    // console.log(`code`, code);
    // console.log(`res[code])`, res[code]);

    return Object.values(res[code].reduce(groupByParty, {})).map(
      mergeCandidateViceCandidate
    );
  } catch (err) {
    console.error(err);
  }
  return [];
};

export const getLiPartyList = async (
  id: string,
  type: string,
  code: string,
  LCode: string
): Promise<partyViewModel[]> => {
  try {
    const url = `${GET_PARTY_LIST_URL}/${id}/${type}/${code}.json`;
    console.log(url);

    const res: partyViewModel[] = await $fetch<PartyListModel>(url);

    // const data = formaterParties([LCode]);
    return res[LCode].reduce(groupByParty, []);
  } catch (err) {
    console.error(err);
  }
  return [];
};

export const getAreaList = async (id: string, type: string, code: string) => {
  //`${model.prv_code}_${model.city_code}_${model.area_code}_${model.dept_code}_${model.li_code}`;
  const url = `${GET_AREA_LIST_URL}/${id}/${type}/${code}.json`;
  const res = await $fetch(url);

  return res[code];
};

// https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/L/63_000_00_000_0000.json

export const getLiList = async (
  id: string,
  type: string,
  code: string,
  LiCode: string
) => {
  const url = `${GET_AREA_LIST_URL}/${id}/${type}/${code}.json`;
  // const url = 'https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/L/63_000_00_000_0000.json';
  const res = await $fetch(url);
  return res[LiCode];
};
