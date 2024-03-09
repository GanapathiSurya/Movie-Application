import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'maxValue', async: false })
export class MaxValueConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const maxValue = args.constraints[0];
    return value <= maxValue;
  }

  defaultMessage(args: ValidationArguments) {
    return `Value cannot exceed ${args.constraints[0]}`;
  }
}
