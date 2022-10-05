package com.carlos.demo.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "PRICEREDUCTIONS")
public class PriceReductions {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pricereductions_seq")
    @SequenceGenerator(name = "pricereductions_seq", sequenceName = "pricereductions_seq", allocationSize = 1)
    private int id;

    @Column(name = "REDUCEDPRICE")
    private Float reducedPrice;

    @Column(name = "STARTDATE")
    private Date startDate;

    @Column(name = "ENDDATE")
    private Date endDate;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "priceReductions")
    @JsonIgnore
    private List<Product> products = new ArrayList<Product>();

    public PriceReductions(){}

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public int getId() {
        return id;
    }

    public Float getReducedPrice() {
        return reducedPrice;
    }

    public void setReducedPrice(Float reducedPrice) {
        this.reducedPrice = reducedPrice;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
