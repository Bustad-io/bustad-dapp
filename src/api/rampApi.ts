import { apiInstance } from './instance';
import { RampPurchaseStatus } from '../types/RampPurchaseStatus';

export function getRampPurchaseStatus(userAddress: string, rampPurchaseId: string) {
    return apiInstance.get<RampPurchaseStatus>(`/Ramp/GetRampPurchaseStatus?userAddress=${userAddress}&rampPurchaseId=${rampPurchaseId}`);
}