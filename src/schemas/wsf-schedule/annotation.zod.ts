import { z } from "zod";

/**
 * Schema for annotation response from WSF Schedule API.
 * Informational attributes associated with the terminal time.
 */
export const annotationSchema = z.object({
  /** Unique identifier for an annotation. */
  AnnotationID: z
    .number()
    .int()
    .describe("Unique identifier for an annotation."),
  /** The descriptive content of the annotation. */
  AnnotationText: z
    .string()
    .describe("The descriptive content of the annotation."),
  /** The descriptive content of the annotation formatted for IVR. */
  AnnotationIVRText: z
    .string()
    .describe("The descriptive content of the annotation formatted for IVR."),
  /** Adjusted crossing time in minutes. Present when the annotation requires an override of the CrossingTime value found in route details. */
  AdjustedCrossingTime: z
    .number()
    .int()
    .nullable()
    .describe(
      "Adjusted crossing time in minutes. Present when the annotation requires an override of the CrossingTime value found in route details."
    ),
  /** A URL to an image that can be used to graphically represent this annotation. */
  AnnotationImg: z
    .string()
    .describe(
      "A URL to an image that can be used to graphically represent this annotation."
    ),
  /** A logical grouping for the annotation (Day Type, Informational, etc). */
  TypeDescription: z
    .string()
    .describe(
      "A logical grouping for the annotation (Day Type, Informational, etc)."
    ),
  /** A preferred sort order (sort-ascending with respect to other annotations). */
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other annotations)."
    ),
});

export type Annotation = z.infer<typeof annotationSchema>;

/**
 * Array of annotations.
 */
export const annotationsArraySchema = z
  .array(annotationSchema)
  .describe("Informational attributes associated with the terminal time.");

export type AnnotationsArray = z.infer<typeof annotationsArraySchema>;
