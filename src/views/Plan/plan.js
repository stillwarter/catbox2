/**
 * 生成与组件绑定的处理函数（闭包）
 * @param {Object} context - 组件上下文（包含需要的变量和方法）
 * @returns {Object} 包含具体处理逻辑的函数集合
 */
export function createPlanHelper(context) {
  const { planList, hideModalRef } = context;
  const open = (v) => {
    if (v) {
      hideModalRef.value.showModal(JSON.stringify(v));
    } else {
      hideModalRef.value.showModal(0);
    }
  };
  const getPlan = async () => {
    planList.value = [];
    const end = await window.electronAPI.getPlanJson();
    planList.value = end;
  };
  return {
    open,
    getPlan,
  };
}
