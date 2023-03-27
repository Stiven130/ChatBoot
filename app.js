const { 
    createBot, 
    createProvider, 
    createFlow, 
    addKeyword, 
} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const WsProvider = require('@bot-whatsapp/provider/baileys')
const DBProvider = require('@bot-whatsapp/database/mock')


//Creacion de los flujos para recibir y enviar los mensajes 

const flujoPrincipal = addKeyword(['hola','ola','ole','buenas','buenas tardes','buenas noches','buenos días','buenos dias'])
.addAnswer ('Hola, por favor escriba informacion')
const flujoSENNOVA = addKeyword('SENNOVA').addAnswer ('Es el Sistema de Investigación, Innovación y Desarrollo Tecnológico a través del cual se ejecuta la política de contribución del SENA a la Ciencia y Tecnología del País; fortaleciendo capacidades locales en productividad, competitividad, generación de conocimiento y pertinencia de la Formación Profesional Integral.')
const flujoAgrosena = addKeyword('Agrosena').addAnswer ('Es una estrategia que fortalece los procesos de formación profesional en la ruralidad Colombiana a través de actividades de extensión agropecuaria para mejorar las condiciones técnicas y productivas que impactan positivamente la calidad de vida de las poblaciones.')
const flujoPortafolio = addKeyword('Portafolio 2023 CAM').addAnswer ('https://me-qr.com/es/mobile/pdf/13034442')

//Botones para interactuar

const flujoBotons = addKeyword('informacion','información').addAnswer('A continuaccion escoja el tema que quiere obtener informacion', {
    buttons: [{ body: 'SENNOVA' }, { body: 'Agrosena' }, { body: 'Portafolio 2023 CAMA' }],
})


//Llamada de los flujos
const main = async () => {

    const adapterDB = new DBProvider()
    const adapterFlow = createFlow([flujoPrincipal, flujoBotons, flujoSENNOVA, flujoAgrosena, flujoPortafolio])
    const adapterProvider = createProvider(WsProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
