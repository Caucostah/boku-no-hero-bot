const userController = require("../App/controllers/userController.js")
const quirkController = require("../App/controllers/quirkController.js")

module.exports = { 
    execute: message => { 
        const userId = message.author.id        

        userController.get(userId)
            .then(async res => {
                quirkController.get()
                    .then(quirks => {
                        var random_quirk = quirks[Math.floor(Math.random() * quirks.length)]
                        
                        if(!res.length) {
                            if((Math.random() * 100) <= 0.1) {
                                if(Math.random() < 0.5) {                                    
                                    // random_quirk = one for all
                                    message.reply("One For All")
                                    return;
                                } else {
                                    // random_quirk = All for one
                                    message.reply("All For One")
                                    return;
                                }
                            } else if((Math.random() * 100) <= 15) {
                                message.reply("Você é um sem-individualidade")
                                return;
                            }
                            
                            userController.add({ userId, quirks: random_quirk })
                                .then(res => {
                                    message.reply(`Sua individualidade é: ${random_quirk.nome}`)
                                })
                        } else {
                            var dataDoUltimoQuirk = new Date(res[0].lastQuirk);
                            
                            var hoje = new Date();
                            var horas = (hoje - dataDoUltimoQuirk) / 36e5

                            var decimal = (Math.abs((process.env.quirk_time - horas)) - Math.floor((process.env.quirk_time - horas)))
                            var minutos = (decimal*60).toFixed(0)
                            if((process.env.quirk_time - horas) > 0) {
                                message.reply(`fica frio aí, ainda faltam ${(process.env.quirk_time - horas).toFixed(0)} horas e ${minutos} minutos para que você possa tentar novamente.`)
                                return;
                            }

                            if((Math.random() * 100) <= 0.1) {
                                if(Math.random() < 0.5) {                                    
                                    // random_quirk = one for all
                                    message.reply("One For All")
                                    return;
                                } else {
                                    // random_quirk = All for one
                                    message.reply("All For One")
                                    return;
                                }
                            } else if((Math.random() * 100) <= 15) {
                                message.reply("Você é um sem-individualidade")
                                return;
                            }

                            userController.updateLasQuirk(userId)
                                .then(r => {
                                    message.reply(`Sua individualidade é: ${random_quirk.nome}`)
                                })                            
                        }
                    })
            })

    }
}