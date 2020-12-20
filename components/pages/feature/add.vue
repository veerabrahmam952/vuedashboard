<template>
  <div class="card-body row">
    <div v-if="isAlert" class="col-md-12">
      <b-alert :variant="isError ? 'danger' : 'success'" show>
        {{ alertMsg }}
      </b-alert>
    </div>
    <selectlistfor
      v-bind:model="masterData.lobs"
      v-model="featuredata.lob"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.lob.$error }"
      :labelclass="submitted && $v.featuredata.lob.$error ? 'is-error' : ''"
      label="LOB *"
      valueprop="lobId"
      textprop="lobName"
      positionclass="form-group col-md-6"
    />
    <selectlistfor
      v-bind:model="masterData.page"
      v-model="featuredata.page"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.page.$error }"
      :labelclass="submitted && $v.featuredata.page.$error ? 'is-error' : ''"
      label="Page Name *"
      valueprop="pageId"
      textprop="pageName"
      positionclass="form-group col-md-6"
    />
    <selectlistfor
      v-bind:model="masterData.function"
      v-model="featuredata.function"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.function.$error }"
      :labelclass="submitted && $v.featuredata.function.$error ? 'is-error' : ''"
      label="Function *"
      valueprop="functionId"
      textprop="functionName"
      positionclass="form-group col-md-6"
    />
    <selectlistfor
      v-bind:model="masterData.subFunction"
      v-model="featuredata.subFunction"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.subFunction.$error }"
      :labelclass="submitted && $v.featuredata.subFunction.$error ? 'is-error' : ''"
      label="Sub Function *"
      valueprop="subFunctionId"
      textprop="subFunctionName"
      positionclass="form-group col-md-6"
    />
    <textfor
      v-model="featuredata.fieldname"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.fieldname.$error }"
      :labelclass="submitted && $v.featuredata.fieldname.$error ? 'is-error' : ''"
      label="Field Name *"
      helptext="Source Description"
      positionclass="form-group col-md-6"
    />
    <div class="form-group col-md-6">
      <label class="typo__label">States *</label>
      <multiselectfor
        v-model="stateBind"
        :options="states"
        :multiple="true"
        :close-on-select="true"
        :preserve-search="true"
        :class="{ 'form-control is-error': submitted && $v.stateBind.$error }"
        placeholder="Pick some"
        label="stateName"
        track-by="stateName"
      />
    </div>
    <!-- <checklistfor
      v-bind:list="masterData.states"
      v-model="featuredata.state"
      v-bind:isColumndisplay="false"
      label="States *"
      positionclass="col-md-12 pl-4"
      labelclass="row"
      inputclass="col-md-3"
      valueprop="stateId"
      textprop="stateName"
      labeltextclass="col-md-12 pl-0"
    /> -->
    <radiofor
      v-model="featuredata.mandatory"
      v-bind:isColumndisplay="false"
      label="Mandatory/Non mandatory *"
      helptext="Source Description"
      positionclass="col-md-6 mt-2"
    />
    <textareafor
      v-model="featuredata.fieldOrFormDesc"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.fieldOrFormDesc.$error }"
      :inputclass="submitted && $v.featuredata.fieldOrFormDesc.$error ? 'is-error' : ''"
      label="Field/Functional Description*"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.busImpact"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.busImpact.$error }"
      :inputclass="submitted && $v.featuredata.busImpact.$error ? 'is-error' : ''"
      label="Business Impact *"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.ratingImpact"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.ratingImpact.$error }"
      :inputclass="submitted && $v.featuredata.ratingImpact.$error ? 'is-error' : ''"
      label="Rating Impact *"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.formImpact"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.formImpact.$error }"
      :inputclass="submitted && $v.featuredata.formImpact.$error ? 'is-error' : ''"
      label="Forms Impact *"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.funcPointValidations"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.funcPointValidations.$error }"
      :inputclass="submitted && $v.featuredata.funcPointValidations.$error ? 'is-error' : ''"
      label="Functional Point Validation *"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.businessRule"
      v-bind:isColumndisplay="false"
      :inputclass="submitted && $v.featuredata.businessRule.$error ? 'is-error' : ''"
      :class="{ 'is-invalid': submitted && $v.featuredata.businessRule.$error }"
      label="Business Rule*"
      positionclass="form-group col-md-6"
    />
    <checklistfor
      v-bind:list="list"
      v-model="featuredata.transactions"
      v-bind:isColumndisplay="false"
      label="Transactions *"
      positionclass="col-md-12 pl-4"
      labelclass="row"
      inputclass="col-md-6"
      valueprop="value"
      textprop="key"
      labeltextclass="col-md-12 pl-0"
    />
    <selectlistfor
      v-bind:model="masterData.source"
      v-model="featuredata.source"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.source.$error }"
      :labelclass="submitted && $v.featuredata.source.$error ? 'is-error' : ''"
      label="Source *"
      valueprop="sourceId"
      textprop="sourceName"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.sourceDesc"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.sourceDesc.$error }"
      :inputclass="submitted && $v.featuredata.sourceDesc.$error ? 'is-error' : ''"
      label="Source Description*"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.version"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.version.$error }"
      :inputclass="submitted && $v.featuredata.version.$error ? 'is-error' : ''"
      label="Template Version*"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.addComments"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.addComments.$error }"
      :inputclass="submitted && $v.featuredata.addComments.$error ? 'is-error' : ''"
      label="Additional Comments *"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.dctPL01ver"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.dctPL01ver.$error }"
      :inputclass="submitted && $v.featuredata.dctPL01ver.$error ? 'is-error' : ''"
      label="DCT PL101 Version used *"
      positionclass="form-group col-md-6"
    />
    <textareafor
      v-model="featuredata.traceId"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.featuredata.traceId.$error }"
      :inputclass="submitted && $v.featuredata.traceId.$error ? 'is-error' : ''"
      label="DCT PL101  Trace ID *"
      positionclass="form-group col-md-6"
    />
    <!-- <states> -->
    <div v-if="isView == false" class="d-block button-align">
      <button @click="handleSubmit" type="button" class="btn btn-outline-primary">
        {{ isEdit ? 'Save' : 'ADD' }}
      </button>
      <button @click="$bvModal.hide('addPopup')" type="button" class="btn btn-outline-primary">
        Close
      </button>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { Addfeatures } from '../../../assets/scripts/common/apiurl.js'
