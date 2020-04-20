import { executeCommand } from '@gapi/cli-builder';
import { SpawnOptionsWithoutStdio } from 'child_process';

export const Docker = (
  args: string[] = [],
  options?: SpawnOptionsWithoutStdio,
) => executeCommand('docker', args, options);
