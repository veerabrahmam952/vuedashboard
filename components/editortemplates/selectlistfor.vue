<template>
  <div v-bind:class="[(isColumndisplay ? '' : positionclass)]">
    <div v-bind:class="[(isColumndisplay ? 'row' : labelclass)]">
      <div v-bind:for="[id]" :class="[(isColumndisplay ? positionclass : '')]">
        <span>{{ label }}</span>
        <!-- <img v-bind:title="[helptext]" class="info-icon" src="@/assets/assets/images/tooltip-icon-black.svg" data-toggle="tooltip" alt="address-tooltip-icon"> -->
      </div>
      <select v-model="customModel" v-bind:class="['form-control'+' '+labelclass]" v-bind:aria-label="[label]" v-bind:placeholder="[placeholder]" type="select">
        <option v-for="(options , index) in model" :key="index" :value="options">
          {{ options[textprop] }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectlistFor',
  props: {
    value: Object({}),
    objvalue: Object({}),
    label: String(''),
    helptext: String(''),
    labelclass: String(''),
    positionclass: String(''),
    id: String(''),
    placeholder: String(''),
    inputclass: String(''),
    isColumndisplay: String(''),
    valueprop: String(''),
    textprop: String(''),
    model: {
      type: Array,
      default: () => {}
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
    //   set (selectedValue) {
    //     let selectedobj = {}
    //     this.model.forEach((element, index, array) => {
    //       if (element[this.valueprop] === selectedValue[0]) {
    //         selectedobj = element
    //         this.value = selectedValue
    //       }
    //     })
    //     this.$emit('input', selectedobj)
    //   }
    }
  }
}
</script>
