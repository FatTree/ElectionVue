<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue';
import { getAreaList, getPartyList, getLiList, getLiPartyList } from '~/services/ElectionService';
import { elections } from '../assets/elections';

const props = defineProps(['id', 'list', 'parties_list', 'city_list']) // <== better way??


const cityName = ref('');
const areaName = ref('');
const liName = ref('');

const cityVal = ref();
const areaVal = ref();
const liVal = ref();

const otherCodes = '000_0000';

const areaList = ref();
const liList = ref();

const cityPartyList = ref();
const areaPartyList = ref();
const liPartyList = ref();
/*
    'D': area
    'L': li
*/

watch( cityVal, async (v) => {
    const code = `${cityVal.value.code}_00_${otherCodes}`;
    areaList.value = await getAreaList(props.id, 'D', code);
    cityPartyList.value = await getPartyList(props.id, 'D', code);
    cityName.value = cityVal.value.name;

});


watch( areaVal, async (v) => {
    const code = `${cityVal.value.code}_00_${otherCodes}`;
    const LCode = `${cityVal.value.code}_${areaVal.value.code}_0000`;
    areaName.value = areaVal.value.name;
    
    liList.value = await getLiList(props.id,'L',code, LCode);
    areaPartyList.value = await getPartyList(props.id, 'D', code);
});

watch ( liVal, async (v) => {
    console.log(`change`);
    console.log('liVal.value', liVal.value);
    const code = `${cityVal.value.code}_00_${otherCodes}`;
    const LCode = `${cityVal.value.code}_${areaVal.value.code}_0000`;
    liName.value = liVal.value.name;
    liPartyList.value = await getLiPartyList(props.id, 'L', code, LCode);
})

</script>

<template>
    <div class="option">
        <select name="pets" id="select-1" v-model="cityVal">
            <option disabled value="">Please select city</option>
            <option v-for="(city, i) in city_list" :key="city.prv_code" 
                :value="{code:`${city.prv_code}_${city.city_code}`, name: city.area_name}"
                >
                {{ city.area_name }} {{ `${city.prv_code}_${city.city_code}` }}
            </option>
        </select>
        <select name="pets" id="select-2" v-model="areaVal">
            <option disabled value="">Please select area</option>
            <option v-for="(area, i) in areaList" :key="area.area_code" 
                :value="{code: `${area.area_code}_${area.dept_code}`, name: area.area_name}"
                >
                {{ area.area_name }} {{ `${area.area_code}_${area.dept_code}` }}
            </option>
        </select>
        <select name="pets" id="select-3" v-model="liVal">
            <option disabled value="0000">Please select town</option>
            <option v-for="(li, i) in liList" :value="{code: li.li_code, name: li.area_name}">
                {{ li.area_name }} {{ li.li_code }}
            </option>
        </select>
        <button>delete</button>
    </div>
    <div class="content">
        <div class="detaile">
            <div class="percent">
            <div class="percent__title">
                <h2>投票概況</h2>
            </div>
            <div class="percent__total">
                <h2>總體percent</h2>
                <p>投票數： <label for="">{{ list.formatted_vote_ticket }}</label></p>
                <p>無效票數： <label for="">{{ list.formatted_invalid_ticket }}</label></p>
                <p>有效票數： <label for="">{{ list.formatted_valid_ticket }}</label></p>
            </div>
            <div class="percent__parties">
                <h2>政黨percent</h2>
                <div class="party" v-for="(party, i) in parties_list" :key="i">
                    <div>
                        <p>{{ party.cand_no }} | {{ party.party_name }}</p>
                        <p>{{ party.cand_name }} / {{ party.vice_candidate }}</p>
                    </div>
                    <div>
                        <p>percent: {{ party.ticket_percent }} %</p>
                        <p>tickets: {{ party.ticket_num }}</p>
                    </div>

                </div>
            </div>
            </div>
            
        </div>
        <div class="city">
            <div>
                <h2>縣市投票結果</h2>
                <p>city: {{ cityName }} </p>
                <div class="party" v-for="(party, i) in cityPartyList">
                    <p>{{ party.cand_no }} | {{ party.party_name }}</p>
                    <p>{{ party.cand_name }} / {{ party.vice_candidate }}</p>
                    <p>{{ party.ticket_percent }}%</p>
                    <p>{{ party.ticket_num }}</p>
                </div>
            </div>
            <div>
                <h2>區投票結果</h2>
                <p>Area: {{ areaName }}</p>
                <div class="party" v-for="(party, i) in areaPartyList">
                    <p>{{ party.cand_no }} | {{ party.party_name }}</p>
                    <p>{{ party.cand_name }} / {{ party.vice_candidate }}</p>
                    <p>{{ party.ticket_percent }}%</p>
                    <p>{{ party.ticket_num }}</p>
                </div>
            </div>
            <div>
                <h2>里投票結果</h2>
                <p>Area: {{ liName }}</p>
                <div class="party" v-for="(party, i) in liPartyList">
                    <p>{{ party.cand_no }} | {{ party.party_name }}</p>
                    <p>{{ party.cand_name }} / {{ party.vice_candidate }}</p>
                    <p>{{ party.ticket_percent }}%</p>
                    <p>{{ party.ticket_num }}</p>
                </div>
            </div>
            <div class="hints">
                <div class="hints__hint1">hint 1</div>
                <div class="hints__hint1">hint 2</div>
            </div>
        </div>
    </div>
</template>

<style scope lang="scss">
.party {
    border: 1px solid #000;
}

.city {
    display: flex;
}
.content {
    display: flex;
}
</style>
