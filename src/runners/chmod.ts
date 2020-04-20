import { executeCommand } from '@gapi/cli-builder';
import { SpawnOptionsWithoutStdio } from 'child_process';

export const Chmod = (
  args: string[] = [],
  options?: SpawnOptionsWithoutStdio,
) => executeCommand('chmod', args, options);
