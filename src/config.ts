import * as dotenv from 'dotenv';
import { argv } from 'yargs';

dotenv.config();

const DEFAULT_PATH = './src/components';
const destination: string = (argv.p as string) || DEFAULT_PATH;

export { destination };
