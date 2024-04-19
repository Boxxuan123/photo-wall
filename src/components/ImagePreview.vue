<template>
  <div v-if="visible" class="overlay" @click.self="closePreview()">
    <div class="preview-container">
      <div class="preview-content">
        <div class="preview-image">
          <img :src="imageUrl.url" alt="Preview">
        </div>
        <div class="info-section">
          <div class="info-section-top">
            <div>
              <p class="publish-time">发布时间：</p>
              <p class="publish-time">{{ imageUrl.sendTime }}</p>
            </div>
            <div>
              <p>标签</p>
              <el-row class="navigation-bar">
                <el-button class="navigation-item"
                           round size="mini"
                           v-for="(i) in imageUrl.target"
                           :key="i.id"
                >{{ i.name }}
                </el-button>
              </el-row>
            </div>
            <div>
              <p class="description">详细介绍：</p>
              <p class="description">{{ imageUrl.message }}</p>
            </div>
          </div>


        </div>
        <el-button
            class="add-button"
            @click="changeDrawer()"
            type="primary"
            style="margin-left: 16px;"
            size="small"
            round>修改信息
        </el-button>
      </div>
      <span class="close-btn" @click="closePreview()">&times;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['imageUrl'],
  data() {
    return {
      visible: false,
      LabelName: this.$store.state.LabelName,

      photoMessage: {}
    };
  },
  methods: {
    openPreview() {
      this.visible = true;
    },
    closePreview() {
      this.visible = false;
    },
    changeDrawer() {
      this.$store.commit("changeDrawer")
      console.log(this.imageUrl)
      this.photoMessage = JSON.parse(JSON.stringify(this.imageUrl)); // 深拷贝imageUrl以避免直接修改prop
      console.log(this.photoMessage)
      this.$bus.$emit('DataEvent', {
        title: '修改图片信息',
        display: false,
        activeItems: this.photoMessage.target.map(item => item.id),
        textarea1: this.photoMessage.message
      });

    },
  },
  created() {
    this.$on('open-preview', this.openPreview);
  },

};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px; /* 添加一些内边距以确保预览容器不会紧贴边缘 */
}

.preview-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  max-width: 80%;
  max-height: 100%;
  overflow-y: auto;
}

.preview-content {
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
}


.preview-image {
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
}

.info-section {
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  color: black;
  background: white;
  width: 250px;
  min-width: 250px;
  flex: 1;
  overflow: auto; /* 确保内容过多时可以滚动 */

}

.info-section-top {
  flex-grow: 1; /* 使顶部内容能够占据大部分空间 */
  display: flex;
  flex-direction: column;

}


.publish-time,
.description {
  margin: 0;
  padding: 10px 0;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 70px;
  font-size: 30px;
  color: white;
  cursor: pointer;

}

.navigation-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.navigation-item {
  margin: 5px;
}

/* 底部按钮 */


.add-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  margin-top: 10px;
}
</style>
