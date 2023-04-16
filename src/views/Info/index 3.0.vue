<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="warp-content">
            <el-select v-model="category_value" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker style="width: 100%;" v-model="date_value" type="datetimerange" format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss" align="right" start-placeholder="开始日期" end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-work">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-select v-model="search_key" style="width: 100%;">
              <el-option v-for="item in search_option" :key="item.value" :value="item.value"
                :label="item.label"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="search_keyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%;">搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2">
        <el-button type="danger" class="pull-right" style="width: 100%;" @click="dialog_info = true">新增</el-button>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <div class="black-space-30"></div>
    <el-table :data="table_data" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="catory" label="类型" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <!--底部分页-->
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination class="pull-right" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="100">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 信息弹窗 -->
    <DialogInfo :flag.sync="dialog_info" />
  </div>
</template>
<script>
// import DialogInfo from './dialog/info2.0'
import DialogInfo from './dialog/info3.0'
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
export default {
  name: 'infoIndex',
  components: {
    DialogInfo
  },
  setup(props,{ root }) {
    /*
    *数据
     */
    // 信息弹窗关闭打开状态值
    const dialog_info = ref(false);
    const category_value = ref('');
    const date_value = ref('');
    const search_key = reactive('id')
    const search_keyWork = ref('')

    // 搜索关键字
    const search_option = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" }
    ])
    const options = reactive([{
      value: 1,
      label: '国际信息'
    }, {
      value: 2,
      label: '国内信息'
    }, {
      value: 3,
      label: '行业信息'
    }]);


    /*
    *表格数据
    */
    const table_data = reactive([
      {
        title: '纽约市长白思豪宣布退出总统竞选 特朗普发推回应',
        catory: '国内信息',
        date: '2029-09-10 19:31:31',
        user: '管理员'
      },
      {
        title: '纽约市长白思豪宣布退出总统竞选 特朗普发推回应',
        catory: '国内信息',
        date: '2029-09-10 19:31:31',
        user: '管理员'
      },
      {
        title: '纽约市长白思豪宣布退出总统竞选 特朗普发推回应',
        catory: '国内信息',
        date: '2029-09-10 19:31:31',
        user: '管理员'
      },

    ])
    /**
     * vue2.0 methods
     */
    // 每页多少条
    const handleSizeChange = (val) => {
      page.pageSize = val
    }
    //当前页
    const handleCurrentChange = (val) => {
      console.log(val);
      page.pageNumber = val
      getList()
    }
    //  删除
    const deleteItem = () => {
      root.confirm({
        content:"确认删除当前信息，确认后将无法恢复！！",
        tip:"警告",
        fn:confirmDelete, //调用确认删除方法 
        id:"111"
      })
    }
    // 批量删除
    const deleteAll = () => {
      root.confirm({
        content:"确认删除选择的数据，确认后将无法恢复！！",
        tip:"success",
        fn:confirmDelete,
        id:"222"
      })
    }
    // 确认删除接口
    const confirmDelete = (value) => {
      console.log(value);
    }


    return {
      //ref
      category_value,  //下拉选择框
      date_value,       //日期
      search_key,      //关键字
      search_keyWork,    //搜索输入框
      dialog_info,     //信息弹窗状态
      //reactive
      options,
      table_data,       //表格数据
      search_option,   //搜索关键字
      //vue2.0 methods
      handleSizeChange,
      handleCurrentChange,
      deleteItem,
      deleteAll
    }
  }

}
</script>
<style lang="scss" scoped>
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }

  &.date {
    @include labelDom(right, 93, 40);
  }

  &.key-work {
    @include labelDom(right, 99, 40);
  }
}
</style>