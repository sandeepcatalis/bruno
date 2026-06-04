"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTools = registerTools;
const list_collections_1 = require("./list-collections");
const list_requests_1 = require("./list-requests");
const read_request_1 = require("./read-request");
const list_environments_1 = require("./list-environments");
const get_environment_1 = require("./get-environment");
const run_request_1 = require("./run-request");
const run_folder_1 = require("./run-folder");
const run_collection_1 = require("./run-collection");
const send_http_1 = require("./send-http");
const import_collection_1 = require("./import-collection");
function registerTools(server) {
    (0, list_collections_1.registerListCollections)(server);
    (0, list_requests_1.registerListRequests)(server);
    (0, read_request_1.registerReadRequest)(server);
    (0, list_environments_1.registerListEnvironments)(server);
    (0, get_environment_1.registerGetEnvironment)(server);
    (0, run_request_1.registerRunRequest)(server);
    (0, run_folder_1.registerRunFolder)(server);
    (0, run_collection_1.registerRunCollection)(server);
    (0, send_http_1.registerSendHttp)(server);
    (0, import_collection_1.registerImportCollection)(server);
}
