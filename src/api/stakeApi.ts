import { apiInstance } from './instance';
import { UserStake } from '../types/UserStakeType';


export function postUserStake(data: UserStake) {    
    return apiInstance.post<UserStake>('/UserStake/Add', data);
}

export function setToUnstaked(tokenId: Number, incentiveId: Number) {    
    return apiInstance.put(`/UserStake/SetToUnstake`, {tokenId, incentiveId});
}

export function getUserStake(address: string) {    
    return apiInstance.get<UserStake[]>(`/UserStake/GetByAddress/${address}`);
}