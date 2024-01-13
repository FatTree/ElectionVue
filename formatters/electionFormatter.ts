import type {
  ProfileModel,
  ThemeModel,
  PartyModel,
  PartyListModel,
} from '~/models/ElectionModel';
import type {
  ProfileViewModel,
  ThemeViewModel,
  partyViewModel,
  partiesDataViewModel,
} from '~/viewModels/ElectionViewModel';

export const formatTheme = (model: ThemeModel): ThemeViewModel => {
  const id = model.theme_id;
  const type = model.data_level;
  const code = `${model.prv_code}_${model.city_code}_${model.area_code}_${model.dept_code}_${model.li_code}`;
  const code2 = `_${model.dept_code}_${model.li_code}`;
  return { id, type, code, code2, theme_name: model.theme_name }; // theme_name for what?
};

/**
 * get all the codes
 * @param model
 * @returns
 */
export const formatCode = (model: ProfileModel) => {
  const code = `${model.prv_code}_${model.city_code}_${model.area_code}_${model.dept_code}_${model.li_code}`;
  const prv_code: string = model.prv_code;
  const city_code: string = model.city_code;
  const area_code: string = model.area_code;
  const dept_code: string = model.dept_code;
  const li_code: string = model.li_code;
  return { code, prv_code, city_code, area_code, dept_code, li_code };
};

export const formatProfile = (model: ProfileModel): ProfileViewModel => {
  return {
    ...model,
    formatted_valid_ticket: model.valid_ticket.toLocaleString('en-US'),
    formatted_invalid_ticket: model.invalid_ticket.toLocaleString('en-US'),
    formatted_vote_ticket: model.vote_ticket.toLocaleString('en-US'),
  };
};

export const formaterParties = (model: PartyModel): partyViewModel => {
  const [
    cand_no,
    party_name,
    cand_name,
    ticket_percent,
    ticket_num,
    is_vice,
    is_victor,
  ] = [
    model.cand_no,
    model.party_name,
    model.cand_name,
    model.ticket_percent,
    model.ticket_num,
    model.is_vice,
    model.is_victor,
  ];

  return {
    cand_no,
    party_name,
    cand_name,
    ticket_percent,
    ticket_num,
    is_vice,
    is_victor,
  };
};

const formatCandidate = (model: PartyModel): partyViewModel => ({
  cand_no: model.cand_no,
  party_name: model.party_name,
  cand_name: model.cand_name,
  ticket_percent: model.ticket_percent,
  ticket_num: model.ticket_num,
  is_vice: model.is_vice,
  is_victor: model.is_victor,
});

export const groupByParty = (
  groupByMap: Record<string, partyViewModel[]>,
  candidate: PartyModel
): Record<string, partyViewModel[]> => {
  const formattedCandidate = formatCandidate(candidate);
  const keys = Object.keys(groupByMap);
  if (keys.includes(formattedCandidate.party_name)) {
    const target = groupByMap[formattedCandidate.party_name];
    target.push(formattedCandidate);
  } else {
    groupByMap[formattedCandidate.party_name] = [formattedCandidate];
  }
  return groupByMap;
};

export const mergeCandidateViceCandidate = (
  candidates: partyViewModel[]
): partiesDataViewModel[] => {
  const candidate = candidates.find((x) => !x.is_vice);
  const viceCandidate = candidates.find((x) => x.is_vice);
  return {
    ...candidate,
    vice_candidate: viceCandidate.cand_name,
  };
};

export const _groupByParty = (
  groupList: partiesDataViewModel[],
  candidate: PartyModel
): partiesDataViewModel[] => {
  const formattedCandidate = formatCandidate(candidate);
  if (formattedCandidate.is_vice) {
    const target = groupList.find(
      (g) => g.party_name === formattedCandidate.party_name
    );
    if (target) {
      target.vice_candidate = formattedCandidate.cand_name;
    } else {
      groupList.push({
        ...formattedCandidate,
        vice_candidate: formattedCandidate.cand_name,
        cand_name: '',
      });
    }
  } else {
    const target = groupList.find(
      (g) => g.party_name === formattedCandidate.party_name
    );
    if (target) {
      target.cand_name = formattedCandidate.cand_name;
    } else {
      groupList.push({ ...formattedCandidate, vice_candidate: '' });
    }
  }

  return groupList;
};

// getJsonAndPrint((json) => json["00_000_00_000_0000"].reduce(groupByParty, []));
