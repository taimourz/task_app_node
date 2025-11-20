import sgMail from '@sendgrid/mail'

const sendGridApiKey = process.env.SENDGRID_API_KEY


sgMail.setApiKey(sendGridApiKey)

export const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: "taimour.rkt@gmail.com",
        from: "taimourz@proton.me",
        subject: "not spam",
        text: `hey sendgrid is bullshit, Welcome from ${name}`

    })
}

export const sendCancellationEmail = (email, name) => {
    debugger
    sgMail.send({
        to: "taimour.rkt@gmail.com",
        from: "taimourz@proton.me",
        subject: "Subscription cancelled successfully",
        text: `Hey ${name}, we have noticited you cancelled your subscription is there any way we could have stopped you.`

    })
}
