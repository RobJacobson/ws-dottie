import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalBulletinsResource } from "./terminalBulletins.endpoints";
import * as fetchFunctions from "./terminalBulletins.fetch";
import type {
  TerminalBulletinsByIdInput,
  TerminalBulletinsInput,
} from "./terminalBulletins.input";
import type { TerminalBulletin } from "./terminalBulletins.output";

const hooks = createHooks(
  wsfTerminalsApi,
  terminalBulletinsResource,
  fetchFunctions
);

export const useTerminalBulletins: (
  params?: FetchFunctionParams<TerminalBulletinsInput>,
  options?: QueryHookOptions<TerminalBulletin[]>
) => UseQueryResult<TerminalBulletin[], Error> = hooks.useTerminalBulletins;

export const useTerminalBulletinsByTerminalId: (
  params?: FetchFunctionParams<TerminalBulletinsByIdInput>,
  options?: QueryHookOptions<TerminalBulletin>
) => UseQueryResult<TerminalBulletin, Error> =
  hooks.useTerminalBulletinsByTerminalId;
