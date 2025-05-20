/**
 * @copyright 2025 bddjr & Clip Team
 * @license MIT
 * @link https://github.com/bddjr/create-makeccx
 */

import inquirer from "inquirer"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"


const idIgnorePrefix = [
    'com',
    'net',
    'java',
    'org',
    'top',
    'cn',
    'io',
    'co',
    'cc',
    'site',
    'git',
    'github',
    'gitee',
    'gitea',
    'gitlab',
]


let useJS = false
let id = ''
let extensionDir = ''
let author = ''
let extensionName = ''

function leftPath(left: string) {
    return fileURLToPath(import.meta.resolve('./template/' + left))
}

function rightPath(right: string) {
    return path.join(extensionDir, right)
}

function cp(left: string, right?: string) {
    fs.cpSync(
        leftPath(left),
        rightPath(right || left),
        { recursive: true }
    )
}

function checkInputID(id: string): true | string {
    // 1. `your.extension.id` must be an valid id, 
    // which only contains a-z, 0-9 and `_`, and is split by `.`. 
    // To avoid id conflict, a recommended id is `name.extension`, 
    // containing both your extension name and your own name 
    // (or your team/organization's name) with lower letters 
    // (numbers and `_` shouldn't be used if not necessary), 
    // like `alexcui.random`, `clipteam.community`, etc.
    // https://www.npmjs.com/package/clipcc-extension-cli
    let re = /^([a-z0-9_]+\.)+[a-z0-9_]+$/
    if (!re.test(id))
        return 'ID must match ' + re

    // 如果我 id 以 com 开头该怎么办
    //   —— Simon Shiki
    if (idIgnorePrefix.includes(id.split('.', 2)[0]))
        return 'ID prefix must not in ' + JSON.stringify(idIgnorePrefix)

    return true
}

try {
    {
        const answerLang = await inquirer.prompt([{
            type: 'list',
            name: 'lang',
            message: 'Choose your development language:',
            choices: ['TypeScript', 'JavaScript']
        }
        ])
        useJS = answerLang.lang == 'JavaScript'
    } {
        const answerID = await inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'Extension ID:',
            validate: (id) => checkInputID(id)
        }])
        id = answerID.id;
        [author, extensionName] = id.split('.', 2)
        extensionDir = 'clipcc-extension-' + extensionName
    } {
        const answerDir = await inquirer.prompt([{
            type: 'input',
            name: 'dir',
            message: 'Directory Name:',
            default: extensionDir,
            validate: (v) => (!fs.existsSync(v) || 'Directory exists!')
        }])
        if (answerDir.dir) {
            extensionDir = answerDir.dir
        }
    } {
        const answerAuthor = await inquirer.prompt([{
            type: 'input',
            name: 'author',
            message: 'Author:',
            default: author
        }])
        if (answerAuthor.author) {
            author = answerAuthor.author
        }
    } {
        const answerExtensionName = await inquirer.prompt([{
            type: 'input',
            name: 'extensionName',
            message: 'Extension Name:',
            default: extensionName
        }])
        if (answerExtensionName.extensionName) {
            extensionName = answerExtensionName.extensionName
        }
    }
} catch (e) {
    if (e == 'ExitPromptError: User force closed the prompt with SIGINT') {
        console.error('^C')
        process.exit(1)
    }
    throw e
}


if (extensionDir == '') {
    console.error('Reject.')
    process.exit(1)
}

fs.mkdirSync(extensionDir)

cp('.github')
cp('.vscode')
cp('.gitattributes')
cp('.gitignore')
cp('src-public/assets', 'src/assets')

if (useJS) {
    cp('src-js', 'src')
    cp('makeccx.config.js')
    cp('package-js.json', 'package.json')
} else {
    cp('src-ts', 'src')
    cp('makeccx.config.js', 'makeccx.config.ts')
    cp('package-ts.json', 'package.json')
    cp('tsconfig.json')
    cp('tsconfig.makeccx.json')
    cp('tsconfig.src.json')
}

{
    const lp = leftPath('src-public/info.json')
    const info = JSON.parse(fs.readFileSync(lp).toString())
    info.id = id
    info.author = author

    const rp = rightPath('src/info.json')
    fs.writeFileSync(rp, JSON.stringify(info, null, "    "))
}

fs.mkdirSync(rightPath(`src/locales`))

for (const name of fs.readdirSync(leftPath(`src-public/locales`))) {
    const lp = leftPath(`src-public/locales/${name}`)
    const json = JSON.parse(fs.readFileSync(lp).toString())
    json.name = extensionName

    const rp = rightPath(`src/locales/${name}`)
    fs.writeFileSync(rp, JSON.stringify(json, null, "    "))
}


console.log(`
    cd ${extensionDir}
    npm i
    npm run build
`)
