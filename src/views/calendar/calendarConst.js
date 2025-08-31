import { currentYear, currentMonth, getDays } from "./calendar";
/**
 * 生成与组件绑定的变量（闭包）
 * @param {Object} context - 组件上下文（包含需要的变量和方法）
 * @returns {Object} 包含具体处理逻辑的函数集合
 */
export function createCalendarConst(context) {
  const { ref } = context;
  const choseYaer = ref(currentYear);
  const choseMonth = ref(currentMonth);
  const choseCountDays = ref(getDays());
  const choseDaysData = ref("");
  return {
    choseYaer,
    choseMonth,
    choseCountDays,
    choseDaysData,
  };
}
