import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useTerminalBulletins = hooks.useTerminalBulletins as (
  params?: TerminalBulletinsInput,
  options?: QueryHookOptions<TerminalBulletin[]>
) => UseQueryResult<TerminalBulletin[], Error>;

export const useTerminalBulletinsByTerminalId =
  hooks.useTerminalBulletinsByTerminalId as (
    params?: TerminalBulletinsByIdInput,
    options?: QueryHookOptions<TerminalBulletin>
  ) => UseQueryResult<TerminalBulletin, Error>;
