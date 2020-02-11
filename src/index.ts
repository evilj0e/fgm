import { Client } from 'figma-js';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

import { destination } from './config';
import { getCombinedName } from './utils';

const createDestinationDirectory = (destination: string): Promise<any> => {
  return new Promise(resolve => {
    if (!fs.existsSync(destination)) {
      fs.mkdir(destination, { recursive: true }, resolve);
    } else {
      resolve();
    }
  });
};

const getClient = () =>
  Client({
    personalAccessToken: process.env.FIGMA_ACCESS_TOKEN
  });

const getFileData = async () => {
  const fileData = await getClient().file(process.env.FIGMA_FILE_ID);

  return fileData;
};

const getComponents = async () => {
  const client = getClient();
  const fileData = await getFileData();
  const { components } = fileData.data;
  const ids = Object.keys(components);
  const {
    data: { images }
  } = await client.fileImages(process.env.FIGMA_FILE_ID, { ids });

  Object.keys(images).forEach(async key => {
    const { data } = await axios.get(images[key], {
      responseType: 'arraybuffer'
    });
    const combinedName = getCombinedName(components[key].name);
    const componentDirectory = path.join(destination, combinedName);
    const componentFile = path.join(componentDirectory, `${combinedName}.png`);

    await createDestinationDirectory(componentDirectory);

    console.log(componentFile);

    fs.writeFileSync(componentFile, data);
  });
};

getComponents();
