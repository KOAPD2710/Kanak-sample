import { atom } from 'nanostores';

/**
 * Chứa state dùng chung nhiều nơi.
 * @param {*} props
 * @returns
 */

export const productIndex = atom(0);
export const prevProductIndex = atom(0);
