/**
 * @type {import("postcss").PluginCreator}
 */
module.exports = (opts = { vendorPrefixes: {} }) => {
    const { vendorPrefixes } = opts;
    return {
        postcssPlugin: "postcss-496-autoprefixer",
        Rule: rule => {
            if (!rule.selector.includes("::")) return;

            rule.selector
                .split(",")
                .map(s => s.trim())
                .forEach(selector => {
                    const match = selector.match(/::\w+/);
                    if (!match) return;

                    const pseudoElement = match[0];
                    const prefixes = vendorPrefixes[pseudoElement];
                    if (!prefixes) return;

                    const baseSelector = selector.replace(pseudoElement, "");
                    prefixes.forEach(prefix => {
                        rule.cloneBefore({
                            selector: `${baseSelector}::-${prefix}-${pseudoElement.slice(2)}`,
                        });
                    });
                });
        },
        Declaration: {
            "*": decl => {
                const prefixes = vendorPrefixes[decl.prop];
                if (!prefixes) return;

                for (const prefix of prefixes) {
                    decl.cloneBefore({ prop: `-${prefix}-` + decl.prop });
                }
            },
        },
    };
};

module.exports.postcss = true;
