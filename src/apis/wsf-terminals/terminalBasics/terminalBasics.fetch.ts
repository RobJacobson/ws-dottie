import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalBasicsResource } from "./terminalBasics.endpoints";
import type {
  TerminalBasicsByIdInput,
  TerminalBasicsInput,
} from "./terminalBasics.input";
import type { TerminalBasic } from "./terminalBasics.output";

const fetchFunctions = createFetchFunctions(
  wsfTerminalsApi,
  terminalBasicsResource
);

export const fetchTerminalBasics: (
  params?: FetchFunctionParams<TerminalBasicsInput>
) => Promise<TerminalBasic[]> = fetchFunctions.fetchTerminalBasics;

export const fetchTerminalBasicsByTerminalId: (
  params?: FetchFunctionParams<TerminalBasicsByIdInput>
) => Promise<TerminalBasic> = fetchFunctions.fetchTerminalBasicsByTerminalId;
