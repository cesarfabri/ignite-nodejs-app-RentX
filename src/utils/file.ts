import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    // verifica se existe
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  // apaga o arquivo
  await fs.promises.unlink(filename);
};
