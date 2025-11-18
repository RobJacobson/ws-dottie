import { BaseSequencer, type TestSpecification } from "vitest/node";

/**
 * Custom sequencer that runs test files in alphabetical order
 */
export default class AlphabeticalSequencer extends BaseSequencer {
  async sort(files: TestSpecification[]): Promise<TestSpecification[]> {
    // Sort test files alphabetically by moduleId (file path)
    return files.sort((a, b) => a.moduleId.localeCompare(b.moduleId));
  }
}
