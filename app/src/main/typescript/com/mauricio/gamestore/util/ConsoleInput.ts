import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

let lineIterator: AsyncIterableIterator<string> | null = null;

function getLineIterator(): AsyncIterableIterator<string> {
    if (lineIterator == null) {
        const rl = readline.createInterface({ input, output, terminal: false });
        lineIterator = rl[Symbol.asyncIterator]();
    }
    return lineIterator;
}

export async function readLine(prompt: string): Promise<string> {
    output.write(prompt);
    const result = await getLineIterator().next();
    return result.value ?? '';
}
