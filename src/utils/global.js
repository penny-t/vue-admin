// 原型注入、全局消息提示方法封装
import { MessageBox } from "element-ui";
export default {
  install(Vue, options) {
    Vue.prototype.confirm = (params) => {
      MessageBox.confirm(params.content, params.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.type || "warning",
        center: true,
      })
        .then(() => {
          params.fn && params.fn(params.id);
          // 如果存在就掉用fn函数(普通写法)
          // if(params.fn){params.fn()}
        })
        .catch(() => {
          // root.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    };
  },
};
// vue插件
