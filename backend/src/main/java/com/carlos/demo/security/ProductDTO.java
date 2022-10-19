package com.carlos.demo.security;

import com.carlos.demo.models.PriceReductions;
import com.carlos.demo.models.Supplier;

import java.util.*;

public class ProductDTO {

    private int itemCode;
    private String description;
    private Float price;
    private Boolean state;
    private int creatorId;
    Set<Supplier> suppliers;
    List<PriceReductions> priceReductions;

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

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
    }

    public Set<Supplier> getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
    }

    public List<PriceReductions> getPriceReductions() {
        return priceReductions;
    }

    public void setPriceReductions(List<PriceReductions> priceReductions) {
        this.priceReductions = priceReductions;
    }
}
