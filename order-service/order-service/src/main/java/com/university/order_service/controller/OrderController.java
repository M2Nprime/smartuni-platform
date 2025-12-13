package com.university.order_service.controller;

import com.university.order_service.model.SagaContext;
import com.university.order_service.orchestrator.OrderSagaOrchestrator;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderSagaOrchestrator orchestrator;

    public OrderController(OrderSagaOrchestrator orchestrator) {
        this.orchestrator = orchestrator;
    }

    @PostMapping("/create")
    public String createOrder(@RequestParam Long orderId) {

        SagaContext context = new SagaContext();
        context.setOrderId(orderId);

        orchestrator.startSaga(context);

        return "Saga started for orderId = " + orderId;
    }

    @GetMapping("/test")
    public String test() {
        return "Order Service is running!";
    }
}