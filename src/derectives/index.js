export const imgError = {
  inserted(el, binding) {
    // 监听dom  img 是否加载失败的事件
    el.onerror = () => {
      // 如果监测到了图片加载失败的事件，就将用户设置的变量值赋值给图片的src
      el.src = binding.value
    }
  }
}
