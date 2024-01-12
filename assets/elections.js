/*
id = themeId
type = dataLevel
code = ${prvCode_cityCode_areaCode_deptCode_liCode
https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/N/00_000_00_000_0000.json
https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00//1f7d9f4f6bfe06fdaf4db7df2ed4d60c/C/00_000_00_000_0000.json
https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/C/00_000_00_000_0000.json
*/

// any better way to share the same params?
export const elections = {
    ticketProfiles: (id, type, code) =>
        `https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(Date.now() / 1000)}`,
    partyData: (id, type, code) =>
        `https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(Date.now() / 1000)}`,
    areas: (id, type, code) =>
        `https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(Date.now() / 1000)}`,
    areasTickets: (id, type, code) =>
        `https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(Date.now() / 1000)}`,
    areasProfiles: (id, type, code) =>
        `https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(Date.now() / 1000)}`,
    presidantList: (id, type, code) =>
        `https://db.cec.gov.tw/static/elections/list/ELC_P0.json?_t=${parseInt(Date.now() / 1000)}`,
};
