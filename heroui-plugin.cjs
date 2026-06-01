const plugin = require("tailwindcss/plugin");
const { heroui } = require("@heroui/theme");

const heroPlugin = heroui();

module.exports = plugin(heroPlugin.handler, heroPlugin.config);
