<template>
  <div>
    <editor id="tinymce" v-model="value" :init="init"></editor>
  </div>
</template>
<script>
  import tinymce from "tinymce/tinymce";
  import Editor from "@tinymce/tinymce-vue";
  import 'tinymce/themes/silver/theme'
  import 'tinymce/icons/default/icons.min.js'
  import "tinymce/plugins/image";
  import "tinymce/plugins/link";
  import "tinymce/plugins/code";
  import "tinymce/plugins/table";
  import "tinymce/plugins/lists";
  import "tinymce/plugins/wordcount";
 

  export default {
    name: 'login',
    components: {Editor},
    data() {
      return {
        value: '',
        //这里是基于vue-cli 3.x配置的,如果不是cli3的情况,'/tinymce'前面要加上'/static',即'/static/tinymce/langs/zh_CN.js'
        init: {
          selector: "#tinymce", //tinymce的id
          language_url: "/static/tinymce/zh_CN.js",
          language: "zh_CN",
          skin_url: "/static/tinymce/skins/ui/oxide", //编辑器需要一个skin才能正常工作，所以要设置一个skin_url指向之前复制出来的skin文件
          plugins: "image link code table lists wordcount", //引入插件
          toolbar: "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen", //工具栏
        }
      }
    },
    mounted() {
      tinymce.init({});
    },
    methods: {
      
    }
  }
</script>
<style scoped>
  
</style>