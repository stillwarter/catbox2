import { getDays } from "./calendar";
/**
 * 生成与组件绑定的处理函数（闭包）
 * @param {Object} context - 组件上下文（包含需要的变量和方法）
 * @returns {Object} 包含具体处理逻辑的函数集合
 */
export function createCalendarFn(context) {
  const { calendarConst } = context;
  const { choseYaer, choseMonth, choseCountDays, isWeekend, choseDaysData } =
    calendarConst;
  const yearChange = async (v) => {
    choseYaer.value = v;
    choseCountDays.value = getDays(choseYaer.value, choseMonth.value);
    await getWorklog();
  };
  const monthChange = async (v) => {
    choseMonth.value = v;
    choseCountDays.value = getDays(choseYaer.value, choseMonth.value);
    getWorklog();
  };

  async function getWorklog() {
    const filename = choseYaer.value + "" + choseMonth.value + ".json";
    const result = await window.electronAPI.getWorklogJson(filename);
    if (result) {
      choseDaysData.value = JSON.parse(result.mdContent);
    }
  }

  return {
    yearChange,
    monthChange,
    getWorklog,
  };
}
