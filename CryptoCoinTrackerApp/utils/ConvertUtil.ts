export const convertKeyValueData = (data: {
  [key: string]: number;
}): { label: string; value: number }[] => {
  const resultArray: { label: string; value: number }[] = [];

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const typeScriptObject: { label: string; value: number } = {
        label: key,
        value: data[key],
      };

      resultArray.push(typeScriptObject);
    }
  }

  return resultArray;
};
