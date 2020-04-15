/// <reference types="node" />
import { GraphQLObjectType } from 'graphql';
export declare const executeCommand: (command: string, args?: string[]) => Promise<unknown>;
export declare const Docker: (args?: string[]) => Promise<unknown>;
export declare const MakeDir: (args?: string[]) => Promise<unknown>;
export declare const Chmod: (args?: string[]) => Promise<unknown>;
export declare const GenericCommandType: GraphQLObjectType<any, any, {
    [key: string]: any;
}>;
export declare class AppController {
    stoppedListener: NodeJS.Timeout;
    stopDocker(): Promise<unknown>;
    startDocker(root: any, { name, ports, password, folder, force, }: {
        ports: string[];
        name: string;
        password: string;
        folder: string;
        force: boolean;
    }): Promise<unknown>;
    psDocker(): Promise<unknown>;
    rmDocker(root: any, { imageId }: {
        imageId: any;
    }): Promise<unknown>;
    destroyServer(): {
        data: string;
    };
}
