package com.carlos.demo.service;

import com.carlos.demo.models.PriceReductions;

import java.util.List;

public interface PriceReductionsProductsServiceInterface {
    List<PriceReductions> getPriceReductionsByProductId(Integer id);
}
