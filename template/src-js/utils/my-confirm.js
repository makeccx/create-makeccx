//@ts-check
/// <reference path="../global.d.ts" />

/**
 * 使用社区版弹窗，或自动回退到使用confirm。  
 * 使用社区版弹窗时，返回结果是异步的，因此需要在前面添加await。  
 * @param {string} title
 * @param {string} message
 */
export function myConfirm(title, message) {
    if (typeof self.clipAlert === 'function')
        return self.clipAlert(title, message) // 异步
    return confirm(message) // 同步
}