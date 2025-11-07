import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalBulletinsResource } from "./terminalBulletins.endpoints";
import * as fetchFunctions from "./terminalBulletins.fetch";
import type {
  TerminalBulletinsByIdInput,
  TerminalBulletinsInput,
} from "./terminalBulletins.input";
import type { TerminalBulletin } from "./terminalBulletins.output";

const hooks = createEndpointGroupHooks(
  wsfTerminalsApi,
  terminalBulletinsResource,
  fetchFunctions
);

export const useTerminalBulletins: (
  params?: TerminalBulletinsInput,
  options?: QueryHookOptions<TerminalBulletin[]>
) => UseQueryResult<TerminalBulletin[], Error> = hooks.useTerminalBulletins;

export const useTerminalBulletinsByTerminalId: (
  params?: TerminalBulletinsByIdInput,
  options?: QueryHookOptions<TerminalBulletin>
) => UseQueryResult<TerminalBulletin, Error> = hooks.useTerminalBulletinsByTerminalId;
