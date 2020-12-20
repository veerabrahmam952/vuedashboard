<template>
  <PageTemplate templateheader="Search Feature">
    <div slot="SearchContorls" class="row card-body">
      <selectlistfor
        v-bind:model="masterData.lobs"
        v-model="selectedRow.lob"
        v-bind:isColumndisplay="false"
        label="LOB"
        valueprop="lobId"
        textprop="lobName"
        positionclass="form-group col-md-4"
      />
      <selectlistfor
        v-bind:model="masterData.page"
        v-model="selectedRow.page"
        v-bind:isColumndisplay="false"
        label="Page Name"
        valueprop="pageId"
        textprop="pageName"
        positionclass="form-group col-md-4"
      />
      <selectlistfor
        v-bind:model="masterData.function"
        v-model="selectedRow.function"
        v-bind:isColumndisplay="false"
        label="Function"
        valueprop="functionId"
        textprop="functionName"
        positionclass="form-group col-md-4"
      />
      <selectlistfor
        v-bind:model="masterData.subFunction"
        v-model="selectedRow.subFunction"
        v-bind:isColumndisplay="false"
        label="Sub Function"
        valueprop="subFunctionId"
        textprop="subFunctionName"
        positionclass="form-group col-md-4"
      />
      <div class="form-group col-md-8">
        <label class="typo__label">States</label>
        <multiselectfor
          v-model="stateBind"
          :options="states"
          :multiple="true"
          :close-on-select="true"
          :preserve-search="true"
          placeholder="Pick some"
          label="stateName"
          track-by="stateName"
        />
      </div>
      <!-- <checklistfor
        v-bind:list="masterData.states"
        v-model="selectedRow.state"
        v-bind:isColumndisplay="false"
        label="States"
        positionclass="col-md-12 pl-4"
        labelclass="row"
        inputclass="col-md-3"
        valueprop="stateId"
        textprop="stateName"
        labeltextclass="col-md-12 pl-2"
      /> -->
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
          responsive
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
            <button
              id="delButton"
              @click="viewRow(row.item)"
              type="button"
              data-toggle="tooltip"
              data-placement="bottom"
              title="View"
              class="pe-7s-look btn btn-outline-primary"
            />
          </template>
        </b-table>
      </b-container>
      <b-modal id="addPopup" :title="(isEdit ? isView ? 'View Feature': 'Edit Feature' : isView ? 'View Feature': 'ADD Feature')" hide-footer size="lg" style="padding-left:17px">
        <AddFeature :masterData="masterData" :isEdit="isEdit" :isView="isView" :selectedRow="selectedRow" :states="states" />
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
import API, { Addfeatures } from '../../../assets/scripts/common/apiurl.js'
import PageTemplate from '../../templates/page.vue'
import AddFeature from './add.vue'
export default {
  name: 'SearchFeature',
  inject: ['$v'],
  components: {
    PageTemplate,
    AddFeature
  },
  data () {
    return {
      masterData: Object({}),
      displaydiv: false,
      isEdit: false,
      isView: false,
      isAlert: false,
      alertMsg: '',
      items: [],
      fields: [],
      list: ['NewBusiness', 'Endrose', 'Renew', 'Rewrite', 'Re Issue', 'Audit', 'Non Renew'],
      value: null,
      filter: null,
      states: [],
      stateBind: [],
      selectedRow: {
        'featuresId': 0,
        'lob': {},
        'page': {},
        'function': {},
        'subFunction': {},
        'state': {},
        'fieldname': String(''),
        'fieldOrFormDesc': String(''),
        'mandatory': true,
        'busImpact': String(''),
        'ratingImpact': String(''),
        'formImpact': String(''),
        'integrationFunctionality': String(''),
        'funcPointValidations': String(''),
        'businessRule': String(''),
        'transactions': {},
        'source': {},
        'sourceDesc': String(''),
        'version': String(''),
        'addComments': String(''),
        'dctPL01ver': String(''),
        'traceId': String('')
      }
    }
  },
  async mounted () {
    const referenceData = await this.$axios.$get(API.masterJsonData)
    this.masterData = referenceData
    this.states = referenceData.states
  },
  methods: {
    async SearchData () {
      this.items = []
      const res = await this.$axios.$get(Addfeatures.viewFeaturesData)
      res.forEach((element) => {
        this.items.push({
          'featuresId': element.featuresId,
          'pageId': element.page.pageId,
          'pageName': element.page.pageName,
          'lobId': element.lob.lobId,
          'lobName': element.lob.lobName,
          'functionId': element.function.functionId,
          'functionName': element.function.functionName,
          'subFunctionId': element.subFunction.subFunctionId,
          'subFunctionName': element.subFunction.subFunctionName,
          'fieldname': element.fieldname,
          'fieldOrFormDesc': element.fieldOrFormDesc,
          'mandatory': element.mandatory,
          'busImpact': element.busImpact,
          'ratingImpact': element.ratingImpact,
          'formImpact': element.formImpact,
          'integrationFunctionality': element.integrationFunctionality,
          'funcPointValidations': element.funcPointValidations,
          'businessRule': element.businessRule,
          'transactionId': element.transactions.transactionId,
          'newBusiness': element.transactions.newBusiness,
          'endorse': element.transactions.endorse,
          'renew': element.transactions.renew,
          'cancel': element.transactions.cancel,
          'reinstate': element.transactions.reinstate,
          'rewrite': element.transactions.rewrite,
          'reissue': element.transactions.reissue,
          'audit': element.transactions.audit,
          'nonRenew': element.transactions.nonRenew,
          'sourceId': element.source.sourceId,
          'sourceName': element.source.sourceName,
          'sourceDesc': element.sourceDesc,
          'version': element.version,
          'addComments': element.addComments,
          'dctPL01ver': element.dctPL01ver,
          'traceId': element.traceId,
          'state': element.state
        })
      })
      this.SetTable()
    },
    SetTable () {
      this.displaydiv = true
      const headerstyle = { background: '#3f6ad7', color: '#ffffff' }
      this.fields = [
        { key: 'lobName', label: 'LOB', thStyle: headerstyle },
        { key: 'pageName', label: 'Page', thStyle: headerstyle },
        { key: 'functionName', label: 'Function', thStyle: headerstyle },
        { key: 'subFunctionName', label: 'SubF', thStyle: headerstyle },
        { key: 'fieldname', label: 'Field', thStyle: headerstyle },
        { key: 'fieldOrFormDesc', label: 'Description', thStyle: headerstyle },
        // { key: 'mandatory', label: 'Mandatory', thStyle: headerstyle },
        { key: 'busImpact', label: 'Business', thStyle: headerstyle },
        { key: 'ratingImpact', label: 'Rating', thStyle: headerstyle },
        { key: 'actions', label: 'Actions', thStyle: headerstyle }
      ]
    },
    AddData () {
      this.isEdit = false
      this.isView = false
      this.$bvModal.show('addPopup')
    },
    Edit (rowItem) {
      this.isEdit = true
      this.isView = false
      this.SetFeatureData(rowItem)
      this.$bvModal.show('addPopup')
    },
    confirmDelete (rowItem) {
      this.SetFeatureData(rowItem)
      this.$bvModal.show('delete')
    },
    viewRow (rowItem) {
      this.isView = true
      this.SetFeatureData(rowItem)
      this.$bvModal.show('addPopup')
    },
    SetFeatureData (rowItem) {
      this.selectedRow.featuresId = rowItem.featuresId
      this.selectedRow.page.pageId = rowItem.pageId
      this.selectedRow.page.pageName = rowItem.pageName
      this.selectedRow.lob.lobId = rowItem.lobId
      this.selectedRow.lob.lobName = rowItem.lobName
      this.selectedRow.function.functionId = rowItem.functionId
      this.selectedRow.function.functionName = rowItem.functionName
      this.selectedRow.subFunction.subFunctionId = rowItem.subFunctionId
      this.selectedRow.subFunction.subFunctionName = rowItem.subFunctionName
      this.selectedRow.fieldname = rowItem.fieldname
      this.selectedRow.fieldOrFormDesc = rowItem.fieldOrFormDesc
      this.selectedRow.mandatory = rowItem.mandatory
      this.selectedRow.busImpact = rowItem.busImpact
      this.selectedRow.ratingImpact = rowItem.ratingImpact
      this.selectedRow.formImpact = rowItem.formImpact
      this.selectedRow.integrationFunctionality = rowItem.integrationFunctionality
      this.selectedRow.funcPointValidations = rowItem.funcPointValidations
      this.selectedRow.businessRule = rowItem.businessRule
      this.selectedRow.transactions.transactionId = rowItem.transactionId
      this.selectedRow.transactions.newBusiness = rowItem.newBusiness
      this.selectedRow.transactions.endorse = rowItem.endorse
      this.selectedRow.transactions.renew = rowItem.renew
      this.selectedRow.transactions.cancel = rowItem.cancel
      this.selectedRow.transactions.reinstate = rowItem.reinstate
      this.selectedRow.transactions.rewrite = rowItem.rewrite
      this.selectedRow.transactions.reissue = rowItem.reissue
      this.selectedRow.transactions.audit = rowItem.audit
      this.selectedRow.transactions.nonRenew = rowItem.nonRenew
      this.selectedRow.source.sourceId = rowItem.sourceId
      this.selectedRow.source.sourceName = rowItem.sourceName
      this.selectedRow.sourceDesc = rowItem.sourceDesc
      this.selectedRow.version = rowItem.version
      this.selectedRow.addComments = rowItem.addComments
      this.selectedRow.dctPL01ver = rowItem.dctPL01ver
      this.selectedRow.traceId = rowItem.traceId
      this.selectedRow.state = rowItem.state
    },
    DeleteRow () {
      this.$axios.$post(Addfeatures.deleteFeaturesData, [this.selectedRow]).then((response) => {
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
