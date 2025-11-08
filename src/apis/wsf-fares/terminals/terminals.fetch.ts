import type {
  TerminalMatesInput,
  TerminalsInput,
} from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import { terminalsGroup } from "./terminals.endpoints";

const fetchFunctions = createFetchFunctions(wsfFaresApi, terminalsGroup);

export const fetchTerminalFares: (
  params?: FetchFunctionParams<TerminalsInput>
) => Promise<Terminal[]> = fetchFunctions.fetchTerminalFares;

export const fetchTerminalMatesFares: (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<Terminal[]> = fetchFunctions.fetchTerminalMatesFares;
