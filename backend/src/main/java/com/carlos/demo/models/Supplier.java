package com.carlos.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "SUPPLIERS")
public class Supplier {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "supplier_seq")
    @SequenceGenerator(name = "supplier_seq", sequenceName = "supplier_seq", allocationSize = 1)
    private int id;

    @Column(nullable = false)
    private String name;
    private String country;


    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "suppliers", cascade = CascadeType.ALL ) //name of the variable which specifies ManyToMany annotation
    @JsonIgnore
    private Set<Product> products = new HashSet<Product>();

    public Supplier() {}

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}