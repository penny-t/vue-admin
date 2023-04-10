import Vue from "vue";
// 引用SVG文件
import SvuIcon from "./SvgIcon";
Vue.component("svg-icon", SvuIcon);

/**
 * require.context：读取指定目录的所有文件
 * 第一个参数：读取./svg 下的目录
 * 第二个参数：是否遍历子级目录
 * 第三个参数：定义遍历文件规则
 */
// 解析文件
const req = require.context("./svg", false, /\.svg$/); // 正则里面表示结尾，读取结尾为.svg的文件
// es6
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};
// es5
// const requireAll = function(requireContext ){
//     return requireContext.keys().map(requireContext)
// }
requireAll(req);
