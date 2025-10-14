export function allItems(
  entityName: string,
  descriptions: Record<string, string>
): string {
  const baseDescription = descriptions[entityName];
  return `Returns a list of ${entityName} data for all ${getEntityPlural(entityName)}. ${baseDescription}`;
}

export function singleItem(
  entityName: string,
  descriptions: Record<string, string>
): string {
  const baseDescription = descriptions[entityName];
  return `Returns ${entityName} data for the ${getEntityName(entityName)} with the given identifier. ${baseDescription}`;
}

export function filteredItems(
  entityName: string,
  descriptions: Record<string, string>,
  filters: string
): string {
  const baseDescription = descriptions[entityName];
  return `Returns a list of ${entityName} data for all ${getEntityPlural(entityName)}, filtered by ${filters}. ${baseDescription}`;
}

// Helper functions
function getEntityPlural(entityName: string): string {
  // Simple pluralization - can be enhanced
  if (
    entityName.endsWith("s") ||
    entityName.endsWith("sh") ||
    entityName.endsWith("ch") ||
    entityName.endsWith("x") ||
    entityName.endsWith("z")
  ) {
    return entityName + "es";
  } else if (entityName.endsWith("y")) {
    return entityName.slice(0, -1) + "ies";
  } else {
    return entityName + "s";
  }
}

function getEntityName(entityName: string): string {
  // Convert entity type to readable name
  return entityName.toLowerCase();
}
