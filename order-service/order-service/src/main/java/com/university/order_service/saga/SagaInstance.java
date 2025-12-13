package com.university.order_service.saga;

import com.university.order_service.saga.enums.SagaState;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

@Entity
public class SagaInstance {

    @Id
    private Long sagaId;

    @Enumerated(EnumType.STRING)
    private SagaState state;

    public Long getSagaId() {
        return sagaId;
    }

    public void setSagaId(Long sagaId) {
        this.sagaId = sagaId;
    }

    public SagaState getState() {
        return state;
    }

    public void setState(SagaState state) {
        this.state = state;
    }
}