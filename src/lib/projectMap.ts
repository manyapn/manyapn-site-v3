import CheckpointWriteup from "@/content/projects/checkpoint";
import TandemWriteup from "@/content/projects/tandem";
import MeJsonWriteup from "@/content/projects/me-json";
import PaperDiffWriteup from "@/content/projects/paperdiff";
import TinyHabitCoachWriteup from "@/content/projects/tiny-habit-coach";
import SymbolicEquationSolverWriteup from "@/content/projects/symbolic-equation-solver";

/** Keyed by project id. A project with `writeup: true` must have an entry here. */
export const projectMap: Record<string, React.ComponentType> = {
  checkpoint: CheckpointWriteup,
  tandem: TandemWriteup,
  "me-json": MeJsonWriteup,
  paperdiff: PaperDiffWriteup,
  "tiny-habit-coach": TinyHabitCoachWriteup,
  "symbolic-equation-solver": SymbolicEquationSolverWriteup,
};
