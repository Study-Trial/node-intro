import { readFile, writeFile } from 'node:fs/promises';
import config from 'config';

const inputFile = config.get<{path: string, name: string}>('inputFile');
const outputCode = config.get<{path: string, name: string}>('outputCode');
const outputComments = config.get<{path: string, name: string}>('outputComments');

async function printFile(name: string) {
    return await readFile(`${inputFile.path}/${name}`, {encoding: "utf8"});
    
}
async function writeToFile(name: string, content: string) {
    writeFile(`${outputCode.path}/${name}`, content);
}
async function splitCommentsAndCode(lines: string[]) {
    const comments = [];
    const code = [];
    lines.map(line => {
        if (line.includes("//")) {
            const start = line.indexOf("//");
            const cutLine = line.slice(start);
            const restLine = line.slice(0, start);
            comments.push(cutLine + '\n');
            if (restLine.length > 0) {
                code.push(restLine + '\n');
            }
        } else {
            code.push(line + '\n');
        }
    })
    return { comments, code };
}

(async () => {
    const content = await printFile(inputFile.name)
    const lines = content.split('\n')
    const { comments, code } = await splitCommentsAndCode(lines)
    await writeToFile(outputCode.name, code.join(""))
    await writeToFile(outputComments.name, comments.join(""))
})();