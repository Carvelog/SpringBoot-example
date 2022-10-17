package com.carlos.demo.service;

import com.carlos.demo.models.Role;
import com.carlos.demo.models.Supplier;
import com.carlos.demo.models.User;
import com.carlos.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userRepository.findByUsername(username);
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
        } catch(UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(List<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getRoleType().toString())).collect(Collectors.toList());
    }

    public User saveUser(User user) { return userRepository.save(user); }
    public Boolean existsByUsername(String username) { return userRepository.existsByUsername(username); }
    public User getUserByName(String username) {
        return userRepository.findByUsername(username);
    }
    public Optional<User> getUserById(Integer creatorId) {
        return userRepository.findById(creatorId);
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
