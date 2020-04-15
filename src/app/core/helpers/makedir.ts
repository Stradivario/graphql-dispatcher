import { executeCommand } from './execute';

export const MakeDir = (args: string[] = []) => {
  return executeCommand('mkdir', args);
};
