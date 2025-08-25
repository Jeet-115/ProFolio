import User from "../models/user.js";
import sendEmail from "../config/sendEmail.js";

// 📩 Send Invitation Email
export const sendInvitation = async (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "recruiter") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { candidateId } = req.params;
  const { jobTitle, message } = req.body;  // 👈 accept both

  const candidate = await User.findById(candidateId);
  if (!candidate || candidate.role !== "user") {
    return res.status(404).json({ error: "Candidate not found" });
  }

  const recruiter = await User.findById(req.user._id);

  // Email template
  const draftedMessage = `
    <p>Dear ${candidate.fullName || "Candidate"},</p>
    <p>I am reaching out from <b>${recruiter.fullName || "a recruiter"}</b> regarding the role: <b>${jobTitle}</b>.</p>
    <p>${message || "We found your profile interesting and would like to connect with you."}</p>
    <p>You can reply to me directly at: <b>${recruiter.email}</b></p>
    <br/>
    <p>Best regards,<br/>${recruiter.fullName || "Recruiter"}</p>
  `;

  try {
    await sendEmail({
      to: candidate.email,
      subject: `Invitation for ${jobTitle} - ${recruiter.fullName || "Recruiter"}`, // 👈 include title in subject
      html: draftedMessage,
    });

    recruiter.contactedCandidates.push({
      candidateId,
      method: "email",
      contactedAt: new Date(),
    });
    await recruiter.save();

    res.json({ message: "Invitation sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send invitation" });
  }
};
