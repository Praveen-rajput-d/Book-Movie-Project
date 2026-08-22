package com.cinebook.cinebook.mail.service;

import com.cinebook.cinebook.entity.Ticket;

public interface EmailService {
    void sendEmailConfirmation(Ticket ticket);
}
