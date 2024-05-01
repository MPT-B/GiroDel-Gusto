package com.giroDelGusto.GiroDelGusto.models;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUp {

    @NotEmpty
    private String email;

    @NotEmpty
    private String username;

    @NotEmpty
    private char[] password;

}