package com.carlos.demo.security;

import java.util.List;

public class UserDTO {

    private String username;
    private String password;
    private List<String> roles;

    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public List<String> getRoles() {
        return roles;
    }
}
