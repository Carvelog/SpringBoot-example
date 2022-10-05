package com.carlos.demo.service;

import com.carlos.demo.Models.PriceReductions;

import java.util.List;

public interface PriceReductionsProductsServiceInterface {
    List<PriceReductions> getPriceReductionsByProductId(Integer id);
}
