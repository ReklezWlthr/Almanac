<template>
<div class="row">
  <div>
    <div class="text-lg font-bold text-paleViolet">{{ header }}</div>
    <input @input="forwardValue" v-model.trim="value" class="input"/>
    <!--<error-text
      attr="fname"
      :errors="errors"
      :error-class="errorClass"
    ></error-text>-->
  </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            value: ''
        }
    },
    props:['header'],
    emits:['forward-value'],
    methods:{
        forwardValue(){
            this.$emit('forward-value', this.value);
        }
    }
}
</script>