// vue3.0消息提示方法封装，和全局方法区别在于可以监听某一变量的变化返回到所需要的页面进行使用，但是全局方法不行
import { MessageBox } from 'element-ui';
import { ref } from '@vue/composition-api';

export function global(){
    const str = ref('');
    const confirm = (params) => {
        MessageBox.confirm(params.content,  params.tip || "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: params.type || "warning",
            center: true
        }).then(() => {
            str.value = params.id || '';
            params.fn && params.fn(params.id || '')
        }).catch(() => {
            params.catchFn && params.catchFn()
        });
    }

    return {
        str,
        confirm
    }
}