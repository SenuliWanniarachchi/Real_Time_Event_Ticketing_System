package com.java.Coursework01.controller;

import com.java.Coursework01.model.Vendor;
import com.java.Coursework01.service.VendorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    private final VendorService vendorService;

    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }

    @PostMapping
    public ResponseEntity<Vendor> saveVendor(@RequestBody Vendor vendor) {
        vendorService.saveVendor(vendor);
        return ResponseEntity.ok(vendor);
    }

    @GetMapping
    public ResponseEntity<List<Vendor>> getAllVendors() {
        return ResponseEntity.ok(vendorService.getAllVendors());
    }
}


