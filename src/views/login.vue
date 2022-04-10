<template>
  <div>
    <editor id="tinymce" v-model="value" :init="init"></editor>

    <!-- <div style="margin-top: 30px;">
      <span>姓名：</span>
      <el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
    </div> -->


    <!-- 上传1 -->
    <div style="margin-top: 30px;">
      <el-upload 
        class="avatar-uploader" 
        action="#" 
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :show-file-list="false" 
        :before-upload="beforeAvatarUpload" 
        :on-progress="uploading"
        :on-success="importSuccess" 
        :on-error="importError">
        <el-button type="success">导入</el-button>
      </el-upload>
    </div>

    <!-- 上传2 -->
    <div style="margin-top: 30px;">
      <el-upload    
      class="upload-demo"    
      action=""    
      :on-change="handleChange"    
      :on-exceed="handleExceed"    
      :on-remove="handleRemove"    
      :file-list="fileListUpload"    
      :limit="1"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"    
      :auto-upload="false">    
      <el-button size="small" type="primary">点击上传</el-button>   
      <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div></el-upload>
    </div>



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
        },
        fileListUpload: [],  // 上传的文件列表
        fileTemp: null, // 定义了一下变量，指向最新上传的附件，起始定义为null
      }
    },
    mounted() {
      tinymce.init({});
    },
    methods: {
      beforeAvatarUpload(file) {

      },
      uploading() {
          this.loading = true;
      },
      importSuccess(res) {
        this.loading = false
          if (res.code == 500) {
            return this.$message.error('导入错误，请以正确格式填写文件');
          }
          if (res.code !== 0) {
            return this.$message.error(res.msg);
          }
          this.$message({
            message: '导入成功',
            type: "success",
            duration: 500,
            onClose: () => {
                this.getDataList()
            }
          });
        },
      importError(err) {
        this.loading = false;
        this.$message.error('服务器错误，导入失败')
      },


      handleChange(file, fileList){   
        this.fileTemp = file.raw
        console.log('handleChange', file.raw);
        if(this.fileTemp){    
          if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') 
          || (this.fileTemp.type == 'application/vnd.ms-excel')){       
             this.importfxx(this.fileTemp)    
          } else {        
            this.$message({            
              type:'warning',            
              message:'附件格式错误，请删除后重新上传！'        
            })    
          }
        } else {    
          this.$message({        
            type:'warning',       
             message:'请上传附件！'    
          })
        }
      },

      importfxx(obj) {    
        let _this = this;    // 通过DOM取文件数据    this.file = obj    var rABS = false; //是否将文件读取为二进制字符串    var f = this.file;    var reader = new FileReader();    //if (!FileReader.prototype.readAsBinaryString) {    FileReader.prototype.readAsBinaryString = function(f) {        var binary = "";        var rABS = false; //是否将文件读取为二进制字符串        var pt = this;        var wb; //读取完成的数据        var outdata;        var reader = new FileReader();        reader.onload = function(e) {        var bytes = new Uint8Array(reader.result);        var length = bytes.byteLength;        for(var i = 0; i < length; i++) {            binary += String.fromCharCode(bytes[i]);        }        var XLSX = require('xlsx');        if(rABS) {            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化                type: 'base64'            });        } else {            wb = XLSX.read(binary, {                type: 'binary'            });        }        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西            this.da = [...outdata]            let arr = []            this.da.map(v => {                let obj = {}                obj.code = v['设备ID']                obj.type = v['设备型号']                arr.push(obj)            })            return arr        }        reader.readAsArrayBuffer(f);    }
        if(rABS) {        
          reader.readAsArrayBuffer(f);    } else {        reader.readAsBinaryString(f);    }},

      handleRemove(file,fileList){    
        this.fileTemp = null
      },
      handleExceed(files, fileList) {

      }
    }
  }
</script>
<style scoped>
  
</style>