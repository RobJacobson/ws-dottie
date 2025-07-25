import type { UseQueryResult } from "@tanstack/react-query";

import ApiDataDisplay from "@/components/ApiDataDisplay";
import type { ApiItem } from "@/types/api";

type SingleItemApiSectionProps<T = ApiItem> = {
  title: string;
  description: string;
  query: UseQueryResult<T | null, Error>;
  transformData?: (data: T) => ApiItem;
};

const SingleItemApiSection = <T = ApiItem>({ 
  title, 
  description, 
  query, 
  transformData 
}: SingleItemApiSectionProps<T>) => {
  const displayData = query.data ? (transformData ? transformData(query.data) : query.data as ApiItem) : null;

  return (
    <ApiDataDisplay
      title={title}
      description={description}
      data={displayData}
      isLoading={query.isLoading}
      error={query.error}
    />
  );
};

export default SingleItemApiSection; 