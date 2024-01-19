import { describe, expect, it } from "vitest";
import { formatTheme } from "~/formatters/electionFormatter";
import type { ThemeModel } from "~/models/ElectionModel";
import type { ThemeViewModel } from "~/viewModels/ElectionViewModel";

describe("electionFormatter", () => {
  it(formatTheme.name, () => {
    const model: ThemeModel = {
      theme_id: "theme_id",
      theme_group: "theme_group",
      type_id: "type_id",
      subject_id: "subject_id",
      legislator_type_id: "legislator_type_id",
      data_level: "data_level",
      session: 0,
      theme_name: "theme_name",
      vote_date: "vote_date",
      legislator_desc: "legislator_desc",
      has_data: true,
      prv_code: "prv_code",
      city_code: "city_code",
      area_code: "area_code",
      dept_code: "dept_code",
      li_code: "li_code",
      vote_result: "vote_result",
      data_prof_seq: ["data_prof_seq"],
      data_tckt_seq: ["data_tckt_seq"],
      ris_prv_code: "ris_prv_code",
      ris_city_code: "ris_city_code",
      ris_area_code: "ris_area_code",
      ris_dept_code: "ris_dept_code",
      print_order: 1,
      area_name: "area_name",
    };
    const expected: ThemeViewModel = {
      theme_name: "theme_name",
      id: "theme_id",
      type: "data_level",
      code: `prv_code_city_code_area_code_dept_code_li_code`,
      code2: `_dept_code_li_code`,
    };
    expect(formatTheme(model)).toMatchObject(expected);
  });
});
