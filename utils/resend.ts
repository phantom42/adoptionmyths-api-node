import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export function sendNotification(myth:string):void {
	resend.emails.send({
		from: 'onboarding@resend.dev',
		to: 'phantomadoptee@gmail.com',
		subject: 'new myth submitted',
		html: `<p>New myth submitted:</p><p>${myth}`
	})
}