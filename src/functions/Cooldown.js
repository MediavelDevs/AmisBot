module.exports = function Cooldown(interaction,talkedRecently,time,funcBad, func) {
  if (talkedRecently.has(interaction.user.id)) {
    funcBad()
  } else {
    func()

    talkedRecently.add(interaction.user.id);
    setTimeout(() => {
      talkedRecently.delete(interaction.user.id);
    }, time);
  }
}