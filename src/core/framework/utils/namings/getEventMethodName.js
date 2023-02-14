import { capitalize } from "./capitalize";

export const getEventMethodName = name => `on${capitalize(name)}`;
