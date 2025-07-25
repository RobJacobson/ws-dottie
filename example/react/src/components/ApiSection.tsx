import type { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";

import ApiDataDisplay from "@/components/ApiDataDisplay";
import type { ApiItem } from "@/types/api";

type ApiSectionProps = {
  title: string;
  description: string;
  query: UseQueryResult<ApiItem[], Error>;
  getItemName: (item: ApiItem) => string;
  getItemId: (item: ApiItem) => string | number;
};

const ApiSection = ({ 
  title, 
  description, 
  query, 
  getItemName, 
  getItemId 
}: ApiSectionProps) => {
  const [selectedItem, setSelectedItem] = useState<ApiItem | null>(null);

  return (
    <ApiDataDisplay
      title={title}
      description={description}
      data={query.data}
      isLoading={query.isLoading}
      error={query.error}
      selectedItem={selectedItem}
      onItemSelect={setSelectedItem}
      items={query.data}
      getItemName={getItemName}
      getItemId={getItemId}
    />
  );
};

export default ApiSection; 