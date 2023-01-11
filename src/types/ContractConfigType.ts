interface ContractConfigProperty {
    address: string;
    label: string;
    decimal?: number;

}

export interface ContractConfig {
    [key: string]: ContractConfigProperty;    
}