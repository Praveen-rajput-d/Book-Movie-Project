package com.cinebook.cinebook.serviceImpl;

import com.cinebook.cinebook.entity.Ticket;
import com.cinebook.cinebook.exception.ResourceNotFoundException;
import com.cinebook.cinebook.repository.TicketRepository;
import com.cinebook.cinebook.service.QrCocdeService;
import com.cinebook.cinebook.service.TicketPDFService;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.lowagie.text.Image;
import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketPDFServiceImp implements TicketPDFService {

    private final TicketRepository ticketRepository;

    private  final QrCocdeService qrCocdeService;

    @Override
    public byte[] generatePDFTickets(Long ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ticket not found with this ticket id: " + ticketId
                        )
                );

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {



            Document document = new Document(
                    com.lowagie.text.PageSize.A4,
                    36,
                    36,
                    36,
                    36
            );

            PdfWriter.getInstance(document, out);

            document.open();



            Font titleFont = new Font(
                    Font.HELVETICA,
                    22,
                    Font.BOLD,
                    new Color(220, 53, 69)
            );

            Font subtitleFont = new Font(
                    Font.HELVETICA,
                    10,
                    Font.NORMAL,
                    Color.DARK_GRAY
            );

            Font sectionFont = new Font(
                    Font.HELVETICA,
                    11,
                    Font.BOLD,
                    Color.WHITE
            );

            Font labelFont = new Font(
                    Font.HELVETICA,
                    8,
                    Font.NORMAL,
                    Color.GRAY
            );

            Font valueFont = new Font(
                    Font.HELVETICA,
                    12,
                    Font.BOLD,
                    Color.DARK_GRAY
            );

            Font amountFont = new Font(
                    Font.HELVETICA,
                    16,
                    Font.BOLD,
                    new Color(220, 53, 69)
            );

            Font footerFont = new Font(
                    Font.HELVETICA,
                    10,
                    Font.BOLD,
                    Color.DARK_GRAY
            );

            Font smallFont = new Font(
                    Font.HELVETICA,
                    8,
                    Font.NORMAL,
                    Color.GRAY
            );




            PdfPTable headerTable = new PdfPTable(2);

            headerTable.setWidthPercentage(100);

            headerTable.setWidths(new float[]{
                    70,
                    30
            });


            PdfPCell brandCell = new PdfPCell();

            brandCell.setBorder(Rectangle.NO_BORDER);

            brandCell.setPadding(5);


            Paragraph brand = new Paragraph(
                    "CineBook",
                    titleFont
            );

            brandCell.addElement(brand);


            Paragraph subtitle = new Paragraph(
                    "Movie E-Ticket",
                    subtitleFont
            );

            brandCell.addElement(subtitle);


            headerTable.addCell(brandCell);


            PdfPCell statusCell = new PdfPCell();

            statusCell.setBorder(Rectangle.NO_BORDER);

            statusCell.setHorizontalAlignment(
                    Element.ALIGN_RIGHT
            );

            statusCell.setVerticalAlignment(
                    Element.ALIGN_MIDDLE
            );


            Paragraph status = new Paragraph(
                    ticket.getTicketStatus().toString(),
                    titleFont
            );

            status.setAlignment(Element.ALIGN_RIGHT);

            statusCell.addElement(status);

            headerTable.addCell(statusCell);


            document.add(headerTable);




            document.add(new Paragraph(" "));

            Paragraph line = new Paragraph(
                    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            );

            line.setAlignment(Element.ALIGN_CENTER);

            document.add(line);

            document.add(new Paragraph(" "));




            Paragraph movieLabel = new Paragraph(
                    "MOVIE",
                    labelFont
            );

            movieLabel.setAlignment(Element.ALIGN_CENTER);

            document.add(movieLabel);


            Paragraph movieName = new Paragraph(
                    ticket.getBooking()
                            .getShow()
                            .getMovie()
                            .getTitle(),
                    titleFont
            );

            movieName.setAlignment(Element.ALIGN_CENTER);

            document.add(movieName);

            document.add(new Paragraph(" "));




            PdfPTable ticketInfoTable = new PdfPTable(2);

            ticketInfoTable.setWidthPercentage(100);

            ticketInfoTable.setWidths(new float[]{
                    50,
                    50
            });


            addInfoCell(
                    ticketInfoTable,
                    "TICKET NUMBER",
                    ticket.getTicketNumber(),
                    labelFont,
                    valueFont
            );


            addInfoCell(
                    ticketInfoTable,
                    "BOOKING NUMBER",
                    ticket.getBooking().getBookingNumber(),
                    labelFont,
                    valueFont
            );


            document.add(ticketInfoTable);

            document.add(new Paragraph(" "));




            PdfPTable showTable = new PdfPTable(2);

            showTable.setWidthPercentage(100);

            showTable.setWidths(new float[]{
                    50,
                    50
            });


            addInfoCell(
                    showTable,
                    "THEATRE",
                    ticket.getBooking()
                            .getShow()
                            .getScreen()
                            .getTheater()
                            .getName(),
                    labelFont,
                    valueFont
            );


            addInfoCell(
                    showTable,
                    "SCREEN",
                    ticket.getBooking()
                            .getShow()
                            .getScreen()
                            .getScreenName(),
                    labelFont,
                    valueFont
            );


            addInfoCell(
                    showTable,
                    "DATE",
                    ticket.getBooking()
                            .getShow()
                            .getShowDate()
                            .toString(),
                    labelFont,
                    valueFont
            );


            addInfoCell(
                    showTable,
                    "TIME",
                    ticket.getBooking()
                            .getShow()
                            .getStartTime()
                            .toString(),
                    labelFont,
                    valueFont
            );


            document.add(showTable);

            document.add(new Paragraph(" "));




            String seats = ticket.getBooking()
                    .getBookingSeats()
                    .stream()
                    .map(bs -> bs.getSeat().getSeatNumber())
                    .collect(Collectors.joining(", "));


            PdfPTable seatTable = new PdfPTable(1);

            seatTable.setWidthPercentage(100);


            addInfoCell(
                    seatTable,
                    "SEATS",
                    seats,
                    labelFont,
                    valueFont
            );


            document.add(seatTable);

            document.add(new Paragraph(" "));




            PdfPTable amountTable = new PdfPTable(2);

            amountTable.setWidthPercentage(100);

            amountTable.setWidths(new float[]{
                    70,
                    30
            });


            PdfPCell amountLabelCell = new PdfPCell(
                    new Paragraph(
                            "TOTAL AMOUNT",
                            labelFont
                    )
            );

            amountLabelCell.setPadding(10);

            amountLabelCell.setBorderColor(
                    Color.LIGHT_GRAY
            );


            amountTable.addCell(amountLabelCell);


            PdfPCell amountValueCell = new PdfPCell(
                    new Paragraph(
                            "₹ " +
                                    ticket.getBooking()
                                            .getTotalAmount(),
                            amountFont
                    )
            );

            amountValueCell.setHorizontalAlignment(
                    Element.ALIGN_RIGHT
            );

            amountValueCell.setVerticalAlignment(
                    Element.ALIGN_MIDDLE
            );

            amountValueCell.setPadding(10);

            amountValueCell.setBorderColor(
                    Color.LIGHT_GRAY
            );


            amountTable.addCell(amountValueCell);

            document.add(amountTable);

            document.add(new Paragraph(" "));


//qr code part in the downloaded ticket
            // QR CODE
            try {

                // Generate the same QR code using ticket number
                String qrData = "BookMovie:" + ticket.getTicketNumber();

                String qrCode = qrCocdeService.generateQrCode(qrData);

                System.out.println("QR CODE LENGTH: " + qrCode.length());

                // Remove data:image/png;base64, if it exists
                if (qrCode.contains(",")) {
                    qrCode = qrCode.substring(
                            qrCode.indexOf(",") + 1
                    );
                }

                // Decode Base64
                byte[] qrBytes = Base64.getDecoder()
                        .decode(qrCode);

                System.out.println(
                        "QR BYTES LENGTH: " + qrBytes.length
                );

                // Create PDF image
                Image qrImage = Image.getInstance(qrBytes);

                // Resize QR
                qrImage.scaleToFit(150, 150);

                qrImage.setAlignment(Element.ALIGN_CENTER);

                // QR heading
                Paragraph qrTitle = new Paragraph(
                        "SCAN YOUR TICKET",
                        sectionFont
                );

                qrTitle.setAlignment(Element.ALIGN_CENTER);

                PdfPTable qrHeader = new PdfPTable(1);

                qrHeader.setWidthPercentage(100);

                PdfPCell qrHeaderCell = new PdfPCell(qrTitle);

                qrHeaderCell.setBackgroundColor(
                        new Color(220, 53, 69)
                );

                qrHeaderCell.setHorizontalAlignment(
                        Element.ALIGN_CENTER
                );

                qrHeaderCell.setPadding(7);

                qrHeader.addCell(qrHeaderCell);

                document.add(qrHeader);

                document.add(new Paragraph(" "));

                // Add QR image
                document.add(qrImage);

                Paragraph qrNote = new Paragraph(
                        "Please show this QR code at the theatre entrance.",
                        smallFont
                );

                qrNote.setAlignment(Element.ALIGN_CENTER);

                document.add(qrNote);

            } catch (Exception e) {

                System.out.println(
                        "QR CODE PDF ERROR: " + e.getMessage()
                );

                e.printStackTrace();

                Paragraph qrError = new Paragraph(
                        "QR Code could not be generated.",
                        smallFont
                );

                qrError.setAlignment(Element.ALIGN_CENTER);

                document.add(qrError);
            }


            document.add(new Paragraph(" "));




            Paragraph generated = new Paragraph(
                    "Ticket Generated: " +
                            ticket.getGeneratedAt(),
                    smallFont
            );

            generated.setAlignment(
                    Element.ALIGN_CENTER
            );

            document.add(generated);


            document.add(new Paragraph(" "));




            Paragraph footer = new Paragraph(
                    "Thank you for choosing CineBook!",
                    footerFont
            );

            footer.setAlignment(
                    Element.ALIGN_CENTER
            );

            document.add(footer);


            Paragraph note = new Paragraph(
                    "Please arrive at the theatre at least 15 minutes before show time.",
                    smallFont
            );

            note.setAlignment(
                    Element.ALIGN_CENTER
            );

            document.add(note);


            Paragraph validity = new Paragraph(
                    "This ticket is valid only for the selected movie, theatre, date and show time.",
                    smallFont
            );

            validity.setAlignment(
                    Element.ALIGN_CENTER
            );

            document.add(validity);




            document.close();


        } catch (Exception e) {

            throw new RuntimeException(
                    "PDF GENERATION FAILED",
                    e
            );
        }


        return out.toByteArray();
    }




    private void addInfoCell(
            PdfPTable table,
            String label,
            String value,
            Font labelFont,
            Font valueFont
    ) {

        PdfPCell cell = new PdfPCell();

        cell.setPadding(8);

        cell.setBorderColor(
                new Color(220, 220, 220)
        );


        Paragraph labelParagraph = new Paragraph(
                label,
                labelFont
        );


        Paragraph valueParagraph = new Paragraph(
                value,
                valueFont
        );


        cell.addElement(labelParagraph);

        cell.addElement(valueParagraph);


        table.addCell(cell);
    }
}

