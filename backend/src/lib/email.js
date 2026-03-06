import nodemailer from "nodemailer";
import { ENV } from "./env.js";

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS,
    },
  });

  console.log("📧 Gmail SMTP configured for:", ENV.EMAIL_USER);
  return transporter;
}

async function sendMail(options) {
  const t = getTransporter();
  const info = await t.sendMail(options);
  console.log("📧 Email sent to:", options.to);
  return info;
}

export async function sendWelcomeEmail(user) {
  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #1a1a2e; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #fff;">✨ Welcome to Talent IQ!</h1>
      </div>
      <div style="padding: 32px;">
        <p style="font-size: 18px;">Hi <strong>${user.name}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.7;">
          Your account has been created successfully. You're all set to start collaborative coding sessions, solve problems, and ace your technical interviews!
        </p>
        <div style="background: #16213e; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>Account Details:</strong></p>
          <p style="margin: 4px 0;">📧 Email: ${user.email}</p>
          <p style="margin: 4px 0;">👤 Name: ${user.name}</p>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${ENV.CLIENT_URL}/dashboard" style="background: #16a34a; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">Go to Dashboard</a>
        </div>
      </div>
      <div style="background: #0f0f23; padding: 16px; text-align: center; font-size: 12px; color: #888;">
        Talent IQ — Code Together, Learn Together
      </div>
    </div>
  `;

  try {
    await sendMail({
      from: `"Talent IQ" <${ENV.EMAIL_USER}>`,
      to: user.email,
      subject: "🎉 Welcome to Talent IQ!",
      html,
    });
    console.log("Welcome email sent to:", user.email);
  } catch (error) {
    console.error("Failed to send welcome email:", error.message);
  }
}

export async function sendSessionCreatedEmail(host, session) {
  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #1a1a2e; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #fff;">🚀 Session Created!</h1>
      </div>
      <div style="padding: 32px;">
        <p style="font-size: 18px;">Hi <strong>${host.name}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.7;">You've created a new coding session. Share the link below to invite a participant!</p>
        <div style="background: #16213e; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>Session Details:</strong></p>
          <p style="margin: 4px 0;">📝 Problem: ${session.problem}</p>
          <p style="margin: 4px 0;">📊 Difficulty: ${session.difficulty}</p>
          <p style="margin: 4px 0;">👤 Host: ${host.name}</p>
          <p style="margin: 4px 0;">📅 Created: ${new Date(session.createdAt).toLocaleString()}</p>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${ENV.CLIENT_URL}/session/${session._id}" style="background: #16a34a; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">Open Session</a>
        </div>
      </div>
      <div style="background: #0f0f23; padding: 16px; text-align: center; font-size: 12px; color: #888;">
        Talent IQ — Code Together, Learn Together
      </div>
    </div>
  `;

  try {
    await sendMail({
      from: `"Talent IQ" <${ENV.EMAIL_USER}>`,
      to: host.email,
      subject: `🚀 Session Created: ${session.problem}`,
      html,
    });
    console.log("Session created email sent to:", host.email);
  } catch (error) {
    console.error("Failed to send session created email:", error.message);
  }
}

export async function sendSessionJoinedEmail(host, participant, session) {
  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #1a1a2e; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #fff;">👋 Someone Joined Your Session!</h1>
      </div>
      <div style="padding: 32px;">
        <p style="font-size: 18px;">Hi <strong>${host.name}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.7;"><strong>${participant.name}</strong> just joined your coding session!</p>
        <div style="background: #16213e; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>Session Details:</strong></p>
          <p style="margin: 4px 0;">📝 Problem: ${session.problem}</p>
          <p style="margin: 4px 0;">📊 Difficulty: ${session.difficulty}</p>
          <p style="margin: 4px 0;">👤 Host: ${host.name}</p>
          <p style="margin: 4px 0;">🤝 Participant: ${participant.name} (${participant.email})</p>
          <p style="margin: 4px 0;">👥 Participants: 2/2</p>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${ENV.CLIENT_URL}/session/${session._id}" style="background: #16a34a; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">Go to Session</a>
        </div>
      </div>
      <div style="background: #0f0f23; padding: 16px; text-align: center; font-size: 12px; color: #888;">
        Talent IQ — Code Together, Learn Together
      </div>
    </div>
  `;

  try {
    await sendMail({
      from: `"Talent IQ" <${ENV.EMAIL_USER}>`,
      to: host.email,
      subject: `👋 ${participant.name} joined your session: ${session.problem}`,
      html,
    });
    console.log("Session joined email sent to host:", host.email);
  } catch (error) {
    console.error("Failed to send session joined email:", error.message);
  }
}

export async function sendInviteEmail(inviterName, recipientEmail, session) {
  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #1a1a2e; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #fff;">📩 You're Invited!</h1>
      </div>
      <div style="padding: 32px;">
        <p style="font-size: 18px;">Hi there,</p>
        <p style="font-size: 15px; line-height: 1.7;"><strong>${inviterName}</strong> has invited you to a coding session on Talent IQ!</p>
        <div style="background: #16213e; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>Session Details:</strong></p>
          <p style="margin: 4px 0;">📝 Problem: ${session.problem}</p>
          <p style="margin: 4px 0;">📊 Difficulty: ${session.difficulty}</p>
          <p style="margin: 4px 0;">👤 Host: ${inviterName}</p>
          <p style="margin: 4px 0;">🔗 Status: ${session.status}</p>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${ENV.CLIENT_URL}/session/${session._id}" style="background: #16a34a; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">Join Session</a>
        </div>
        <p style="font-size: 13px; color: #888; margin-top: 24px;">
          You'll need a Talent IQ account to join. If you don't have one, you'll be prompted to sign up.
        </p>
      </div>
      <div style="background: #0f0f23; padding: 16px; text-align: center; font-size: 12px; color: #888;">
        Talent IQ — Code Together, Learn Together
      </div>
    </div>
  `;

  try {
    await sendMail({
      from: `"Talent IQ" <${ENV.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `📩 ${inviterName} invited you to a coding session!`,
      html,
    });
    console.log("Invite email sent to:", recipientEmail);
  } catch (error) {
    console.error("Failed to send invite email:", error.message);
  }
}
