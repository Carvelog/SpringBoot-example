package com.carlos.demo.service;

import com.carlos.demo.models.Role;
import com.carlos.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements RoleServiceInterface {

    @Autowired private RoleRepository roleRepository;

    @Override
    public Role findByName(String roleType) {
        return roleRepository.findByRoleType(roleType);
    }
}
