import axios from 'axios';
import { CreateIncentiveForm } from '../features/admin/adminSlice';
import { apiInstance } from './instance';
import { Incentive } from '../types/IncentiveType';

export function getAllIncentives() {
    return apiInstance.get<Incentive[]>(`/GetAll`);
}

export function postIncentive(data: Incentive) {
    return apiInstance.post<Incentive>('/Add', data);
}

export function endIncentive(id: number) {
    return apiInstance.put(`/End?id=${id}`);
}