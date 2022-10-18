package com.carlos.demo.security;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public class UserResponseDTO {
    
    private String username;
    private List<String> roles;
    private Date creationDate;

    public UserResponseDTO(String username, List<String> roles) {
        this.username = username;
        this.roles = roles;
    }
    public UserResponseDTO(String username, List<String> roles, Date creationDate) {
        this.username = username;
        this.roles = roles;
        this.creationDate = creationDate;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRoles( List<String> roles) {
        this.roles = roles;
    }
}
