package com.cinebook.cinebook.controller;

import com.cinebook.cinebook.service.TicketPDFService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pdf-generate")
@RequiredArgsConstructor
public class TicketPdfGenerator {
    private final TicketPDFService ticketPDFService;
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{ticketId}/download")
    public ResponseEntity<byte[]>downloadTicket(@PathVariable Long ticketId){
        byte[]pdf=ticketPDFService.generatePDFTickets(ticketId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ticket_"+ticketId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF).body(pdf);
    }
}
