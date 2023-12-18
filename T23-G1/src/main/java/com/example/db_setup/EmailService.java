package com.example.db_setup;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  private final JavaMailSender javaMailSender;

  @Autowired
  public EmailService(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
  }

  // Invia email per il reset della password
  public void sendPasswordResetEmail(String recipientEmail, String resetToken) throws MessagingException {
    MimeMessage message = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);

    helper.setTo(recipientEmail);
    helper.setSubject("Password Reset Request");
    helper.setText("Please use the following token to reset your password: " + resetToken);

    javaMailSender.send(message);
  }

  // Invia email per la registrazione dell'ID
  public void sendMailRegister(String recipientEmail, Integer id) throws MessagingException {
    MimeMessage message = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);

    helper.setTo(recipientEmail);
    helper.setSubject("Registration Successful");
    helper.setText("Welcome to GamesApp! Your ID is: " + id);

    javaMailSender.send(message);
  }
}
