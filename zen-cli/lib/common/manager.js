"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependencies = exports.hasYarn = void 0;
const execa_1 = __importDefault(require("execa"));
const consola_1 = __importDefault(require("consola"));
const child_process_1 = require("child_process");
let hasYarnCache;
function hasYarn() {
    if (hasYarnCache === undefined) {
        try {
            child_process_1.execSync('yarn --version', { stdio: 'ignore' });
            hasYarnCache = true;
        }
        catch (e) {
            hasYarnCache = false;
        }
    }
    return hasYarnCache;
}
exports.hasYarn = hasYarn;
async function installDependencies() {
    consola_1.default.info('Install Dependencies\n');
    try {
        const manager = hasYarn() ? 'yarn' : 'npm';
        await execa_1.default(manager, ['install', '--prod=false'], {
            stdio: 'inherit'
        });
    }
    catch (err) {
        consola_1.default.log(err);
        throw err;
    }
}
exports.installDependencies = installDependencies;
