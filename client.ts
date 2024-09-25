import {MetlinkHttpClientBuilder} from "metlink-api-http-client";
import * as fs from 'fs'

export function getHttpClient() {
    const token: string = fs.readFileSync(".token", 'utf-8');

    return MetlinkHttpClientBuilder.buildWithAxios(token)
}

