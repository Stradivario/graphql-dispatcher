export interface StartDockerArguments {
    specifier: string;
    folder: string;
    password: string;
    ports: string[];
    force?: boolean;
    image?: string;
}
export declare function StopVsCode(specifier: string): Promise<import("@gapi/cli-builder").ProcessReturn>;
export declare function StartVsCode({ folder, force, password, ports, specifier, image, }?: StartDockerArguments): Promise<import("@gapi/cli-builder").ProcessReturn>;
