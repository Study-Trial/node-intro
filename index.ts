import { readFile, writeFile } from 'node:fs/promises';
import config from 'config';

const inputFile = config.get<{ path: string, name: string }>('inputFile');
const outputCode = config.get<{ path: string, name: string }>('outputCode');
const outputComments = config.get<{ path: string, name: string }>('outputComments');

async function readInputFile(name: string) {
    return readFile(`${inputFile.path}/${name}`, { encoding: "utf8" });
}

async function writeToFile(name: string, content: string) {
    writeFile(`${outputCode.path}/${name}`, content);
}

function splitCommentsAndCode(lines: string[]) {
    const comments = [];
    const code = [];
    lines.reduce((acc, line) => {
        const start = line.indexOf("//");
        if (start > -1) {
            const cutLine = line.slice(start);
            const restLine = line.slice(0, start);
            comments.push(cutLine + '\n');
            if (restLine.length > 0) {
                code.push(restLine + '\n');
            }
        } else {
            code.push(line + '\n');
        }
        return acc;
    }, { comments: [], code: [] });
    return { comments, code };
}

(async () => {
    try {
        const content = await readInputFile(inputFile.name)
        const lines = content.split('\n')
        const { comments, code } = splitCommentsAndCode(lines)
        await Promise.all([
            writeToFile(outputCode.name, code.join("")),
            writeToFile(outputComments.name, comments.join(""))
        ])
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
    }
})();