//@ts-check
/// <reference path="../global.d.ts" />

import { id } from "../info.json"

/**
 * @param {*} e 
 * @param {BlockFuncUtil} util 
 */
export function logBlockError(e, util) {
    console.error(
        "Extension:", id, '\n',
        "    block opcode:", util?.currentBlock?.opcode, '\n',
        "    block id:", util?.currentBlockId, '\n',
        "    top block id:", util?.thread?.topBlock, '\n',
        "    sprite name:", util?.thread?.target?.sprite?.name, '\n',
        "    sprite is original:", util?.thread?.target?.isOriginal, '\n',
        "    sprite is stage:", util?.thread?.target?.isStage, '\n',
        e
    )
}