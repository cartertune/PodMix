import nodemailer from "nodemailer";
import aws from "aws-sdk";
import _ from "lodash";
import Mail from "nodemailer/lib/mailer";
import { Project } from "../models/project";
import ProjectSharedEmailTemplate from "../resources/ProjectSharedEmailTemplate";

interface PMEmailMessage {
  emailAddress: string;
  subject: string;
  html: string;
}

class EmailNotificationService {
  private transporter: Mail;
  private notifFromEmail: string = "no-reply@peopleonotherpeoplesmix.com";
  constructor() {
    this.transporter = nodemailer.createTransport({
      SES: new aws.SES({
        accessKeyId: process.env.PM_AWS_KEY_ID,
        secretAccessKey: process.env.PM_AWS_SECRET_KEY,
        apiVersion: "2010-12-01",
      }),
    });
  }

  sendEmail(emailData: PMEmailMessage): any {
    const { emailAddress, subject, html } = emailData;
    const data: Mail.Options = {
      from: this.notifFromEmail,
      to: emailAddress,
      subject,
      html,
    };
    console.log("sharing email", data);
    this.transporter.sendMail(data, console.log);
  }

  onAddCollaboratorEmail(
    emailAddress: string,
    sharerName: string,
    project: Project
  ): any {
    console.log("here with:", emailAddress, sharerName, project);
    const { title, id } = project;
    const projectUrl: string = `http://peopleonotherpeoplesmix.com/projects/${id}`;
    const html = ProjectSharedEmailTemplate(
      emailAddress.split("@")[0],
      sharerName,
      title,
      projectUrl
    );
    const subject: string = `You are invited to collab on ${title}`;
    console.log(emailAddress);

    this.sendEmail({ emailAddress, subject, html });
  }
}

export default new EmailNotificationService();
