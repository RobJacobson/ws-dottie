import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalBulletinsResource } from "./terminalBulletins.endpoints";
import type {
  TerminalBulletinsByIdInput,
  TerminalBulletinsInput,
} from "./terminalBulletins.input";
import type { TerminalBulletin } from "./terminalBulletins.output";

const fetchFunctions = createFetchFunctions(
  wsfTerminalsApi,
  terminalBulletinsResource
);

export const fetchTerminalBulletins: (
  params?: FetchFunctionParams<TerminalBulletinsInput>
) => Promise<TerminalBulletin[]> = fetchFunctions.fetchTerminalBulletins;

export const fetchTerminalBulletinsByTerminalId: (
  params?: FetchFunctionParams<TerminalBulletinsByIdInput>
) => Promise<TerminalBulletin> =
  fetchFunctions.fetchTerminalBulletinsByTerminalId;
