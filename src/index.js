
import {o} from "atp-sugar";

class Config {
    constructor() {
        this.defaults = {};
        this.values = {};
        this.finalValues = {};
    }

    setDefaults(values) {
        this.defaults = o(this.defaults).merge(values).raw;
        this.finalValues = o(this.defaults).merge(this.values).raw;
    }

    setValues(values) {
        this.values = o(this.values).merge(values).raw;
        this.finalValues = o(this.defaults).merge(this.values).raw;
    }

    get(path) {
        try {
            return this._get(path, this.finalValues);
        } catch (e) {
            throw e + " while trying to fetch config path " + path;
        }
    }

    isset(path) {
        try {
            const temp = this.get(path);
            return true;
        } catch(e) {
            return false;
        }
    }

    _get(path, values) {
        if(path.length === 0) {
            return values;
        }

        let pathParts = path.split(".");
        const node = pathParts.shift();

        if(typeof values[node] === 'undefined') {
            throw "Missing config value " + node;
        }

        return this._get(pathParts.join("."), values[node]);
    }
}

const config = new Config();
export default config;