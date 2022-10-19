package com.carlos.demo.security;

import java.util.Date;

public class ReasonDTO {
    private Integer userId;
    private String description;
    private Integer productId;
    private Date creationDate;

    public Integer getUserId() {
        return userId;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getDescription() {
        return description;
    }

    public Integer getProductId() {
        return productId;
    }
}
