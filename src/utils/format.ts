import { BigNumberish, ethers } from "ethers";

export function toEther(weiValue: BigNumberish): string {
  return ethers.utils.formatEther(weiValue);
}

export function fromEther(etherValue: number): BigNumberish {
  return ethers.utils.parseEther(etherValue.toString());
}

export function parseToNumber(weiValue: BigNumberish) {
  return Number(toEther(weiValue));  
}

export function formatUnitToNumber(weiValue: BigNumberish, decimal: number) {
  return Number(ethers.utils.formatUnits(weiValue, decimal));
}

export function parseUnitsFromNumber(value: number, decimal: number) {
  return Number(ethers.utils.parseUnits(value.toString(), decimal));
}

export function parseUnits(value: string, decimal: number) {
  return Number(ethers.utils.parseUnits(value, decimal));
}
