import { executeCommand } from './execute';

export const Docker = (args: string[] = []) => {
  return executeCommand('docker', args);
};
