<script>
import ImagePreview from './ImagePreview.vue';

export default {
  name: 'BodyPart',
  data() {
    return {
      Photo0: this.$store.state.Photo,
      Photo: [
        {
          id: 1,
          url: "../assets/img/1.jpg",
          target: [
            {name: "按钮1", id: 1},
            {name: "按钮1", id: 2},
            {name: "按钮1", id: 3},
          ],
          message: "xxxxx",
          sendTime: "0:00000"
        },
        {
          id: 2, url: "../assets/img/1.jpg", target: [
            {name: "按钮1", id: 2},
            {name: "按钮1", id: 3},
            {name: "按钮1", id: 5},
          ], message: "xxx", sendTime: "0:00"
        },
        {id: 3, url: "/img/2.da9e635d.jpg", target: [], message: "xxx", sendTime: "0:00"},
        {id: 4, url: "/img/1.4428a8f7.jpg", target: [], message: "xxx", sendTime: "0:00"},
        {id: 5, url: "/img/2.da9e635d.jpg", target: [], message: "xxx", sendTime: "0:00"},
        {id: 6, url: "/img/1.4428a8f7.jpg", target: [], message: "xxx", sendTime: "0:00"},
        {id: 7, url: "/img/1.4428a8f7.jpg", target: [], message: "xxx", sendTime: "0:00"},
        {id: 8, url: "/img/2.da9e635d.jpg", target: [], message: "xxx", sendTime: "0:00"},
        {id: 9, url: "/img/1.4428a8f7.jpg", target: [], message: "xxx", sendTime: "0:00"},
        {id: 10, url: "/img/2.da9e635d.jpg", target: [], message: "xxx", sendTime: "0:00"},
      ],
      srcList: this.$store.state.srcList,
      showDeleteMode: false,
      dialogVisible: false,
      currentImage: '/img/2.da9e635d.jpg',
    }
  },
  methods: {
    toggleDeleteMode() {
      this.showDeleteMode = !this.showDeleteMode;
    },
    deletePhoto(id) {
      this.Photo = this.Photo.filter(photo => photo.id !== id);
    },
    openImagePreview(id) {
      const image = this.Photo.find(photo => photo.id === id);
      if (image) {
        this.currentImage = image;
        this.$refs.imagePreview.$emit('open-preview');
      }
    },
    changeDrawer() {
      this.$store.commit("changeDrawer");
    },

    // 检查点击是否发生在图片列表外
    checkIfClickOutside(event) {
      if (!this.$el.contains(event.target) && this.showDeleteMode) {
        this.showDeleteMode = false; // 停止删除模式
      }
    },
  },
  mounted() {
    // 当组件挂载时，添加事件监听器, 关闭删除模式
    document.addEventListener('click', this.checkIfClickOutside);
  },
  beforeDestroy() {
    // 组件销毁前移除事件监听器
    document.removeEventListener('click', this.checkIfClickOutside);
  },
  components: {
    ImagePreview
  },

}
</script>

<template>

  <div>
<!--        <img src="../assets/img/1.jpg" alt="" class="img-item" width="500" @click="openImagePreview(1)">-->
<!--        <img src="../assets/img/2.jpg" alt="" class="img-item" width="772" @click="openImagePreview(2)">-->
    <image-preview :image-url="currentImage" ref="imagePreview"></image-preview>
    <div class="waterfall">
      <div v-for="photo in Photo" :key="photo.id" class="waterfall-item">
        <div class="img-wrapper" :class="{'delete-mode': showDeleteMode, 'hover-effect': !showDeleteMode}">
          <el-image :src="photo.url" alt="" lazy class="img-item"
                    @click="openImagePreview(photo.id)"></el-image>
          <el-button
              v-if="showDeleteMode"
              class="delete-btn"
              type="danger"
              icon="el-icon-circle-close"
              @click.stop="deletePhoto(photo.id)"
              size="mini"
              circle
          ></el-button>
        </div>
      </div>
    </div>
    <div class="global-delete-btn">
      <el-button
          class="add-button"
          @click="changeDrawer()"
          type="primary"
          icon="el-icon-plus"
          size="small"
          round>添加图片
      </el-button>
      <el-button
          class="add-button"
          @click="toggleDeleteMode"
          type="danger"
          icon="el-icon-minus"
          size="small"
          round>删除图片
      </el-button>

    </div>
  </div>
</template>


<style scoped>
/* 定位全局删除按钮 */
.global-delete-btn {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 10; /* 确保按钮显示在最上层 */
}

.add-button {
  margin-left: 0;
  margin-bottom: 10px;
}

/* 控制瀑布流布局 */
.waterfall {
  column-gap: 16px;
  column-count: 2;
}

@media (min-width: 600px) {
  .waterfall {
    column-count: 3;
  }
}

@media (min-width: 900px) {
  .waterfall {
    column-count: 4;
  }
}

@media (min-width: 1200px) {
  .waterfall {
    column-count: 5;
  }
}

@media (min-width: 1500px) {
  .waterfall {
    column-count: 6;
  }
}

/* 设置瀑布流项的基础样式 */
.waterfall-item {
  width: 100%;
  padding-top: 16px;
  break-inside: avoid;
  position: relative;
}

/* 控制图片和删除按钮的外观 */
.img-wrapper {
  position: relative;
}

.img-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  cursor: pointer;
}

/* 鼠标悬停在图片上时的放大和阴影效果 */
.hover-effect:hover .img-item {
  transform: scale(1.03);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* 删除模式激活时的样式 */
.delete-mode .img-item {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* 删除按钮样式 */
.delete-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 20; /* 确保删除按钮在图片之上 */
}
</style>
