import { capitalize } from "@framework/utils/namings/capitalize";

export const getEventMethodName = name => `on${capitalize(name)}`;
