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
