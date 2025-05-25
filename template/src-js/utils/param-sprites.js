//@ts-check
/// <reference path="../global.d.ts" />

import { type } from "clipcc-extension";
import { menuSprites } from "./menu-sprites";

/** @type {MyParam} */
export const paramSprites = {
    type: type.ParameterType.STRING,
    //@ts-ignore
    defaultValue: undefined,
    menu: menuSprites,
}