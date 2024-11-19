package com.security.jwt.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;

    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "ENG_ROLE", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "role_id")
    private List<String> roles = new ArrayList<>();
}