export default {
  name: 'AddFeature',
  props: {
    masterData: Object({}),
    isEdit: Boolean(false),
    isView: Boolean(false),
    selectedRow: Object({}),
    states: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isAlert: false,
      isError: false,
      alertMsg: '',
      stateBind: [],
      submitted: false,
      booleanChecklist: [],
      tempFeaturedata: {},
      featuredata: {
        'lob': {},
        'page': {},
        'function': {},
        'subFunction': {},
        'state': {},
        'fieldname': String(''),
        'fieldOrFormDesc': String(''),
        'mandatory': Boolean(false),
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
      },
      list: [
        { key: 'New Business', value: 'newBusiness' },
        { key: 'Renew', value: 'renew' },
        { key: 'Re Issue', value: 'reissue' },
        { key: 'Non Renew', value: 'nonRenew' },
        { key: 'Endorse', value: 'endorse' },
        { key: 'Rewrite', value: 'rewrite' },
        { key: 'Audit', value: 'audit' }
      ]
    }
  },
  validations: {
    stateBind: { required },
    featuredata: {
      lob: { required },
      page: { required },
      function: { required },
      subFunction: { required },
      fieldname: { required },
      fieldOrFormDesc: { required },
      busImpact: { required },
      ratingImpact: { required },
      funcPointValidations: { required },
      businessRule: { required },
      source: { required },
      sourceDesc: { required },
      version: { required },
      addComments: { required },
      dctPL01ver: { required },
      traceId: { required },
      formImpact: { required }
    }
  },
  mounted () {
    if (this.isEdit || this.isView) {
      this.featuredata = this.selectedRow
      const cCase = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase()
        }).replace(/\s+/g, '')
      }
      const tempElement = []
      const textp = 'stateName'
      const tempObj = this.featuredata.state
      const tempStates = this.states
      tempStates.forEach((element) => {
        if (tempObj[cCase(element[textp])] === 'Yes') {
          const stateElement = element
          tempElement.push(stateElement)
        }
      })
      this.stateBind = tempElement
    }
  },
  methods: {
    handleSubmit (e) {
      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
        this.isAlert = true
        this.isError = true
        this.alertMsg = 'Please Fill Form Correctly'
      } else {
        this.isError = false
        this.isAlert = false
        this.submitted = false
        this.addFeature()
      }
    },
    addFeature () {
      if (!this.isEdit) {
        this.tempFeaturedata = this.featuredata.state
        this.stateBind.forEach((element, i) => {
          this.tempFeaturedata[this.camelCase(element.stateName)] = 'Yes'
        })
        this.featuredata.state = this.tempFeaturedata
        this.$axios.$post(Addfeatures.addFeaturesData, this.featuredata).then((response) => {
          this.isAlert = true
          const tempMsg = 'LOB Added Successful'
          this.SetTime(tempMsg)
        }).catch((e) => {
          this.isError = true
          this.isAlert = true
          const tempMsg = 'Error' + ' ' + e
          this.SetTime(tempMsg)
        })
      } else {
        const tempId = this.featuredata.state.stateId
        this.featuredata.state = {}
        this.tempFeaturedata = this.featuredata.state
        this.stateBind.forEach((element, i) => {
          this.tempFeaturedata[this.camelCase(element.stateName)] = 'Yes'
        })
        this.featuredata.state.stateId = tempId
        this.featuredata.state = this.tempFeaturedata
        this.$axios.$post(Addfeatures.editFeaturesData, [this.featuredata]).then((response) => {
          this.isAlert = true
          const tempMsg = 'Row Edited Successfully'
          this.SetTime(tempMsg)
          // alert('Row Edited Successfully')
        }).catch((e) => {
          this.isError = true
          this.isAlert = true
          const tempMsg = 'Error' + ' ' + e
          this.SetTime(tempMsg)
        })
      }
    },
    SetTime (tempMsg) {
      const v = this
      v.alertMsg = ''
      v.alertMsg = tempMsg + ' ' + 'Pop up will close in 2 sec'
      setTimeout(function () {
        v.alertMsg = ''
        v.$bvModal.hide('addPopup')
      }, 1500)
    },
    camelCase (str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      }).replace(/\s+/g, '')
    }
  }
}
</script>
