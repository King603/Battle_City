
/**
 * 数组删除某个元素
 * @param arg 元素
 * @returns
 */
Array.prototype.remove = function (arg) {
  remove(this, arg);
};

/**
 * 数组根据下标删除元素
 * @param index 元素下标
 * @returns
 */
Array.prototype.removeByIndex = function (index) {
  remove(this, this[index]);
};

/**
 * 简写数组父类新增的方法
 * @param {Object} self 对象本身
 * @param {Element} arg 判断依据
 * @returns
 */
function remove(self, arg) {
  let i = 0, n = 0;
  while (i < self.length) {
    if (self[i] != arg)
      self[n++] = self[i];
    i++;
  }
  if (n < i)
    self.length = n;
}

/**
 * 数组是否包含某个元素
 * @param arg 元素
 * @returns
 */
Array.prototype.contain = function (arg) {
  for (let i = 0; i < this.length; i++)
    if (this[i] == arg)
      return !0;
  return !1;
};










