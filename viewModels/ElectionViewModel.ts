import type { PartyModel } from "~/models/ElectionModel";

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

export type PartyViewModel = PartyModel & {
  vice_candidate?: string;
};
