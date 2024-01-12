export type ThemeModel = {
  theme_id: string;
  theme_group: string;
  type_id: string;
  subject_id: string;
  legislator_type_id: string;
  data_level: string;
  session: number;
  theme_name: string;
  vote_date: string;
  legislator_desc: string;
  has_data: boolean;
  prv_code: string;
  city_code: string;
  area_code: string;
  dept_code: string;
  li_code: string;
  vote_result: unknown;
  data_prof_seq: string[];
  data_tckt_seq: string[];
  ris_prv_code: string;
  ris_city_code: string;
  ris_area_code: string;
  ris_dept_code: string;
  print_order: number;
  area_name: string;
};

export type ThemeListModel = {
  area_name: string;
  theme_items: ThemeModel[];
};

export type ProfileModel = {
  prv_code: string;
  city_code: string;
  area_code: string;
  dept_code: string;
  li_code: string;
  tbox_no: string;
  valid_ticket: number;
  invalid_ticket: number;
  vote_ticket: number;
  votable_population: number;
  population: number;
  cand_num: number;
  elected_num: number;
  cand_male_num: number;
  cand_female_num: number;
  elected_male_num: number;
  elected_female_num: number;
  elect_to_population: number;
  vote_to_elect: number;
  elected_to_cand: number;
  area_name: string;
  ris_prv_code: string;
  ris_city_code: string;
  ris_area_code: string;
  ris_dept_code: string;
};

export type ProfileListModel = {
  [key: string]: ProfileModel[];
};

export type PartyModel = {
  prv_code:string,
  city_code:string,
  area_code:string,
  dept_code:string,
  li_code:string,
  tbox_no:string,
  cand_no:number,
  ticket_num:number,
  ticket_percent:number,
  is_victor:string,
  ris_prv_code:string,
  ris_city_code:string,
  ris_area_code:string,
  ris_dept_code:string,
  area_name:string,
  cand_id:number,
  cand_name:string,
  cand_sex:string,
  cand_birthyear:string,
  cand_edu:string,
  party_code:number,
  party_name:string,
  is_current:string,
  is_vice:string
}

export type PartyListModel = {
  [key: string]: PartyModel[];
}

export type AreaModel = {
  prv_code: string; 
  city_code: string; 
  area_code: string; 
  dept_code: string; 
  li_code: string; 
  area_name: string; 
  ris_prv_code: string; 
  ris_city_code: string; 
  ris_area_code: string; 
  ris_dept_code: string
}

export type AreaListModel = {
  [key: string]: AreaModel[];
}