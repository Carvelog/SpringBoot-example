package com.carlos.demo.controllers;

import com.carlos.demo.models.Product;
import com.carlos.demo.models.Role;
import com.carlos.demo.models.RolesEnum;
import com.carlos.demo.models.User;
import com.carlos.demo.repository.UserRepository;
import com.carlos.demo.security.UserDTO;
import com.carlos.demo.security.UserResponseDTO;
import com.carlos.demo.service.RoleService;
import com.carlos.demo.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired private UserService userService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private RoleService roleService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/user")
    public ResponseEntity<Object> getUser(@RequestParam(value = "id") Integer id){
        User user = userService.getUserById(id).get();

        List<String> strRoles = new ArrayList<>();
        for(Role role : user.getRoles()){
            strRoles.add(role.getRoleType().toString());
        }
        UserResponseDTO userDTO = new UserResponseDTO(user.getUsername(), strRoles);

        return new ResponseEntity<>(new Gson().toJson(userDTO), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<Object> getUsers(){

        List<User> users = userService.getAllUsers();

        // return a UserResponseDTO
        return new ResponseEntity<>(new Gson().toJson(users), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/user")
    public ResponseEntity<Object> saveUser(@RequestBody UserDTO userDTO){
        try{
            User newUser = new User();
            newUser.setUsername(userDTO.getUsername());
            newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

            List<String> strRoles = userDTO.getRoles();
            List<Role> roles = new ArrayList<>();

            if (strRoles == null ) {
                Role userRole = roleService.findByName(RolesEnum.USER.toString());
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role.toLowerCase()) {
                        case "admin":
                            Role adminRole = roleService.findByName(RolesEnum.ADMIN.toString());
                            roles.add(adminRole);
                        default:
                            Role userRole = roleService.findByName(RolesEnum.USER.toString());
                            roles.add(userRole);
                    }
                });
            }

            newUser.setRoles(roles);
            User savedUser = userService.saveUser(newUser);

            UserResponseDTO response = new UserResponseDTO(savedUser.getUsername(), strRoles);

            return new ResponseEntity<>(new Gson().toJson(response), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/user")
    public ResponseEntity<String> deleteProduct(@RequestParam("username") String username){
        try{
            userService.deleteUser(username);
            return new ResponseEntity<>("User with username: " + username + " deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
