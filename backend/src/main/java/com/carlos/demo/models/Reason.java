package com.carlos.demo.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "REASON")
public class Reason implements Serializable {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reason_seq")
    @SequenceGenerator(name = "reason_seq", sequenceName = "reason_seq", allocationSize = 1)
    private Integer id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USERID", nullable = false)
    @Column(name = "USERID")
    private Integer userId;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "CREATIONDATE")
    private Date creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product product;

    public Reason() {}

    public Reason(Integer userId, String description, Product product) {
        this.userId = userId;
        this.description = description;
        this.creationDate = new Date();
        this.product = product;
    }

    public Integer getId() {
        return id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public com.carlos.demo.models.Product getProduct() {
        return product;
    }

    public void setProduct(com.carlos.demo.models.Product product) {
        this.product = product;
    }
}
