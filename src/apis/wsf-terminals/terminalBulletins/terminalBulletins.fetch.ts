import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalBulletinsResource } from "./terminalBulletins.endpoints";
import type {
  TerminalBulletinsByIdInput,
  TerminalBulletinsInput,
} from "./terminalBulletins.input";
import type { TerminalBulletin } from "./terminalBulletins.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfTerminalsApi,
  terminalBulletinsResource
);

export const fetchTerminalBulletins = fetchFunctions.fetchTerminalBulletins as (
  params?: FetchFunctionParams<TerminalBulletinsInput>
) => Promise<TerminalBulletin[]>;

export const fetchTerminalBulletinsByTerminalId =
  fetchFunctions.fetchTerminalBulletinsByTerminalId as (
    params?: FetchFunctionParams<TerminalBulletinsByIdInput>
  ) => Promise<TerminalBulletin>;
