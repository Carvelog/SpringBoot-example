package com.carlos.demo.security;

import javax.persistence.Column;
import java.util.Date;

public class ReasonDTO {
    private Integer userId;
    private String description;
    private Integer productId;

    public Integer getUserId() {
        return userId;
    }

    public String getDescription() {
        return description;
    }

    public Integer getProductId() {
        return productId;
    }
}
