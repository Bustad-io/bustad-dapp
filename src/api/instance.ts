import axios from "axios";
import { ServiceBaseUri } from "../config";

export const apiInstance = axios.create({
    baseURL: ServiceBaseUri
});