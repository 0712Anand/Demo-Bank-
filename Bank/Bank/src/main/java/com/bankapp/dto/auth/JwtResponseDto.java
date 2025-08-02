package com.bankapp.dto.auth;

import lombok.Getter;

import java.util.List;

@Getter
public class JwtResponseDto {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private Integer empId;
    private List<String> roles;

    public JwtResponseDto(String accessToken, Long id, String username,Integer empId, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.empId = empId;
        this.roles = roles;
    }
}