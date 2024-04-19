<script>
import axios from "axios";

export default {
  name: "Header",
  data() {
    return {
      LabelName: this.$store.state.LabelName,
      value1: '',
      activeItems: [],
      input: '',
    }
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

    },
    isActive(ind) {
      // 判断项是否激活
      return this.activeItems.includes(ind);
    },
    search(){
      // 发送请求
      axios.get(`${this.$store.state.ServerAddress}`,{
        headers: {

        }
      }).then((response) =>{

      }).catch((error) =>{
        console.log(error)
      })
    },
    getData(){
      axios.get(`${this.$store.state.ServerAddress}`,{
        headers: {

        }
      }).then((response) =>{

      }).catch((error) =>{
      })
    },

  },
}
</script>

<template>
  <div>

    <h1>照片墙</h1>

    <div class="navigation">
      <div class="person-search">
        <el-input v-model="input" placeholder="按名称搜索"></el-input>
        <el-button class="person-search-but" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <el-date-picker class="data-search"
                      v-model="value1"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-row class="navigation-bar">
        <el-button class="navigation-item"
                   :class="{ active: isActive(i.id) }"
                   round size="mini"
                   v-for="(i) in LabelName"
                   :key="i.id"
                   @click="toggleActive(i.id)"
        >{{ i.name }}
        </el-button>
      </el-row>
    </div>
  </div>

</template>

<style scoped>
h1 {
  text-align: center;
  margin: 50px;
}

::v-deep .picker .el-icon-date {
  right: 10px;
}

.navigation {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.person-search{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.person-search-but {
  margin-left: 10px;
}


.data-search {
  margin-bottom: 20px;

}

.navigation-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.navigation-item {
  margin: 5px;
}

.navigation-item.active {
  background-color: #409EFF;
  color: white;
}

</style>