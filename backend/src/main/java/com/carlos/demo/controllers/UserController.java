package com.carlos.demo.controllers;

import com.carlos.demo.models.Product;
import com.carlos.demo.models.Role;
import com.carlos.demo.models.User;
import com.carlos.demo.repository.UserRepository;
import com.carlos.demo.security.UserResponseDTO;
import com.carlos.demo.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired private UserService userService;

//    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user")
    public ResponseEntity<Object> getUser(@RequestParam(value = "id") String id){
        User user = userService.getUserById(id).get();

        List<String> strRoles = new ArrayList<>();
        for(Role role : user.getRoles()){
            strRoles.add(role.getRoleType().toString());
        }
        UserResponseDTO userDTO = new UserResponseDTO(user.getUsername(), strRoles);

        return new ResponseEntity<>(new Gson().toJson(userDTO), HttpStatus.OK);
    }
}
