export const getBooleanValue = (value: string): boolean | string => {
  const falseValue = value === 'false' ? false : value;
  return value === 'true' ? true : falseValue;
};
