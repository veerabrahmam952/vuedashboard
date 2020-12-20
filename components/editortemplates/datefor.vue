<template>
  <div v-bind:class="[(isColumndisplay ? '' : positionclass)]">
    <div v-bind:class="[(isColumndisplay ? 'row' : labelclass)]">
      <div v-bind:for="[id]" :class="[(isColumndisplay ? positionclass : '')]">
        <span>{{ label }}</span>
        <!-- <img v-bind:title="[helptext]" class="info-icon" src="@/assets/assets/images/tooltip-icon-black.svg" data-toggle="tooltip" alt="address-tooltip-icon"> -->
      </div>
      <input
        v-bind:class="['form-control'+' ' + labelclass]"
        v-bind:aria-label="[label]"
        v-bind:placeholder="[placeholder]"
        v-model="customModel"
        type="date"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectlistFor',
  props: {
    objvalue: String(''),
    value: String(''),
    label: String(''),
    helptext: String(''),
    labelclass: String(''),
    positionclass: String(''),
    id: String(''),
    placeholder: String(''),
    inputclass: String(''),
    isColumndisplay: String(''),
    model: Object({ })
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
