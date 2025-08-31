import { ref } from "vue";

/**
 * @param {boolean} initialState - 初始状态（默认false）
 * @returns {Object} { modalState, showModal, hideModal, toggleModal }
 */
export function useAntModal(initialState = false) {
  const modalState = ref(initialState);
  const modalData = ref(0);

  const showModal = (params) => {
    modalState.value = true;
    modalData.value = params;
  };

  // 隐藏弹框
  const hideModal = () => {
    modalState.value = false;
    modalData.value = 0;
  };

  // 返回状态和方法
  return {
    modalState,
    showModal,
    hideModal,
    modalData,
  };
}
