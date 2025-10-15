import type { z } from "zod";
import { cameraBaseSchema } from "../shared/cameraBaseSchema";

export const cameraSchema = cameraBaseSchema;

export type Camera = z.infer<typeof cameraSchema>;
