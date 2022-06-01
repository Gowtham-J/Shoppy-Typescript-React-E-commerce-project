export const formatPrice = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data: any, type: string) => {
  let unique = data.map((item: any) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }
  const sortingProperties: any[] = Array.from(new Set(unique));
  // return ["all", Array.from(new Set(unique))];
  const all = ["all"];
  return all.concat(sortingProperties);
};
