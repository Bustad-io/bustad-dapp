import { apiInstance } from './instance';
import { Incentive } from '../types/IncentiveType';

export function getAllIncentives() {
    return apiInstance.get<Incentive[]>(`/Incentive/GetAll`);
}

export function postIncentive(data: Incentive) {
    return apiInstance.post<Incentive>('/Incentive/Add', data);
}

export function endIncentive(id: number) {
    return apiInstance.put(`/Incentive/End?id=${id}`);
}