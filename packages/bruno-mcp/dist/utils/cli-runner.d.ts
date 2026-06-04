export declare const MAX_BODY_SIZE: number;
export interface CliOptions {
    environment?: string;
    envVars?: Record<string, string>;
    recursive?: boolean;
    tags?: string;
    excludeTags?: string;
    sandbox?: string;
    bail?: boolean;
    insecure?: boolean;
    delay?: number;
}
export declare function buildCliArgs(reqPath: string, opts: CliOptions): string[];
export declare function runCli(args: string[], cwd: string): Promise<{
    stdout: string;
    stderr: string;
    exitCode: number;
}>;
export declare function formatResultEntry(result: any): string[];
export declare function formatResults(results: any): string;
export declare function executeRun(args: string[], workspace: string): Promise<{
    content: Array<{
        type: 'text';
        text: string;
    }>;
    isError?: boolean;
}>;
//# sourceMappingURL=cli-runner.d.ts.map