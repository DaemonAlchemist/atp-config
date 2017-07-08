/**
 * Created by Andrea on 5/17/2017.
 */

import {o} from "atp-sugar";

import overrides from "config/overrides";

class Config {
    constructor() {
        this.defaults = {};
        this.values = overrides;
        this.finalValues = overrides;
    }

    setDefaults(values) {
        this.defaults = o(this.defaults).merge(values).raw;
    }

    setValues(values) {
        this.values = o(this.values).merge(values).raw;
        this.finalValues = o(this.defaults).merge(this.values).raw;
    }

    get(path) {
        return this._get(path, this.finalValues);
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