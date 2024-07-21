type Item = {
  id: number;
  name: string;
  featured: boolean;
  bestSelling: number;
  price: number;
  date: string;
};

export const sortItems = (items: Item[], sortType: string): Item[] => {
  const sortedItems = [...items];
  switch (sortType) {
    case "featured":
      sortedItems.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
    case "bestSelling":
      sortedItems.sort((a, b) => b.bestSelling - a.bestSelling);
      break;
    case "alphabeticalAZ":
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "alphabeticalZA":
      sortedItems.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "priceHighToLow":
      sortedItems.sort((a, b) => b.price - a.price);
      break;
    case "priceLowToHigh":
      sortedItems.sort((a, b) => a.price - b.price);
      break;
    case "dateNewToOld":
      sortedItems.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      break;
    case "dateOldToNew":
      sortedItems.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      break;
    default:
      break;
  }
  return sortedItems;
};
