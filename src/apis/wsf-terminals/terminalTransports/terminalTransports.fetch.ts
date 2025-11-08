import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalTransportsResource } from "./terminalTransports.endpoints";
import type {
  TerminalTransportsByTerminalIdInput,
  TerminalTransportsInput,
} from "./terminalTransports.input";
import type { TerminalTransport } from "./terminalTransports.output";

const fetchFunctions = createFetchFunctions(
  wsfTerminalsApi,
  terminalTransportsResource
);

export const fetchTerminalTransports: (
  params?: FetchFunctionParams<TerminalTransportsInput>
) => Promise<TerminalTransport[]> = fetchFunctions.fetchTerminalTransports;

export const fetchTerminalTransportsByTerminalId: (
  params?: FetchFunctionParams<TerminalTransportsByTerminalIdInput>
) => Promise<TerminalTransport> =
  fetchFunctions.fetchTerminalTransportsByTerminalId;
