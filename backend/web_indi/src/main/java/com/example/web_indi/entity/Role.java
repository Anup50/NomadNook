package com.example.web_indi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @SequenceGenerator(name = "role_seq_gen", sequenceName = "role_id_seq",allocationSize = 1)
    @GeneratedValue(generator="role_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "role", nullable = false)
    private String role;
}
