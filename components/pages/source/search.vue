<template>
  <PageTemplate templateheader="Search Source">
    <div slot="SearchContorls" class="row card-body">
      <selectlistfor
        v-bind:model="masterData.portalLines"
        v-model="selectedRow.portalLines"
        v-bind:isColumndisplay="false"
        valueprop="linesId"
        textprop="linesName"
        label="Lines"
        customvalidations="emailValidation"
        positionclass="form-group col-md-4"
        labelclass="form-row"
      />
      <selectlistfor
        v-bind:model="masterData.lobs"
        v-model="selectedRow.lob"
        v-bind:isColumndisplay="false"
        valueprop="lobId"
        textprop="lobName"
        label="LOB"
        customvalidations="emailValidation"
        positionclass="form-group col-md-4"
        labelclass="form-row"
      />
      <textfor
        v-model="selectedRow.resourceName"
        v-bind:isColumndisplay="false"
        label="Source Name"
        helptext="Please Enter Your Business"
        positionclass="form-group col-md-4"
        placeholder="Source Name"
        labelclass="form-row"
      />
      <textfor
        v-model="selectedRow.resourceDescription"
        v-bind:isColumndisplay="false"
        label="Source Description"
        helptext="Source Description"
        positionclass="form-group col-md-4"
        labelclass="form-row"
      />
      <textfor
        v-model="selectedRow.resourceVersion"
        v-bind:isColumndisplay="false"
        label="Source Version"
        helptext="Source Version"
        positionclass="form-group col-md-4"
        labelclass="form-row"
      />
      <datefor
        v-model="selectedRow.effectiveFrom"
        v-bind:isColumndisplay="false"
        label="Effective From"
        helptext="Effective From"
        positionclass="form-group col-md-4"
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
      <b-modal id="addPopup" :title="(isEdit ? 'Edit Source' : 'ADD Source')" hide-footer size="md" style="padding-left:17px">
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
import API, { SourceDef } from '../../../assets/scripts/common/apiurl.js'
import PageTemplate from '../../templates/page.vue'
import AddLOB from './add.vue'
export default {
  name: 'SourceSearch',
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
      isAlert: false,
      alertMsg: '',
      items: [],
      fields: [],
      filter: null,
      selectedRow: {
        'sourceDefinitionId': 0,
        'portalLines': {},
        'lob': {},
        'resourceName': '',
        'resourceDescription': '',
        'resourceVersion': '',
        'effectiveFrom': '',
        'effectiveTo': ''
      },
      deleteRow: {
        sourceDefinitionId: {
          'sourceDefinitionId': 0
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
      const res = await this.$axios.$get(SourceDef.viewSourceDefinition)
      res.forEach((element) => {
        this.items.push({
          'lobId': element.lob.lobId,
          'lobName': element.lob.lobName,
          'linesId': element.portalLines.linesId,
          'linesName': element.portalLines.linesName,
          'sourceDefinitionId': element.sourceDefinitionId,
          'resourceName': element.resourceName,
          'resourceDescription': element.resourceDescription,
          'resourceVersion': element.resourceVersion,
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
        { key: 'linesName', label: 'Lines', thStyle: headerstyle },
        { key: 'lobName', label: 'LOB', thStyle: headerstyle },
        { key: 'resourceName', label: 'Source Name', thStyle: headerstyle },
        { key: 'resourceDescription', label: 'Source Description', thStyle: headerstyle },
        { key: 'resourceVersion', label: 'Source Version', thStyle: headerstyle },
        { key: 'effectiveFrom', label: 'Effective From', thStyle: headerstyle },
        { key: 'effectiveTo', label: 'Effective To', thStyle: headerstyle },
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
      this.selectedRow.sourceDefinitionId = rowItem.sourceDefinitionId
      this.deleteRow.sourceDefinitionId.sourceDefinitionId = rowItem.sourceDefinitionId
      this.selectedRow.lob.lobId = rowItem.lobId
      this.selectedRow.lob.lobName = rowItem.lobName
      this.selectedRow.resourceName = rowItem.resourceName
      this.selectedRow.resourceDescription = rowItem.resourceDescription
      this.selectedRow.resourceVersion = rowItem.resourceVersion
      this.selectedRow.portalLines.linesName = rowItem.linesName
      this.selectedRow.portalLines.linesId = rowItem.linesId
      this.selectedRow.effectiveFrom = rowItem.effectiveFrom
      this.selectedRow.effectiveTo = rowItem.effectiveTo
    },
    DeleteRow () {
      this.$axios.$post(SourceDef.deleteSourceDefinitionData, [this.deleteRow.sourceDefinitionId]).then((response) => {
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
