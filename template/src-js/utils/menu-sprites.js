//@ts-check
/// <reference path="../global.d.ts" />

import { api } from "clipcc-extension";

/** @type {DynamicMenu} */
export const menuSprites = () => {
    /**
     * @type {{
     *     runtime: {
     *         targets: {
     *             isOriginal: boolean
     *             isStage: boolean
     *             sprite: {
     *                 name: string;
     *                 [key: string]: any
     *             };
     *             [key: string]: any
     *         }[];
     *         [key: string]: any
     *     };
     *     [key: string]: any
     * }}
     */
    //@ts-ignore
    const VM = api.getVmInstance()

    const out = VM.runtime.targets
        .filter((target) => target.isOriginal && !target.isStage)
        .map(
            /** @returns {[string, string]} */
            (target) => [target.sprite.name, target.sprite.name]
        )

    return out.length ? out : [['', '']]
}
