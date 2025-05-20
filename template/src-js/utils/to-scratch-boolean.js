//@ts-check
/// <reference path="../global.d.ts" />

/**
 * @param {*} a 
 * @returns {boolean}
 */
export function toScratchBoolean(a) {
    return !!a && (
        typeof a !== "string" || !/^(0|false)$/i.test(a)
    )
}