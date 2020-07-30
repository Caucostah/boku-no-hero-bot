module.exports = {
    PERMISSIONS: ["BAN_MEMBERS"],
    execute: message => {
        message.channel.send(`${message.mentions.users.first()} está sob julgamento, reaja com ⚰️ se você apoia esse ban (${Math.round((message.guild.members.cache.filter(member => !member.user.bot).size)/2)} votos necessários)`)
            .then(mess => {
                mess.react("⚰️")
                    .then(m => {
                        mess.awaitReactions((reaction, user) => ['⚰️'].includes(reaction.emoji.name), { max: Math.round((message.guild.members.cache.filter(member => !member.user.bot).size)/2), time: 60000*3, errors: ['time'] })
                            .then(collected => {
                                try {
                                    message.channel.send(`O martelo da justiça e democracia determinou a sentença! Sayonara ${message.mentions.users.first()}.`);
                                    message.members.mentions.first().ban();
                                    return;
                                } catch {
                                    message.channel.send("Eu n tenho permissão pra banir esse usuário...");
                                    return;
                                }
                            })
                            .catch(collected => {
                                message.channel.send("Meta não atingida ☂️, comando cancelado.");
                                return;
                            })
                    })
            })

    }
}