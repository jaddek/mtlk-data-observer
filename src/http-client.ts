import {MetlinkHttpClientBuilder, MetlinkHttpClientInterface} from "metlink-api-http-client";

class MetlinkHttpClient {
    private static instance: MetlinkHttpClient

    public static getInstance(token:string): MetlinkHttpClientInterface {
        if (!MetlinkHttpClient.instance) {
            MetlinkHttpClient.instance = MetlinkHttpClientBuilder.buildWithAxios(token);
        }

        return <MetlinkHttpClientInterface>MetlinkHttpClient.instance;
    }
}

export function getMetlinkHttpClient(): MetlinkHttpClientInterface {
    if (!process.env.METLINK_TOKEN) {
        throw new Error("Env variable METLINK_TOKEN should be set");
    }

    return MetlinkHttpClient.getInstance(process.env.METLINK_TOKEN);
}