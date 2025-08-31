/**
 * 生成与组件绑定的处理函数（闭包）
 * @param {Object} context - 组件上下文（包含需要的变量和方法）
 * @returns {Object} 包含具体处理逻辑的函数集合
 */
export function createPlanEditHelper(context) {
  const { modalData, planType, timetag, formState, hideModal, Message, emit } =
    context;
  const handleOk = async () => {
    if (modalData.value) updataPlan();
    else addPlan();
    hideModal();
  };
  const planTypeOpt = planType.map((item) => ({
    value: item,
  }));
  const timetagOpt = timetag.map((item) => ({
    value: item,
  }));
  const setForm = (v) => {
    const data = JSON.parse(v).item;
    Object.keys(data).forEach((key) => {
      if (formState.hasOwnProperty(key)) {
        // 只更新已有属性，避免意外添加新属性
        formState[key] = data[key];
      }
    });
  };

  const addPlan = async () => {
    const filename = Date.now() + ".json";
    const result = await window.electronAPI.createPlanJson({
      filename,
      content: JSON.stringify(formState),
    });
    if (result.success) {
      emit("updata");
      Message.success("新增成功");
    }
  };

  const updataPlan = async () => {
    const path = JSON.parse(modalData.value).itempath;
    const result = await window.electronAPI.createPlanJson({
      filename: getLastPathSegment(path),
      content: JSON.stringify(formState),
    });
    if (result.success) {
      emit("updata");
      Message.success("新增成功");
    }
  };
  return {
    handleOk,
    timetagOpt,
    planTypeOpt,
    setForm,
    handleOk,
  };
}

function getLastPathSegment(path) {
  const normalizedPath = path.replace(/\\/g, "/");
  const segments = normalizedPath.split("/").filter((segment) => segment);
  return segments.length > 0 ? segments[segments.length - 1] : "";
}

function getFileNameWithoutExt(path) {
  const fileName = getLastPathSegment(path);
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex > -1 ? fileName.substring(0, dotIndex) : fileName;
}
