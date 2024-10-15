package com.manager.ashrey.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.MailSender;
import java.util.Properties;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        // Set your SMTP server properties here
        mailSender.setHost("smtp.gmail.com");  // Replace with your SMTP host
        mailSender.setPort(587);  // Replace with your SMTP port
        mailSender.setUsername("ashreyjuit@gmail.com");  // Replace with your email
        mailSender.setPassword("heyf ecbn ogmt twrm");  // Replace with your email password

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.debug", "true");  // Set to 'true' for debugging

        return mailSender;
    }
}
