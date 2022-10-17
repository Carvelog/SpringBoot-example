package com.carlos.demo.controllers;

import com.carlos.demo.models.Product;
import com.carlos.demo.models.Reason;
import com.carlos.demo.models.Role;
import com.carlos.demo.models.User;
import com.carlos.demo.security.ReasonDTO;
import com.carlos.demo.security.UserResponseDTO;
import com.carlos.demo.service.ProductService;
import com.carlos.demo.service.ReasonService;
import com.carlos.demo.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/reasons")
public class ReasonController {

    @Autowired private ReasonService reasonService;
    @Autowired private ProductService productService;

    //    @PreAuthorize("hasRole('USER')")
    @PostMapping("/reasons")
    public ResponseEntity<Object> saveReason(@RequestBody ReasonDTO reasonDTO){

        Product prod = productService.getProduct(reasonDTO.getProductId());
        Reason reason = new Reason(reasonDTO.getUserId(), reasonDTO.getDescription(), prod);

        Reason reasonSaved = reasonService.saveReason(reason);

        return new ResponseEntity<>(reasonSaved, HttpStatus.OK);
    }

    @GetMapping("/reason")
    public ResponseEntity<Object> getReason(@RequestParam(value = "id") Integer reasonId){
        Reason reason = reasonService.findReasonById(reasonId);
        return new ResponseEntity<>(new Gson().toJson(reason), HttpStatus.OK);
    }
}
