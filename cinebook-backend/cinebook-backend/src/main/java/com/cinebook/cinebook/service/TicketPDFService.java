package com.cinebook.cinebook.service;


public interface TicketPDFService {

    byte[] generatePDFTickets(Long ticketId);
}
