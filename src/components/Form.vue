<script>
import axios from "axios";

export default {
  name: "Former",
  data() {
    return {
      drawer: this.$store.state.drawer,
      direction: 'rtl',
      LabelName: this.$store.state.LabelName, // 标签名
      activeItems: [],
      textarea1: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      pendingUploadFiles: [],
      display: true,
      title: '',
    };
  },
  methods: {
    toggleActive(ind) {
      const index = this.activeItems.indexOf(ind);
      if (index > -1) {
        // 如果已激活，则移除
        this.activeItems.splice(index, 1);
      } else {
        // 否则添加到激活数组中
        this.activeItems.push(ind);

      }
      console.log(this.activeItems);
    },
    isActive(ind) {
      // 判断项是否激活
      return this.activeItems.includes(ind);
    },
    handleRemove(file){
      this.$refs.files.handleRemove(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onChange(file,fileList) {
      this.pendingUploadFiles = fileList; // 存储文件对象
      console.log(this.pendingUploadFiles)
      return false; // 阻止自动上传
    },
    onRemove(file, fileList) {
      this.pendingUploadFiles = fileList; // 存储文件对象
      console.log(this.pendingUploadFiles)
    },
    changeDrawer() {
      this.$store.commit("changeDrawer");
    },
    submit() {
      console.log(this.pendingUploadFiles)
      //遍历
      for(let i=0;i<this.pendingUploadFiles.length;i++){
        const fileName = this.pendingUploadFiles[i].name;
        console.log(fileName)
        const fileType = fileName.substring(fileName.lastIndexOf('.'));
        if(fileType !== '.jpg' && fileType !== '.jpeg' && fileType !== '.png'){
          alert('请上传jpg、jpge或png的图片！');
          return
        }
      }
      console.log("上传文件")
      axios.get(`${this.$store.state.ServerAddress}`,{
        headers: {

        }
      }).then((response) =>{

      }).catch((error) =>{

      })
    },
    open() {
      this.$prompt('请输入标签', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\s*\S+.*$/,
        inputErrorMessage: '不能为空'
      }).then(({ value }) => {
        //服务器请求
        axios.get(`${this.$store.state.ServerAddress}`,{
          headers:{

          }
        }).then((response) =>{
          this.$message({
            type: 'success',
            message: '添加成功'
          });
        }).catch((error)=>{
          this.$message({
            type: 'warning',
            message: '添加失败' + error
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }

  },
  computed: {
    // 从Vuex获取drawer状态
    vuexDrawer() {
      return this.$store.state.drawer;
    }
  },
  watch: {
    // 监听Vuex状态的变化，更新组件内部状态
    vuexDrawer() {
      this.drawer = true;
    }
  },
  mounted() {
    this.$bus.$on('DataEvent', (newData) => {
      console.log('接收到数据：', newData)
      // 使用接收到的数据或保持默认值
      this.textarea1 = newData.textarea1
      this.title = newData.title
      this.display = newData.display
      this.activeItems = newData.activeItems
    });
  },
  beforeDestroy() {
    // 移除事件监听器，避免内存泄漏
    this.$bus.$off('DataEvent');
  }
}


</script>

<template>
  <div>


    <el-drawer
        title="添加图片"
        :visible.sync="drawer"
        :direction="direction"
        size="360px"
    >
      <form class="form">
        <div class="add-photo">
          <el-upload class="upload"
                     v-if="display"
                     ref='files'
                     action="#"
                     accept=".png, .jpg, .jpeg"
                     list-type="picture-card"
                     :auto-upload="false"
                     :on-remove="onRemove"
                     :on-change="onChange">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>

                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

          <el-row class="navigation-bar">
            <el-button class="navigation-item"
                       :class="{ active: isActive(i.id) }"
                       round size="mini"
                       v-for="(i) in LabelName"
                       :key="i.id"
                       @click="toggleActive(i.id)"
            >{{ i.name }}
            </el-button>
            <el-button class="navigation-item"
                       circle
                       size="mini"
                       icon="el-icon-plus"
                       @click="open()"
            ></el-button>
          </el-row>

          <el-input class="input-item"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    placeholder="请输入内容"
                    v-model="textarea1">
          </el-input>
        </div>

        <div class="submit">
          <el-button @click="submit"
                     style="margin-left: 16px;"
                     type="primary" round >提交</el-button>
        </div>


      </form>
    </el-drawer>
  </div>

</template>

<style scoped>




.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 100px);
  overflow-y: auto;

}

.upload {
  padding: 15px;
}

.input-item {
  width: calc(100% - 40px);
  padding: 15px;
}

.submit,
.navigation-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 15px;
}

.navigation-item {
  margin: 5px;
}

.navigation-item.active {
  background-color: #409EFF;
  color: white;
}


</style>