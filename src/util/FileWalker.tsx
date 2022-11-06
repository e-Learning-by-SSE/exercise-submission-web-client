import path from 'path';
import fs, {Dirent} from 'fs';

export default function* walk(path:string):IterableIterator<string> {

    const entries:Dirent[] = fs.readdirSync(path, {withFileTypes: true});

    for (const entry of entries) {
        const entryPath:() => string = () => `${path}/${entry.name}`;

        if (entry.isFile()) {
            yield entryPath();
        }

        if (entry.isDirectory()) {
            yield* walk(entryPath());
        }
    }
}