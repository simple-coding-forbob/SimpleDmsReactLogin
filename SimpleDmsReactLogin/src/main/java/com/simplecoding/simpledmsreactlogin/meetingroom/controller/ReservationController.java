package com.simplecoding.simpledmsreactlogin.meetingroom.controller;


import com.simplecoding.simpledmsreactlogin.meetingroom.service.ReservationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "ReservationController", description = "예약 REST API")
public class ReservationController {
    private final ReservationService reservationService;


}
