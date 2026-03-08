import nodemailer from "nodemailer";
import { ENV } from "./env.js";

function ts() {
  return new Date().toISOString();
}

function createTransporter() {
  if (!ENV.EMAIL_USER || !ENV.EMAIL_PASS) {
    console.error(`[${ts()}] 📧 FATAL: EMAIL_USER or EMAIL_PASS is not set`);
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

async function sendMail(options) {
  const maxRetries = 3;
  const emailId = Math.random().toString(36).slice(2, 8);

  console.log(`[${ts()}] 📧 [${emailId}] QUEUED: to=${options.to} subject="${options.subject}"`);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const t = createTransporter();
    if (!t) {
      console.error(`[${ts()}] 📧 [${emailId}] ABORT: transporter not configured`);
      throw new Error("Email transporter not configured (missing EMAIL_USER or EMAIL_PASS)");
    }

    try {
      console.log(
        `[${ts()}] 📧 [${emailId}] ATTEMPT ${attempt}/${maxRetries}: verifying connection...`
      );
      await t.verify();
      console.log(
        `[${ts()}] 📧 [${emailId}] ATTEMPT ${attempt}/${maxRetries}: SMTP verified, sending...`
      );

      const info = await t.sendMail(options);

      console.log(
        `[${ts()}] 📧 [${emailId}] SENT: to=${options.to} messageId=${info.messageId} response="${info.response}" accepted=${JSON.stringify(info.accepted)} rejected=${JSON.stringify(info.rejected)}`
      );
      return info;
    } catch (error) {
      console.error(
        `[${ts()}] 📧 [${emailId}] FAIL attempt ${attempt}/${maxRetries}: code=${error.code || "N/A"} msg="${error.message}" command=${error.command || "N/A"} responseCode=${error.responseCode || "N/A"}`
      );
      if (attempt < maxRetries) {
        const delay = attempt * 3000;
        console.log(`[${ts()}] 📧 [${emailId}] RETRY in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
      }
    } finally {
      try {
        t.close();
      } catch {}
    }
  }

  console.error(
    `[${ts()}] 📧 [${emailId}] EXHAUSTED: all ${maxRetries} attempts failed for ${options.to}`
  );
  throw new Error(`Email delivery failed after ${maxRetries} attempts for ${options.to}`);
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
    console.log(`[${ts()}] 📧 WELCOME: triggering for ${user.email}`);
    await sendMail({
      from: `"Talent IQ" <${ENV.EMAIL_USER}>`,
      to: user.email,
      subject: "🎉 Welcome to Talent IQ!",
      html,
    });
  } catch (error) {
    console.error(`[${ts()}] 📧 WELCOME FAILED: ${user.email} — ${error.message}`);
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
    console.log(`[${ts()}] 📧 SESSION_CREATED: triggering for ${host.email}`);
    await sendMail({
      from: `"Talent IQ" <${ENV.EMAIL_USER}>`,
      to: host.email,
      subject: `🚀 Session Created: ${session.problem}`,
      html,
    });
  } catch (error) {
    console.error(`[${ts()}] 📧 SESSION_CREATED FAILED: ${host.email} — ${error.message}`);
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
    console.log(`[${ts()}] 📧 SESSION_JOINED: triggering for ${host.email}`);
    await sendMail({
      from: `"Talent IQ" <${ENV.EMAIL_USER}>`,
      to: host.email,
      subject: `👋 ${participant.name} joined your session: ${session.problem}`,
      html,
    });
  } catch (error) {
    console.error(`[${ts()}] 📧 SESSION_JOINED FAILED: ${host.email} — ${error.message}`);
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
    console.log(`[${ts()}] 📧 INVITE: triggering for ${recipientEmail}`);
    await sendMail({
      from: `"Talent IQ" <${ENV.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `📩 ${inviterName} invited you to a coding session!`,
      html,
    });
  } catch (error) {
    console.error(`[${ts()}] 📧 INVITE FAILED: ${recipientEmail} — ${error.message}`);
  }
}
