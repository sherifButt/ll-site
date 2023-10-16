import getGpt from '@/app/ssrHelpers/getGpt';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


export async function POST(req) {

  try {
    const { email, name, company, phone, message, budget } = await req.json();

    console.log(email)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailData = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_RECIPIENT,
      subject: `New contact from ${name}`,
      text: message + " | From: " + email + " | Budget: Around £" + budget+ ",000 | Phone: " + phone + " | Company: " + company,
      html: `<div>${message}</div><p>Sender: ${email}</p><p>Budget: ${budget}</p>`
    };

    console.log('mailData', mailData);

    const prompt = [
      {role: 'system', content:'you are a software development customer support / sales person, and you are responding to a contact form replying with a message after the user has left his details to engage with user'},
      {role: 'user', content: `compose  a message user info, make it short message as a contact form message
      note: return response formatted in html, don't add <body> or <html> tags, just return the html content,
      example: 
      <p>Dear user,</p> 
      user data: ${ JSON.stringify(mailData) }
      our data: { "Name": "Sherif", "Company Name":"Loyalleads", "email": "contact@loyalleads.co.uk", "phone": "07712345678"}
      `},
    ];

  console.log('prompt', prompt);

    const result = await getGpt(prompt);
    console.log('result', result.response);

    mailData.response = result.response;


    const info = await transporter.sendMail(mailData);
    console.log('info', info);

    return NextResponse.json({ success: true, response: result.response,message: 'Email sent' }, { status: 200 });
  } catch (err) {
    console.log('err', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

};

export const GET = async () => NextResponse.json({ error: 'Not found' }, { status: 404 });