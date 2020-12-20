<template>
  <div class="col-md-12 col-lg-12">
    <div class="card">
      <div class="card-header-tab card-header">
        <div class="card-header-title font-size-lg text-capitalize font-weight-bold">
          {{ templateheader }}
        </div>
      </div>
      <slot name="SearchContorls" />
      <slot name="SearchButtons" />
    </div>
    <slot name="SearchGrid" />
  </div>
</template>
<script>

export default {
  name: 'PageTemplate',
  props: {
    templateheader: String('')
  }
}
</script>
