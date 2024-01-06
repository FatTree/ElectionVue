import type { ProfileModel } from '~/models/ElectionModel';

export type ThemeViewModel = {
  id: string;
  type: string;
  code: string;
  theme_name: string;
};

export type ProfileViewModel = ProfileModel & {
  formatted_valid_ticket: string;
};
