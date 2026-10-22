import ClaudeVoiceSkillFull from "@/content/posts/claude-voice-skill/full";
import ChapterThingsToKeepInMind from "@/content/posts/255-days-later/things-to-keep-in-mind";
import ChapterBuildingACollegeList from "@/content/posts/255-days-later/building-a-college-list";
import ChapterBuildingYourApplication from "@/content/posts/255-days-later/building-your-application";
import ChapterAfterYouSubmit from "@/content/posts/255-days-later/after-you-submit";
import ChapterDecisions from "@/content/posts/255-days-later/decisions";
import ChapterAndItsOver from "@/content/posts/255-days-later/and-its-over";
import RedesigningFull from "@/content/posts/redesigning-my-portfolio/full";

export const contentMap: Record<string, React.ComponentType> = {
  "claude-voice-skill/full": ClaudeVoiceSkillFull,
  "255-days-later/things-to-keep-in-mind": ChapterThingsToKeepInMind,
  "255-days-later/building-a-college-list": ChapterBuildingACollegeList,
  "255-days-later/building-your-application": ChapterBuildingYourApplication,
  "255-days-later/after-you-submit": ChapterAfterYouSubmit,
  "255-days-later/decisions": ChapterDecisions,
  "255-days-later/and-its-over": ChapterAndItsOver,
  "redesigning-my-portfolio/full": RedesigningFull,
};
