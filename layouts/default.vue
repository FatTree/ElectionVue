<script lang="ts" setup>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import {elections} from '../assets/elections'
// import draggable from 'vuedraggable';

import {onMounted, ref} from 'vue';

const list = ref();


onMounted(() => {
    const getData = async () => {
        let data = await fetch(`https://db.cec.gov.tw/static/elections/list/ELC_P0.json`).then((response) => { 
            return response.json().then((data) => {
                list.value = data[0].theme_items  // is it right?
                return data;
            }).catch((err) => {
                console.log(err);
            }) 
        });
    }
    getData()
});

function aaa(e: any) {
    const id = e.themeId
    const type = e.dataLevel
    const code = `${e.prvCode}_${e.cityCode}_${e.areaCode}_${e.deptCode}_${e.liCode}`
    console.log(elections.areasProfiles(id, type, code))
}


</script>

<template>
    <div class="outBox">
        <header>2020 開票地圖</header>
        <ul>
            <li v-for="(item, i ) in list" :key="i" @click="aaa(item)"><nuxt-link to="/create" >{{ item.theme_name }}</nuxt-link></li>
        </ul>
        <main class="mainContent">
            <slot />
        </main>
    </div>
</template>

<style lang="scss" scoped>
* {
    display: block;
    border: 1px solid #000;
}
html,body {
    height: 100%;
}

</style>
