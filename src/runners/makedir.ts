import { executeCommand } from '@gapi/cli-builder';
import { SpawnOptionsWithoutStdio } from 'child_process';

export const MakeDir = (
  args: string[] = [],
  options?: SpawnOptionsWithoutStdio,
) => executeCommand('mkdir', args, options);
