package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.entity.Booking;
import com.cinebook.cinebook.entity.Ticket;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.repository.TicketRepository;
import com.cinebook.cinebook.service.TicketPDFService;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketPDFServiceImp implements TicketPDFService {
  private final TicketRepository ticketRepository;
    @Override
    public byte[] generatePDFTickets(Long ticketId) {
        Ticket ticket=ticketRepository.findById(ticketId).orElseThrow(()->new ResourceNotFoundException("Tickets not found with this ticketid:"+ticketId));
        ByteArrayOutputStream out=new ByteArrayOutputStream();
        try{
            Document document=new Document(PageSize.A4,36,36,36,36);
            PdfWriter.getInstance(document,out);
            document.open();
            Font titlefont=new Font(Font.HELVETICA,16,Font.BOLD);
            Paragraph title=new Paragraph("CINEBOOK MOVIE TICKET",titlefont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Ticket Number :"+ticket.getTicketNumber()));
            document.add(new Paragraph("Booking Number :"+ ticket.getBooking().getBookingNumber()));
            document.add(new Paragraph("Movie :"+ticket.getBooking().getShow().getMovie().getTitle()));
            document.add(new Paragraph("Theatre :"+ticket.getBooking().getShow().getScreen().getTheater().getName()));
            document.add(new Paragraph("Screen :"+ticket.getBooking().getShow().getScreen().getScreenName()));
            document.add(new Paragraph("Show Date :"+ticket.getBooking().getShow().getShowDate()));
            document.add(new Paragraph("Show Time :"+ticket.getBooking().getShow().getStartTime()));
            document.add(new Paragraph("Amount :"+ticket.getBooking().getTotalAmount()));
            document.add(new Paragraph("Status:"+ticket.getTicketStatus()));

            String seats=ticket.getBooking().getBookingSeats().stream().map(bs->bs.getSeat().getSeatNumber()).collect(Collectors.joining(", "));
            document.add(new Paragraph("Seats:"+seats));

            document.add(new Paragraph(" "));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("---------------------------------------------------------------------------------------------------------------------------------------------------------------------"));
            document.add(new Paragraph(" "));

            Font footerFont=new Font(Font.HELVETICA,12,Font.BOLD);
            Paragraph footer=new Paragraph(
                    "Thankyou for choosing cinebook",footerFont
            );
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);
            Paragraph note=new Paragraph(
                    "please arrive 15 minutes before show time."
            );
            note.setAlignment(Element.ALIGN_CENTER);
            document.add(note);
            document.close();
        }catch (Exception e){
            throw  new RuntimeException("PDF GENERATION FAILED",e);
        }

        return out.toByteArray();
    }
}
