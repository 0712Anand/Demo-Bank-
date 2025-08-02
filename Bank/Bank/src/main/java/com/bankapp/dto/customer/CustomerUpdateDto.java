package com.bankapp.dto.customer;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CustomerUpdateDto {
    private String custName;
    private String email;
    private LocalDate dob;
    private String phone;
    private String address;
}
