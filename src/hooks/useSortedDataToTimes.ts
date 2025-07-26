import { useMemo } from "react";

type DataProps = {
  createdAt: string;
};

export const useSortedDataToTimes = (data: DataProps[] | null | undefined): any[] => {
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const sortedResult = [...data].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : NaN;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : NaN;

      if (isNaN(dateA) || isNaN(dateB)) {
        return 0;
      } 
      if (isNaN(dateA)) {
        return 1; 
      }
      if (isNaN(dateB)) {
        return -1; 
      }
      return dateB - dateA;
    });
    return sortedResult;
  }, [data]);
  return sortedData;
}