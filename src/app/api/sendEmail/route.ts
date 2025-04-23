import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API);

export async function POST(req:any) {
  try {
     const body = await req.json();
     const { username, email, message } = body;
     console.log(username, email, message);

     await resend.emails.send({
      from: `Your Portfolio <onboarding@resend.dev>`, // Use a verified sender email
      to: ["minhazfardin25@gmail.com"], // Your email address
      subject: `New Message from ${username}`,
      html: `
        <p><strong>From:</strong> ${username} (${email})</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}