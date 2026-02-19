import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import footnote_plugin from "markdown-it-footnote";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";
import { IdAttributePlugin } from "@11ty/eleventy";
import { execSync } from "child_process";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style");
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.setInputDirectory("content");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.use(footnote_plugin)
    mdLib.use(MarkdownItGitHubAlerts)
  });
  eleventyConfig.addShortcode("lastEdited", findLastEdited);
}

function findLastEdited() {
  let inputPath = this.page.inputPath;

  if (inputPath.startsWith("./")) {
    inputPath = inputPath.slice(2);
  }

  /* get last edited time from the file by running git log */
  try {
    /* look at the file */
    let result = execSync(`git log -1 --format=%cI -- "${inputPath}"`, {
      encoding: "utf-8",
    }).trim();
    // If no history for this path, try the last commit touching the whole repo
    if (!result) {
      result = execSync(`git log -1 --format=%cI`, {
        encoding: "utf-8",
      }).trim();
    }
    if (result) {
      const date = new Date(result);
      const tz = "Australia/Sydney";
      const dateStr = date.toLocaleDateString("en-AU", {
        timeZone: tz,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const timeStr = date.toLocaleTimeString("en-AU", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
      });
      const tzAbbr = date
        .toLocaleTimeString("en-AU", { timeZone: tz, timeZoneName: "short" })
        .split(" ")
        .pop();
      return `${dateStr} at ${timeStr} ${tzAbbr}`;
    }
  } catch {
    // ignore
  }
  return "";
}
