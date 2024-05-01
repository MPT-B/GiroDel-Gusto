package com.giroDelGusto.GiroDelGusto.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Credentials {

    private String username;
    private char[] password;

}