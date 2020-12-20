<template>
  <div v-bind:class="[(isColumndisplay ? '' : positionclass)]">
    <div class="form-group radio-group">
      <div v-bind:for="[id]" :class="[(isColumndisplay ? positionclass : ' ' + labeltextclass)]">
        <span>{{ label }}</span>
        <hr v-bind:class="[errorclass]">
        <!-- <img v-bind:title="[helptext]" src="@/assets/assets/images/tooltip-icon-black.svg" class="info-icon" data-toggle="tooltip" alt="address-tooltip-icon"> -->
      </div>
      <div v-bind:class="[(isColumndisplay ? 'row' : labelclass)]" style="height:200px; overflow:auto">
        <div v-bind:class="[inputclass]" v-for="(options, index) in booleanChecklist" v-bind:key="index">
          <input
            @input="textboxBlured(options)"
            v-bind:id="[id]"
            v-model="options['selected']"
            aria-hidden="true"
            type="checkbox"
          >
          <label role="button" class="toggle-button">
            {{ options[textprop] }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckListFor',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    hide: String(''),
    value: Object({}),
    label: String(''),
    helptext: String(''),
    labelclass: String(''),
    positionclass: String(''),
    id: String(''),
    placeholder: String(''),
    inputclass: String(''),
    errorclass: String(''),
    isColumndisplay: String(''),
    name: String(''),
    valueprop: String(''),
    textprop: String(''),
    labeltextclass: String('')
  },
  data () {
    return {
      booleanChecklist: []
    }
  },
  watch: {
    list () {
      this.booleanChecklist = this.list
    },
    value () {
      const textp = this.textprop
      const currentvalue = this.value
      this.booleanChecklist.forEach((element) => {
        if (currentvalue[this.camelCase(element[textp])] === 'Yes') {
          element.selected = true
        } else {
          element.selected = false
        }
      })
    }
  },
  mounted () {
    this.booleanChecklist = this.list
    const textp = this.textprop
    const currentvalue = this.value
    this.booleanChecklist.forEach((element) => {
      if (currentvalue[this.camelCase(element[textp])] === 'Yes') {
        element.selected = true
      } else {
        element.selected = false
      }
    })
  },
  methods: {
    camelCase (str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      }).replace(/\s+/g, '')
    },
    textboxBlured (selectedItem) {
      const transmitobj = this.value
      transmitobj[this.camelCase(selectedItem[this.textprop])] = selectedItem.selected === true ? 'NA' : 'Yes'
      // transmitobj[selectedItem] = transmitobj[selectedItem] === 'Yes' ? 'NA' : 'Yes'
      this.$emit('input', transmitobj)
    }
  }
}
</script>
