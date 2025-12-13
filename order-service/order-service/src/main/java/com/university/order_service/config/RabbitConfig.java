package com.university.order_service.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String EXCHANGE = "saga.exchange";

    public static final String ROUTING_INVENTORY_RESERVE = "inventory.reserve";
    public static final String ROUTING_INVENTORY_RESPONSE = "inventory.response";

    public static final String ROUTING_PAYMENT_CHARGE = "payment.charge";
    public static final String ROUTING_PAYMENT_RESPONSE = "payment.response";

    public static final String Q_INVENTORY_REQUEST = "inventory.request.queue";
    public static final String Q_INVENTORY_RESPONSE = "inventory.response.queue";

    public static final String Q_PAYMENT_REQUEST = "payment.request.queue";
    public static final String Q_PAYMENT_RESPONSE = "payment.response.queue";

    @Bean
    public Queue inventoryRequestQueue() {
        return new Queue(Q_INVENTORY_REQUEST);
    }

    @Bean
    public Queue inventoryResponseQueue() {
        return new Queue(Q_INVENTORY_RESPONSE);
    }

    @Bean
    public Queue paymentRequestQueue() {
        return new Queue(Q_PAYMENT_REQUEST);
    }

    @Bean
    public Queue paymentResponseQueue() {
        return new Queue(Q_PAYMENT_RESPONSE);
    }

    @Bean
    public TopicExchange sagaExchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Binding bindInventoryRequest(Queue inventoryRequestQueue, TopicExchange sagaExchange) {
        return BindingBuilder.bind(inventoryRequestQueue).to(sagaExchange).with(ROUTING_INVENTORY_RESERVE);
    }

    @Bean
    public Binding bindInventoryResponse(Queue inventoryResponseQueue, TopicExchange sagaExchange) {
        return BindingBuilder.bind(inventoryResponseQueue).to(sagaExchange).with(ROUTING_INVENTORY_RESPONSE);
    }

    @Bean
    public Binding bindPaymentRequest(Queue paymentRequestQueue, TopicExchange sagaExchange) {
        return BindingBuilder.bind(paymentRequestQueue).to(sagaExchange).with(ROUTING_PAYMENT_CHARGE);
    }

    @Bean
    public Binding bindPaymentResponse(Queue paymentResponseQueue, TopicExchange sagaExchange) {
        return BindingBuilder.bind(paymentResponseQueue).to(sagaExchange).with(ROUTING_PAYMENT_RESPONSE);
    }

    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory factory = new CachingConnectionFactory("localhost", 5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        return factory;
    }
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        return new RabbitTemplate(connectionFactory);
    }
}