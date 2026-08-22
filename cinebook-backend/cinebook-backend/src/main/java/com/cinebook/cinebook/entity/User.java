package com.cinebook.cinebook.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor

@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false,length = 60)
    private  String  firstName;
    @Column(nullable = false,length = 60)
    private  String lastName;
    @Column(nullable = false,unique = true,length = 100)
    private  String email;

    @Column(nullable = false)
    private  String password;
    @Column(unique = true,length = 10)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private  Role role;


}
