package com.carlos.demo.security;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class UserResponseDTO {
    private String username;
    private List<String> roles;

    public UserResponseDTO(String username, List<String> roles) {
        this.username = username;
        this.roles = roles;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRoles( List<String> roles) {
        this.roles = roles;
    }
}
