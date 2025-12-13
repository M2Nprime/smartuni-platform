package com.university.order_service.saga;

import com.university.order_service.saga.enums.OrderSagaState;
import java.util.EnumMap;
import java.util.Map;

public class SagaStateMachine {

    private final Map<OrderSagaState, OrderSagaState> transitions = new EnumMap<>(OrderSagaState.class);

    public SagaStateMachine() {

        transitions.put(OrderSagaState.CREATED, OrderSagaState.INVENTORY_RESERVED);
        transitions.put(OrderSagaState.INVENTORY_RESERVED, OrderSagaState.PAYMENT_COMPLETED);
        transitions.put(OrderSagaState.PAYMENT_COMPLETED, OrderSagaState.ORDER_COMPLETED);
    }

    public OrderSagaState nextState(OrderSagaState currentState) {
        return transitions.getOrDefault(currentState, currentState);
    }

}