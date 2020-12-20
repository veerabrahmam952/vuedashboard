<template>
  <PageTemplate templateheader="Search LOB">
    <div slot="SearchContorls" class="row card-body">
      <selectlistfor
        v-bind:model="masterData.portalLines"
        v-model="selectedRow.portalLines"
        v-bind:isColumndisplay="false"
        valueprop="linesId"
        textprop="linesName"
        label="Lines"
        positionclass="form-group col-md-3"
        labelclass="form-row"
      />
      <selectlistfor
        v-bind:model="masterData.lobs"
        v-model="selectedRow.lob"
        v-bind:isColumndisplay="false"
        valueprop="lobId"
        textprop="lobName"
        label="Line of Bussiness"
        customvalidations="emailValidation"
        positionclass="form-group col-md-3"
        labelclass="form-row"
      />
      <selectlistfor
        v-bind:model="masterData.geography"
        v-model="selectedRow.geography"
        v-bind:isColumndisplay="false"
        valueprop="geographyId"
        textprop="geographyName"
        label="Geography"
        customvalidations="emailValidation"
        positionclass="form-group col-md-3"
        labelclass="form-row"
      />
      <selectlistfor
        v-bind:model="masterData.bureau"
        v-model="selectedRow.bureau"
        v-bind:isColumndisplay="false"
        valueprop="bureauId"
        textprop="bureauName"
        label="Bureau"
        customvalidations="emailValidation"
        positionclass="form-group col-md-3"
        labelclass="form-row"
      />
    </div>
    <div slot="SearchButtons" class="card-footer d-block text-center">
      <button @click="SearchData" type="button" class="btn btn-outline-primary pe-7s-search">
        Search
      </button>
      <button @click="AddData" type="button" class="btn btn-outline-primary pe-7s-plus">
        Add
      </button>
    </div>
    <div slot="SearchGrid" v-show="displaydiv === true" class="card mt-4">
      <div v-if="isAlert">
        <b-alert show variant="success">
          {{ alertMsg }}
        </b-alert>
      </div>
      <b-container class="card-body">
        <div class="row">
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Filter"
              label-cols-sm="3"
              label-size="sm"
              label-for="filterInput"
              class="mb-0 p-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  id="filterInput"
                  v-model="filter"
                  type="search"
                  placeholder="Type to Search"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </div>
        <b-table
          :items="items"
          :fields="fields"
          :filter="filter"
          show-empty
          small
          stacked="md"
          responsive="sm"
          striped
          class="mt-3"
          style="border:2px solid #ccdff48c"
          hover
        >
          <template v-slot:cell(actions)="row">
            <button
              id="editButton"
              @click="Edit(row.item)"
              type="button"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Edit"
              class="pe-7s-pen btn btn-outline-primary"
            />
            <button
              id="delButton"
              @click="confirmDelete(row.item)"
              type="button"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Delete"
              class="pe-7s-trash btn btn-outline-primary"
            />
          </template>
        </b-table>
      </b-container>
      <b-modal id="addPopup" :title="(isEdit ? 'Edit LOB' : 'ADD LOB')" hide-footer size="md" style="padding-left:17px">
        <add-l-o-b :masterData="masterData" :isEdit="isEdit" :selectedRow="selectedRow" />
      </b-modal>
      <b-modal id="delete" hide-footer hide-header>
        <div class="row">
          <div class="col-md-6" style="font-size: 17px;">
            Are you sure want to Delete
          </div>
          <div class="col-md-6 text-right">
            <button @click="DeleteRow" type="button" class="btn btn-outline-primary">
              Confirm
            </button>
            <button @click="$bvModal.hide('delete')" type="button" class="btn btn-outline-primary">
              Close
            </button>
          </div>
        </div>
      </b-modal>
    </div>
  </PageTemplate>
