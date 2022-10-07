package com.carlos.demo.service;

import com.carlos.demo.models.Role;

public interface RoleServiceInterface {
    Role findByName(String roleType);
}
