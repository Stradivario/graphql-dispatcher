/// <reference types="node" />
import { SpawnOptionsWithoutStdio } from 'child_process';
export declare const Docker: (args?: string[], options?: SpawnOptionsWithoutStdio) => Promise<import("@gapi/cli-builder").ProcessReturn>;
