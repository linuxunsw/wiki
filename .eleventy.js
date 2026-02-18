import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("style");
	eleventyConfig.addPlugin(syntaxHighlight);
};

