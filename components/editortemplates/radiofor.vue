<template>
  <div v-bind:class="[(isColumndisplay ? '' : positionclass)]">
    <div class="form-group radio-group">
      <div v-bind:class="[(isColumndisplay ? 'row' : labelclass + inputclass)]">
        <div v-bind:for="[id]" :class="[(isColumndisplay ? positionclass : '')]">
          <span>{{ label }}</span>
          <!-- <img v-bind:title="[helptext]" src="@/assets/assets/images/tooltip-icon-black.svg" class="info-icon" data-toggle="tooltip" alt="address-tooltip-icon"> -->
        </div>
        <div v-bind:class="[labelclass+' '+'toggle-group'+' ' + inputclass]">
          <input
            v-model="customModel"
            :value="yesStr"
            v-bind:id="[id]+'true'"
            name="true"
            aria-hidden="true"
            type="radio"
          >
          <label v-bind:for="[id]+'true'" aria-label="Yes" role="button" class="toggle-button">
            <span>Yes</span>
          </label>
          <input
            v-model="customModel"
            :value="noStr"
            v-bind:id="[id]+'false'"
            name="false"
            aria-hidden="false"
            type="radio"
          >
          <label v-bind:for="[id]+'false'" aria-label="No" role="button" class="toggle-button">
            <span>No</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RadioFor',
  props: {
    value: String(''),
    label: String(''),
    helptext: String(''),
    labelclass: String(''),
    positionclass: String(''),
    id: String(''),
    placeholder: String(''),
    inputclass: String(''),
    isColumndisplay: String(''),
    name: String('')
  },
  data () {
    return {
      yesStr: true,
      noStr: false
    }
  },
  computed: {
    customModel: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
