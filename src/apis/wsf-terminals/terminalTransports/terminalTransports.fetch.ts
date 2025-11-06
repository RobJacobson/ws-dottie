import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalTransportsResource } from "./terminalTransports.endpoints";
import type {
  TerminalTransportsByTerminalIdInput,
  TerminalTransportsInput,
} from "./terminalTransports.input";
import type { TerminalTransport } from "./terminalTransports.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfTerminalsApi,
  terminalTransportsResource
);

export const fetchTerminalTransports =
  fetchFunctions.fetchTerminalTransports as (
    params?: FetchFunctionParams<TerminalTransportsInput>
  ) => Promise<TerminalTransport[]>;

export const fetchTerminalTransportsByTerminalId =
  fetchFunctions.fetchTerminalTransportsByTerminalId as (
    params?: FetchFunctionParams<TerminalTransportsByTerminalIdInput>
  ) => Promise<TerminalTransport>;
