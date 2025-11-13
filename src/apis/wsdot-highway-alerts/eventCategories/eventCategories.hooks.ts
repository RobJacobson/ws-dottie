import { fetchEventCategories } from "./eventCategories.endpoints";

export const useEventCategories = fetchEventCategories.useQuery;
