<template>
  <div v-bind:class="[(isColumndisplay ? '' : positionclass)]">
    <div v-bind:class="[(isColumndisplay ? 'row' : labelclass)]">
      <span v-bind:for="[id]" :class="[(isColumndisplay ? positionclass : '')]">
        <span>{{ label }}</span>
        <!-- <img v-bind:title="[helptext]" class="info-icon" src="@/assets/assets/images/tooltip-icon-black.svg" data-toggle="tooltip" alt="address-tooltip-icon"> -->
      </span>
      <textarea
        v-bind:class="['form-control'+' ' + inputclass]"
        v-bind:aria-label="[label]"
        v-bind:placeholder="[placeholder]"
        v-model="customModel"
        type="text"
        rows="3"
        column="50"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaFor',
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
    v: Object({ })
  },
  computed: {
    customModel: {
      get () {
        return this.value
      },
      set (value) {
        // this.v.$touch()
        this.$emit('input', value)
      }
    }
  }
}
</script>
