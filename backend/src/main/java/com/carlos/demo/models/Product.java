package com.carlos.demo.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "PRODUCTS")
public class Product implements Serializable {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq")
    @SequenceGenerator(name = "product_seq", sequenceName = "product_seq", allocationSize = 1)
    private int id;

    @Column(name = "ITEM_CODE", unique = true, nullable = false)
    private  int itemCode;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "PRICE")
    private Float price;

    @Column(name = "STATE")
    private Boolean state;

    @Column(name = "CREATIONDATE")
    private Date creationDate;

    @Column(name = "CREATORID", nullable = false)
    private int creatorId;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "SUPPLIERSPRODUCTS",
            joinColumns = @JoinColumn(name = "PRODUCTID"),
            inverseJoinColumns = @JoinColumn(name = "SUPPLIERID")
    )
    Set<Supplier> suppliers;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "PRICEREDUCTIONSPRODUCTS",
            joinColumns = @JoinColumn(name = "PRODUCTID"),
            inverseJoinColumns = @JoinColumn(name = "PRICEREDUCTIONID")
    )
    List<PriceReductions> priceReductions;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    Set<Reason> reasons;

    public Product() {
        suppliers = new HashSet<Supplier>();
        priceReductions = new ArrayList<PriceReductions>();
    }

    public Set<Reason> getReasons() {
        return reasons;
    }

    public void setReasons(Set<Reason> reasons) {
        this.reasons = reasons;
    }

    public Set<Supplier> getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
    }

    public List<PriceReductions> getPriceReductions() { return priceReductions; }

    public void setPriceReductions(List<PriceReductions> priceReductions) { this.priceReductions = priceReductions; }

    public int getId() {
        return id;
    }

    public int getItemCode() {
        return itemCode;
    }

    public void setItemCode(int itemCode) {
        this.itemCode = itemCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
    }

    public void addReason(Reason reason){
        this.reasons.add(reason);
    }

    public void addSuppliers(Set<Supplier> suppliers){
        for(Supplier supplier : suppliers){
            this.suppliers.add(supplier);
        }
    }

    public void addPriceReduction(List<PriceReductions> priceReductions){
        for(PriceReductions priceReduction : priceReductions){
            this.priceReductions.add(priceReduction);
        }
    }
}