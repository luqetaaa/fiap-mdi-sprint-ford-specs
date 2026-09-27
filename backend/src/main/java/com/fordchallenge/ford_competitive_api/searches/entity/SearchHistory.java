package com.fordchallenge.ford_competitive_api.searches.entity;

import com.fordchallenge.ford_competitive_api.users.entity.User;
import com.fordchallenge.ford_competitive_api.vehicles.entity.Vehicle;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "search_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String termoBusca;

    @Column(length = 4000)
    private String selectedFieldsJson;

    private Instant createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @PrePersist
    public void prePersist() {
        this.createdAt = Instant.now();
    }
}