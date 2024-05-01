package com.giroDelGusto.GiroDelGusto.models;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    normal,
    admin,
    restaurateur;

    @Override
    public String getAuthority(){
        return this.name();
    }
}