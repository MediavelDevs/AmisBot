module.exports = {
  embad,
  random
}

function embad({color, title, description, thumb, filds, img, footer}) {
  const { MessageEmbed } = require('discord.js');
  const Embed = new MessageEmbed()
	if (color) Embed.setColor(color)
	if (title) Embed.setTitle(title)
	if (description) Embed.setDescription(description)
	if (thumb) Embed.setThumbnail(thumb)
	if (filds) Embed.addFields(filds)
	if (img) Embed.setImage(img)
	.setTimestamp()
	if (footer) Embed.setFooter(footer);
  return Embed
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}