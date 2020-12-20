<template>
  <div class="card-body">
    <div v-if="isAlert">
      <b-alert :variant="isError ? 'danger' : 'success'" show>
        {{ alertMsg }}
      </b-alert>
    </div>
    <selectlistfor
      v-bind:model="masterData.portalLines"
      v-model="sourcedata.portalLines"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.sourcedata.portalLines.$error }"
      :labelclass="submitted && $v.sourcedata.portalLines.$error ? 'is-error col-md-12 mt-2' : 'col-md-12 mt-2'"
      valueprop="linesId"
      textprop="linesName"
      label="Lines *"
      customvalidations="emailValidation"
      positionclass="col-md-12 mt-2 p-0"
    />
    <selectlistfor
      v-bind:model="masterData.lobs"
      v-model="sourcedata.lob"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.sourcedata.lob.$error }"
      :labelclass="submitted && $v.sourcedata.lob.$error ? 'is-error col-md-12 mt-2' : 'col-md-12 mt-2'"
      valueprop="lobId"
      textprop="lobName"
      label="LOB *"
      customvalidations="emailValidation"
      positionclass="col-md-12 mt-4 p-0"
    />
    <textfor
      v-model="sourcedata.resourceName"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.sourcedata.resourceName.$error }"
      :labelclass="submitted && $v.sourcedata.resourceName.$error ? 'is-error col-md-12 mt-2' : 'col-md-12 mt-2'"
      label="Source Name *"
      helptext="Please Enter Your Business"
      positionclass="col-md-12 mt-4 p-0"
      placeholder="Source Name"
    />
    <textfor
      v-model="sourcedata.resourceDescription"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.sourcedata.resourceDescription.$error }"
      :labelclass="submitted && $v.sourcedata.resourceDescription.$error ? 'is-error col-md-12 mt-2' : 'col-md-12 mt-2'"
      label="Source Description *"
      helptext="Source Description"
      positionclass="col-md-12 mt-4 p-0"
      placeholder="Source Description"
    />
    <textfor
      v-model="sourcedata.resourceVersion"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.sourcedata.resourceVersion.$error }"
      :labelclass="submitted && $v.sourcedata.resourceVersion.$error ? 'is-error col-md-12 mt-2' : 'col-md-12 mt-2'"
      label="Source Version *"
      helptext="Source Version"
      positionclass="col-md-12 mt-4 p-0"
      placeholder="Source Version"
    />
    <fileuploadfor
      v-model="fileupload"
      v-bind:isColumndisplay="false"
      label="Browse & Upload *"
      helptext="Browse AND Upload"
      positionclass="col-md-12 mt-4 p-0"
      labelclass="col-md-12 mt-2"
    />
    <datefor
      v-model="sourcedata.effectiveFrom"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.sourcedata.effectiveFrom.$error }"
      :labelclass="submitted && $v.sourcedata.effectiveFrom.$error ? 'is-error col-md-12' : 'col-md-12'"
      label="Effective From"
      helptext="Effective From *"
      positionclass="col-md-12 mt-4 p-0"
    />
    <datefor
      v-model="sourcedata.effectiveTo"
      v-bind:isColumndisplay="false"
      :class="{ 'is-invalid': submitted && $v.sourcedata.effectiveTo.$error }"
      :labelclass="submitted && $v.sourcedata.effectiveTo.$error ? 'is-error col-md-12' : 'col-md-12'"
      label="Effective To *"
      helptext="Effective To"
      positionclass="col-md-12 mt-4 p-0"
    />
    <div class="d-block text-center pt-4">
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
import { SourceDef } from '../../../assets/scripts/common/apiurl.js'
export default {
  name: 'AddSourec',
  props: {
    masterData: Object({}),
    isEdit: Boolean(false),
    selectedRow: Object({})
  },
  data () {
    return {
      isAlert: false,
      alertMsg: '',
      isError: false,
      submitted: false,
      sourcedata: {
        'sourceDefinitionId': 0,
        'portalLines': {},
        'lob': {},
        'resourceName': '',
        'resourceDescription': '',
        'resourceVersion': '',
        'effectiveFrom': '',
        'effectiveTo': ''
      },
      fileupload: ''
    }
  },
  validations: {
    sourcedata: {
      portalLines: { required },
      lob: { required },
      resourceName: { required },
      resourceDescription: { required },
      resourceVersion: { required },
      effectiveFrom: { required },
      effectiveTo: { required }
    }
  },
  mounted () {
    if (this.isEdit) {
      this.sourcedata = this.selectedRow
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
        this.alertMsg = 'Please fill the form correctly'
      } else {
        this.isAlert = false
        this.isError = false
        this.addSource()
      }
    },
    addSource () {
      this.sourcedata.effectiveFrom = this.sourcedata.effectiveFrom + 'T00:00:00'
      this.sourcedata.effectiveTo = this.sourcedata.effectiveTo + 'T00:00:00'
      if (!this.isEdit) {
        this.$axios.$post(SourceDef.addSourceDefinitionData, this.sourcedata).then((response) => {
          this.isAlert = true
          const tempMsg = 'Source Added Success Fully'
          this.SetTime(tempMsg)
        }).catch((e) => {
          this.isError = true
          this.isAlert = true
          const tempMsg = 'Error' + ' ' + e
          this.SetTime(tempMsg)
        })
      } else {
        this.$axios.$post(SourceDef.editSourceDefinitionData, [this.sourcedata]).then((response) => {
          this.isAlert = true
          const tempMsg = 'Row Edited Successfully'
          this.SetTime(tempMsg)
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
    }
  }
}
</script>
