export const getUniqueAndSorted = <T,>(
  items: T[] | undefined,
  getProperty: (item: T) => string,
  orderArray: string[]
) => {
  return Array.from(new Set((items || []).map(getProperty))).sort((a, b) => {
    const indexA = orderArray.indexOf(a);
    const indexB = orderArray.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};
