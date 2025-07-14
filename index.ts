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
(async () => {
    const content = await printFile(inputFile.name)
    const lines = content.split('\n')
    const comments = lines.map(line => {
        const start = line.indexOf("//");
        const end = line.indexOf("\n");
        const linebreak = line.includes("//") ? '\n' : '';
        return line.slice(start, end) + linebreak
    }).join("")
    const code = lines.map(line => {
        const start = 0;
        const end = line.indexOf("//") === -1 ? line.indexOf("\n") : line.indexOf("//");
        const linebreak = !line.includes("//") ? '\n' : '';
        return line.slice(start, end) + linebreak
    }).join("")

    await writeToFile(outputCode.name, code)
    await writeToFile(outputComments.name, comments)
})();