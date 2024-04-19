<template>
    <div id="app-part">
      <Form/>
      <Head/>
      <BodyPart/>
    </div>

</template>

<script>
import Head from './components/Header'
import Form from './components/Form'
import BodyPart from './components/BodyPart.vue'


export default {
  name: 'App',
  components: {
    Head,Form,BodyPart
  }
}
</script>

<style>
html, body {
  overflow: auto;
}
#app-part {
  padding: 0 30px;
}
</style>
