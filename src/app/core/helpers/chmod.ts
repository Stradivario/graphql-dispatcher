import { executeCommand } from './execute';

export const Chmod = (args: string[] = []) => {
  return executeCommand('chmod', args);
};
