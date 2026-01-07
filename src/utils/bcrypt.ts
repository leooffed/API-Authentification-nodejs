import bcrypt from "bcrypt"

export const hashValue = async (value: string, saltRound?: number) => bcrypt.hash(value, saltRound || 10);

export const compareValue = async (value: string, hasheValue: string) => bcrypt.compare(value, hasheValue).catch(() => false);