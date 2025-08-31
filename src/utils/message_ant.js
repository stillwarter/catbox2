import { getCurrentInstance } from 'vue'
import { message } from 'ant-design-vue'

// 基础消息类型映射
const messageTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  loading: 'loading'
}

/**
 * 消息提示工具函数
 * @param {string} content - 消息内容
 * @param {string} type - 消息类型：success/error/info/warning/loading
 * @param {Object} options - 额外配置项
 * @param {number} [options.duration=3] - 显示时长(秒)，0 表示不自动关闭
 * @param {string} [options.key] - 唯一标识，用于关闭指定消息
 * @param {string} [options.prefixCls] - 样式类前缀
 * @param {Function} [options.onClose] - 关闭时的回调函数
 * @returns {Object} 消息实例，包含 close 方法
 */
function showMessage (content, type = 'info', options = {}) {
  // 默认配置
  const defaultOptions = {
    duration: 3,
    ...options
  }

  // 验证消息类型
  if (!Object.keys(messageTypes).includes(type)) {
    console.warn(`未知的消息类型: ${type}，已自动切换为 info 类型`)
    type = 'info'
  }

  // 调用 antdv 的 message 方法
  const messageInstance = message[type](
    content,
    defaultOptions.duration,
    defaultOptions.onClose
  )

  // 如果提供了 key，绑定到实例上
  if (defaultOptions.key) {
    messageInstance.key = defaultOptions.key
  }

  return messageInstance
}

// 为每种消息类型创建快捷方法
const Message = {
  /**
   * 成功消息
   * @param {string} content - 消息内容
   * @param {Object} options - 配置项
   * @returns {Object} 消息实例
   */
  success: (content, options = {}) => showMessage(content, 'success', options),

  /**
   * 错误消息
   * @param {string} content - 消息内容
   * @param {Object} options - 配置项
   * @returns {Object} 消息实例
   */
  error: (content, options = {}) => showMessage(content, 'error', options),

  /**
   * 信息消息
   * @param {string} content - 消息内容
   * @param {Object} options - 配置项
   * @returns {Object} 消息实例
   */
  info: (content, options = {}) => showMessage(content, 'info', options),

  /**
   * 警告消息
   * @param {string} content - 消息内容
   * @param {Object} options - 配置项
   * @returns {Object} 消息实例
   */
  warning: (content, options = {}) => showMessage(content, 'warning', options),

  /**
   * 加载中消息
   * @param {string} content - 消息内容
   * @param {Object} options - 配置项
   * @returns {Object} 消息实例
   */
  loading: (content, options = {}) => showMessage(content, 'loading', options),

  /**
   * 关闭指定消息
   * @param {string} key - 消息唯一标识
   */
  close: key => {
    if (key) {
      message.destroy(key)
    } else {
      message.destroy() // 关闭所有消息
    }
  }
}

export default Message
