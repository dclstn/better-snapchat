import { v4 as uuidv4 } from 'uuid';

export function generateTagName(): string {
  const prefix = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  return `${prefix}${uuidv4()}`;
}
