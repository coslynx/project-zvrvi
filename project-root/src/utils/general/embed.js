const { MessageEmbed } = require('discord.js');

/**
 * Creates a new Discord embed with customizable fields, colors, and content.
 * @param {Object} options - Options for the embed.
 * @param {string} options.title - The title of the embed.
 * @param {string} options.description - The description of the embed.
 * @param {string} options.url - The URL to link to.
 * @param {string} options.color - The color of the embed.
 * @param {Array<Object>} options.fields - An array of fields to include in the embed.
 * @param {string} options.fields[].name - The name of the field.
 * @param {string} options.fields[].value - The value of the field.
 * @param {boolean} options.fields[].inline - Whether to display the field inline.
 * @param {string} options.thumbnail - The URL of the thumbnail image.
 * @param {string} options.image - The URL of the image to display.
 * @param {string} options.footer - The footer text of the embed.
 * @param {string} options.footerIcon - The URL of the footer icon.
 * @returns {MessageEmbed} - A new Discord embed.
 */
const createEmbed = (options) => {
  const embed = new MessageEmbed();

  if (options.title) embed.setTitle(options.title);
  if (options.description) embed.setDescription(options.description);
  if (options.url) embed.setURL(options.url);
  if (options.color) embed.setColor(options.color);
  if (options.fields) {
    options.fields.forEach((field) => {
      embed.addField(field.name, field.value, field.inline);
    });
  }
  if (options.thumbnail) embed.setThumbnail(options.thumbnail);
  if (options.image) embed.setImage(options.image);
  if (options.footer) embed.setFooter({ text: options.footer, iconURL: options.footerIcon });

  return embed;
};

module.exports = { createEmbed };