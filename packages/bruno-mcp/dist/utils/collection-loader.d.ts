export declare function getCollectionFormat(collectionPath: string): string | null;
export declare function resolveWorkspace(): string;
export interface CollectionInfo {
    name: string;
    path: string;
    format: string;
    requestCount: number;
}
export declare function discoverCollections(workspacePath: string): CollectionInfo[];
export interface RequestInfo {
    name: string;
    filename: string;
    path: string;
    relativePath: string;
    method?: string;
    url?: string;
    type?: string;
    seq?: number;
    tags?: string[];
}
export declare function listRequests(collectionPath: string, subPath?: string, recursive?: boolean): RequestInfo[];
export interface EnvironmentInfo {
    name: string;
    path: string;
    variables: Array<{
        name: string;
        value: string;
        enabled: boolean;
        secret: boolean;
    }>;
}
export declare function listEnvironments(collectionPath: string): EnvironmentInfo[];
export declare function readRequestFile(filePath: string): string | null;
//# sourceMappingURL=collection-loader.d.ts.map