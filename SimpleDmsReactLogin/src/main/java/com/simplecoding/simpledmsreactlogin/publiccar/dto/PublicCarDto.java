package com.simplecoding.simpledmsreactlogin.publiccar.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PublicCarDto {
    private Long pid;
    private String carName;
    private String floor;
    private Long capacity;
}
