//@ts-check
/// <reference path="../global.d.ts" />

/**
 * @param {string} left
 * @param {string} right
 * @returns {string}
 */
export function appendID(left, right) {
    left += ''
    right += ''
    if (right == "")
        return left
    if (!left.endsWith('.'))
        left += '.'
    if (right.startsWith(left))
        return right
    return left + right
}
