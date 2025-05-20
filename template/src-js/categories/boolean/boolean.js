//@ts-check
/// <reference path="../../global.d.ts" />

import { type } from "clipcc-extension"
import { toScratchBoolean } from "../../utils/to-scratch-boolean"
import defineBlock from "../../utils/define-block"

/** @type {string} */
const categoryID = 'boolean'

/** @type {string} */
const color = '#59C059'


/** @type {MyBlock<BlockParams>[]} */
const blocks = [
    defineBlock({
        id: 'boolean',
        type: type.BlockType.BOOLEAN,
        param: {
            a: {
                type: type.ParameterType.STRING,
                defaultValue: '0'
            },
        },
        /** @returns {boolean} */
        function(args, util) {
            return toScratchBoolean(args.a)
        }
    }),
    defineBlock({
        id: 'equal',
        type: type.BlockType.BOOLEAN,
        param: {
            a: {
                type: type.ParameterType.STRING,
                defaultValue: 'a'
            },
            b: {
                type: type.ParameterType.STRING,
                defaultValue: 'A'
            },
        },
        /** @returns {boolean} */
        function(args, util) {
            return args.a == args.b
        }
    })
]


/** @type {MyCategory} */
export const category_boolean = {
    id: categoryID,
    color,
    blocks,
}
