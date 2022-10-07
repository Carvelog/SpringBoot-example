package com.carlos.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "ROLES")
public class Role {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roles_seq")
    @SequenceGenerator(name = "roles_seq", sequenceName = "roles_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "ROLETYPE")
    @Enumerated(EnumType.STRING)
    private RolesEnum roleType;

//    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "roles", cascade = CascadeType.ALL) //name of the variable which specifies ManyToMany annotation
//    @JsonIgnore
//    private Set<User> users;

    public Integer getId() {
        return id;
    }

    public RolesEnum getRoleType() {
        return roleType;
    }

    public void setRoleType(RolesEnum roleType) {
        this.roleType = roleType;
    }

//    public Set<User> getUsers() {
//        return users;
//    }
//
//    public void setUsers(Set<User> users) {
//        this.users = users;
//    }
}
