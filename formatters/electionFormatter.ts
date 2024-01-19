import type {
  ProfileModel,
  ThemeModel,
  PartyModel,
} from "~/models/ElectionModel";
import type {
  ProfileViewModel,
  ThemeViewModel,
  PartyViewModel,
} from "~/viewModels/ElectionViewModel";

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
export const formatCode = ({
  prv_code,
  city_code,
  area_code,
  dept_code,
  li_code,
}: ProfileModel) => ({ prv_code, city_code, area_code, dept_code, li_code });

export const formatProfile = (model: ProfileModel): ProfileViewModel => {
  return {
    ...model,
    formatted_valid_ticket: model.valid_ticket.toLocaleString("en-US"),
    formatted_invalid_ticket: model.invalid_ticket.toLocaleString("en-US"),
    formatted_vote_ticket: model.vote_ticket.toLocaleString("en-US"),
  };
};

export const groupByParty = (
  groupByMap: Record<string, PartyViewModel[]>,
  candidate: PartyModel
): Record<string, PartyViewModel[]> => {
  const keys = Object.keys(groupByMap);
  if (keys.includes(candidate.party_name)) {
    const target = groupByMap[candidate.party_name];
    target.push(candidate);
  } else {
    groupByMap[candidate.party_name] = [candidate];
  }
  return groupByMap;
};

export const mergeCandidateViceCandidate = (
  candidates: PartyViewModel[]
): PartyViewModel => {
  const candidate = candidates.find((x) => x.is_vice !== "Y")!;
  const viceCandidate = candidates.find((x) => x.is_vice === "Y")!;
  return {
    ...candidate,
    vice_candidate: viceCandidate.cand_name,
  };
};

export const _groupByParty = (
  groupList: PartyViewModel[],
  candidate: PartyModel
): PartyViewModel[] => {
  if (candidate.is_vice) {
    const target = groupList.find((g) => g.party_name === candidate.party_name);
    if (target) {
      target.vice_candidate = candidate.cand_name;
    } else {
      groupList.push({
        ...candidate,
        vice_candidate: candidate.cand_name,
        cand_name: "",
      });
    }
  } else {
    const target = groupList.find((g) => g.party_name === candidate.party_name);
    if (target) {
      target.cand_name = candidate.cand_name;
    } else {
      groupList.push({ ...candidate, vice_candidate: "" });
    }
  }

  return groupList;
};

// getJsonAndPrint((json) => json["00_000_00_000_0000"].reduce(groupByParty, []));
