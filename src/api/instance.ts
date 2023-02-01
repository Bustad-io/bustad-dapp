import axios from "axios";
import { GetConfig } from "../config";
import { NetworkTypes } from "../features/wallet/walletSlice";

export const apiInstance = axios.create();

export function changeBaseUrl(network: NetworkTypes) {
    const config = GetConfig(network);
    apiInstance.defaults.baseURL = config.ServiceBaseUri;    
}