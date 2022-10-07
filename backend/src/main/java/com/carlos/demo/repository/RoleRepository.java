package com.carlos.demo.repository;

import com.carlos.demo.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    @Query(value = "SELECT * FROM ROLES WHERE ROLETYPE=?1", nativeQuery = true)
    Role findByRoleType(String roleType);
}
