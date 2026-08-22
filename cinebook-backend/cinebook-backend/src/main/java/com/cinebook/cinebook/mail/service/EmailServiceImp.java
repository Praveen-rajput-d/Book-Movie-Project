package com.cinebook.cinebook.mail.service;

import com.cinebook.cinebook.entity.Ticket;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImp implements EmailService {
    private  final JavaMailSender mailSender;
    @Override
    public void sendEmailConfirmation(Ticket ticket) {
        System.out.println("Inside Email Service");
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo(ticket.getBooking().getUser().getEmail());
        message.setSubject("CineBook - Booking Confirmed");
        message.setText(
                "Hello"+ticket.getBooking().getUser().getFirstName()+",\n\n"+
                        "your Booking has been confirmed.\n\n"+
                        "Ticket Number :"+ticket.getTicketNumber()+"\n"+
                        "Booking Number :"+ticket.getBooking().getBookingNumber()+"\n"+
                        "Movie :"+ticket.getBooking().getShow().getMovie().getTitle()+"\n"+
                        "Theatre :"+ticket.getBooking().getShow().getScreen().getTheater().getName()+"\n"+
                        "Screen :"+ticket.getBooking().getShow().getScreen().getScreenName()+"\n"+
                        "Show Date:"+ticket.getBooking().getShow().getShowDate()+"\n"+
                        "Show Time:"+ticket.getBooking().getShow().getStartTime()+"\n"+
                        "Enjoy your movie!\n\n"+
                        "Team CineBook"
        );
        try{
            System.out.println("Sending Email...");
            mailSender.send(message);
            System.out.println("Email Sent Successfully");

        }catch(Exception e){
            e.printStackTrace();
        }

    }
}
