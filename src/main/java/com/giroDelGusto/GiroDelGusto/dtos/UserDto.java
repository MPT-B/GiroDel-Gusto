package com.giroDelGusto.GiroDelGusto.dtos;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.giroDelGusto.GiroDelGusto.models.Profile;
import com.giroDelGusto.GiroDelGusto.models.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Integer id;
    private Integer profileId;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Profile profile;
    private String email;
    private String username;
    private String token;
    private UserRole role;

}