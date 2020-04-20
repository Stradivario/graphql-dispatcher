/// <reference types="node" />
import { GraphQLObjectType } from 'graphql';
import { StartDockerArguments } from './runners/vscode';
export declare const GenericCommandType: GraphQLObjectType<any, any, {
    [key: string]: any;
}>;
export declare class AppController {
    stoppedListener: NodeJS.Timeout;
    startVsCode(root: any, args: StartDockerArguments): Promise<import("@gapi/cli-builder").ProcessReturn>;
    stopVsCode(root: any, { specifier }: {
        specifier: any;
    }): Promise<import("@gapi/cli-builder").ProcessReturn>;
}
