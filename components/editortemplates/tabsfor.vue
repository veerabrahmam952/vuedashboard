<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab v-for="(head , index) in tabs.tabheader" :key="index" :title="head" :active="index === 0 ? true : false">
          <b-card-text>
            <table border="1">
              <!-- <tr>
                <th v-for="(contnthdr , i) in tabs.tabcontent[index].contentheader" :key="i">
                  {{ contnthdr }}
                </th>
              </tr> -->
              <tr v-for="(item , j) in tabs.tabcontent[index].content" :key="j">
                <td v-for="(contnt , l) in item" :key="l">
                  {{ contnt }}
                </td>
              </tr>
            </table>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'TabsFor',
  props: {
    tabs: Object({
      tabheader: {
        type: Array,
        default: () => []
      },
      tabcontent: {
        type: Array,
        default: () => []
      }
    })
  }
}
</script>
