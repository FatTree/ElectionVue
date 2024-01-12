import type { ProfileModel } from '~/models/ElectionModel';

export type ThemeViewModel = {
  id: string;
  type: string;
  code: string;
  code2: string;
  theme_name: string;
};

export type ProfileViewModel = {
  formatted_valid_ticket: string;
  formatted_invalid_ticket: string;
  formatted_vote_ticket: string;
};


export type partyViewModel = {
  cand_no: number;
  party_name: string;
  cand_name: string;
  ticket_percent: number;
  ticket_num: number;
  is_vice: string;
  is_victor: string;
}

export type partiesDataViewModel = partyViewModel & {
  vice_candidate: string;
}