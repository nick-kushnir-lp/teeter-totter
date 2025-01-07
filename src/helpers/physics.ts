import { MAX_BEND_PERCENTAGE, MAX_TORQUE_DIFFERENCE } from '@/constants/teeterConstants';
import { ObjectShape } from '@/enums/ObjectShape';

export interface ITeeterObject {
  id: number;
  shape: ObjectShape;
  weight: number; // 1-10
  xPosition: number;
  yPosition: number;
}

export function computeTorque(objects: ITeeterObject[]): number {
  return objects.reduce((total, obj) => total + (obj.weight * Math.abs(obj.xPosition)), 0);
}

export function torqueDifference(
  left: ITeeterObject[],
  right: ITeeterObject[]
): number {
  const leftTorque = computeTorque(left);
  const rightTorque = computeTorque(right);
  return leftTorque - rightTorque;
}

// convert torque difference to bending ratio in [-0.3, 0.3]
export function computeBendingPercentage(td: number): number {
  const ratio = td / MAX_TORQUE_DIFFERENCE;     // from -1 to 1 if td in ±20
  const bending = ratio * MAX_BEND_PERCENTAGE;  // map to ±0.3
  return Math.max(-MAX_BEND_PERCENTAGE, Math.min(bending, MAX_BEND_PERCENTAGE));
}