</template>
<script>
import API, { DefineLOB } from '../../../assets/scripts/common/apiurl.js'
import PageTemplate from '../../templates/page.vue'
import AddLOB from './add.vue'
export default {
  name: 'SearchLOB',
  inject: ['$v'],
  components: {
    AddLOB,
    PageTemplate
  },
  data () {
    return {
      masterData: Object({}),
      isEdit: false,
      displaydiv: false,
      items: [],
      fields: [],
      filter: null,
      isAlert: false,
      alertMsg: '',
      selectedRow: {
        'defineLobId': 0,
        'portalLines': {},
        'bureau': {},
        'geography': {},
        'lob': {},
        'effectiveFrom': '',
        'effectiveTo': ''
      },
      deleteRow: {
        defineLobId: {
          'defineLobId': 0
        }
      }
    }
  },
  async mounted () {
    const referenceData = await this.$axios.$get(API.masterJsonData)
    this.masterData = referenceData
  },
  methods: {
    async SearchData () {
      this.items = []
      const res = await this.$axios.$get(DefineLOB.viewDefineLob)
      res.forEach((element) => {
        this.items.push({
          'lobId': element.lob.lobId,
          'lobName': element.lob.lobName,
          'linesId': element.portalLines.linesId,
          'linesName': element.portalLines.linesName,
          'bureauId': element.bureau.bureauId,
          'bureauName': element.bureau.bureauName,
          'geographyId': element.geography.geographyId,
          'geographyName': element.geography.geographyName,
          'defineLobId': element.defineLobId,
          'effectiveFrom': element.effectiveFrom.replace('T00:00:00', ''),
          'effectiveTo': element.effectiveTo.replace('T00:00:00', '')
        })
      })
      this.SetTable()
    },
    SetTable () {
      this.displaydiv = true
      const headerstyle = { background: '#3f6ad7', color: '#ffffff' }
      this.fields = [
        { key: 'lobId', label: 'ID', thStyle: headerstyle },
        { key: 'lobName', label: 'LOB', thStyle: headerstyle },
        { key: 'linesName', label: 'Line', thStyle: headerstyle },
        { key: 'bureauName', label: 'Bureau', thStyle: headerstyle },
        { key: 'geographyName', label: 'Geography', thStyle: headerstyle },
        { key: 'actions', label: 'Actions', thStyle: headerstyle }
      ]
    },
    AddData () {
      this.isEdit = false
      this.$bvModal.show('addPopup')
    },
    Edit (rowItem) {
      this.isEdit = true
      this.SetLobData(rowItem)
      this.$bvModal.show('addPopup')
    },
    confirmDelete (rowItem) {
      this.SetLobData(rowItem)
      this.$bvModal.show('delete')
    },
    SetLobData (rowItem) {
      this.selectedRow.defineLobId = rowItem.defineLobId
      this.deleteRow.defineLobId.defineLobId = rowItem.defineLobId
      this.selectedRow.lob.lobId = rowItem.lobId
      this.selectedRow.lob.lobName = rowItem.lobName
      this.selectedRow.geography.geographyId = rowItem.geographyId
      this.selectedRow.geography.geographyName = rowItem.geographyName
      this.selectedRow.bureau.bureauId = rowItem.bureauId
      this.selectedRow.bureau.bureauName = rowItem.bureauName
      this.selectedRow.portalLines.linesName = rowItem.linesName
      this.selectedRow.portalLines.linesId = rowItem.linesId
      this.selectedRow.effectiveFrom = rowItem.effectiveFrom
      this.selectedRow.effectiveTo = rowItem.effectiveTo
    },
    DeleteRow () {
      this.$axios.$post(DefineLOB.deleteDefineLobRecord, [this.deleteRow.defineLobId]).then((response) => {
        this.isAlert = true
        const tempMsg = 'Row Deleted Successful'
        this.SetTime(tempMsg)
      }).catch((e) => {
        this.isAlert = true
        const tempMsg = 'Error' + ' ' + e
        this.SetTime(tempMsg)
      })
      let indx = 0
      const slecteditem = this.selectedRow
      this.items.forEach((element, index) => {
        if (element.lobId === slecteditem.lob.lobId) {
          indx = index
        }
      })
      this.items.splice(indx, 1)
      this.$bvModal.hide('delete')
    },
    SetTime (tempMsg) {
      const v = this
      v.alertMsg = tempMsg
      setTimeout(function () {
        v.alertMsg = ''
        v.isAlert = false
      }, 1500)
    }
  }
}
</script>
