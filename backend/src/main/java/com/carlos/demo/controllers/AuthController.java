package com.carlos.demo.controllers;

import com.carlos.demo.models.Role;
import com.carlos.demo.models.RolesEnum;
import com.carlos.demo.models.User;
import com.carlos.demo.repository.RoleRepository;
import com.carlos.demo.security.UserDTO;
import com.carlos.demo.security.UserResponseDTO;
import com.carlos.demo.security.jwt.JwtUtils;
import com.carlos.demo.service.RoleService;
import com.carlos.demo.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtils jwtUtils;
    @Autowired private UserService userService;
    @Autowired private RoleService roleService;

    @PostMapping("/signin")
    public ResponseEntity<Object> authenticateUser(@RequestBody UserDTO userDTO){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = userService.loadUserByUsername(userDTO.getUsername());

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        UserResponseDTO response = new UserResponseDTO(userDetails.getUsername(), roles);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, jwtCookie.toString());
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new Gson().toJson(response));
//        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(response);
//        try{
//            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            Gson gson = new Gson();
//            // problema con la recursion infinita
//            // arreglado comentando la variable users del POJO role
//            User user = userService.getUserByName(userCredentials.getUsername());
//            String json = gson.toJson(user);
//
//
//            // create and return token
//            return new ResponseEntity<>("JWToken", HttpStatus.OK);
//        }catch (Exception e){
//            return new ResponseEntity<>("User does not exists!.", HttpStatus.BAD_REQUEST);
//        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> registerUser(@RequestBody UserDTO userDTO){
        if(userService.existsByUsername(userDTO.getUsername())){
            return new ResponseEntity<>("Username is already registered!", HttpStatus.BAD_REQUEST);
        }

        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        List<String> strRoles = userDTO.getRoles();
        List<Role> roles = new ArrayList<>();

        if (strRoles == null) {
            Role userRole = roleService.findByName(RolesEnum.USER.toString());
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
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

        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("");
    }
}
