# smartuni-platform
📘 SmartUni Platform – High-Level Architecture (Phase 1)

Software Analysis & Design – Microservices Project
Instructor: Dr. Fayzi

🧩 1. Overview

SmartUni Platform یک سیستم مدیریت هوشمند دانشگاه است که با رویکرد معماری میکروسرویس‌ طراحی شده است.
هدف این پروژه، ایجاد یک بستر مقیاس‌پذیر، ماژولار، چند–مستاجری و قابل توسعه است که ماژول‌های زیر را پوشش می‌دهد:

احراز هویت و مدیریت کاربران

مدیریت منابع و رزرو

بازارچه خدمات و بلیط

سفارش‌گذاری و موجودی

آموزش و آزمون آنلاین

سرویس‌های IoT (نقشه شاتل، سنسورهای کلاس‌ها)

این پروژه در قالب ۴ فاز و طی ۸ هفته انجام می‌شود. این فایل مربوط به فاز ۱ – معماری کلان و بنیا‌ن‌گذاری است.

🎯 2. اهداف فاز 1

هدف این فاز، ایجاد یک مدل معماری واضح و قابل اتکا برای توسعه سرویس‌هاست:

طراحی معماری میکروسرویس

تعیین سرویس‌های دامنه

تعریف نقش‌های کاربران

طراحی مدل امنیتی

طراحی ارتباطات همزمان و غیرهمزمان

انتخاب الگوها و تکنولوژی‌ها

ثبت تصمیمات معماری (ADR)

ساخت اسکلت پروژه (monorepo + docker-compose)

🧪 3. User Roles
Role	Description
Student	شرکت در آزمون، رزرو منابع، خرید محصول
Teacher	ایجاد آزمون و محتوا
Vendor / Faculty Admin	ایجاد محصولات بازارچه (رویداد/بلیط)
System Admin	مدیریت کاربران و مدیریت multi-tenant


🏗️ 4. System Services (Microservices)
Service	Responsibility
API Gateway	ورودی واحد، امنیت، Rate Limit، Routing
Auth Service	ثبت‌نام، ورود، JWT، RBAC، مدیریت tenant
Resource & Booking	مدیریت اتاق، سالن، رزرو و جلوگیری از Overbooking
Marketplace	مدیریت محصولات و فروش بلیط
Order/Inventory	مدیریت سفارش‌ها و موجودی (پایهٔ آینده Saga)
E-learning	ایجاد آزمون توسط استاد و شروع آزمون
Notification	ارسال اعلان، ایمیل، پیام
IoT Service	سنسورها، دمای کلاس، نقشه شاتل
BFF Layer	ساده‌سازی API برای Frontend



5. 🧱 C4 Model – Level 1: System Context Diagram (Mermaid)
flowchart TB
    UserStudent([Student])

    UserTeacher([Teacher])


    UserVendor([Vendor / Faculty Admin])


    UserAdmin([System Admin])

    ExternalShuttle[External Shuttle GPS Provider]


    ExternalEmail[Email/SMS Provider]



    subgraph SmartUni[SmartUni Platform]
        APIGW[API Gateway]


    end



    UserStudent -->|Uses via Web/App| APIGW


    UserTeacher -->|Creates Exams / Content| APIGW


    UserVendor -->|Manages Products / Events| APIGW


    UserAdmin -->|Manages System & Tenants| APIGW



    APIGW -->|External API| ExternalShuttle


    APIGW -->|Send Email/SMS| ExternalEmail


🔗 6. System Communication
▶️ 6.1 Synchronous Communication (REST)

Client → API Gateway → Microservices

Spring Boot REST

مناسب برای عملیات فوری (login، get resources، get products)

🔁 6.2 Asynchronous Communication (Event-driven)

Message Broker: RabbitMQ

سرویس‌ها رویداد publish می‌کنند

سرویس‌های دیگر subscribe می‌کنند

مناسب برای:

ثبت سفارش

ارسال اعلان

کارهای background

📦 7. C4 Level 2 – Container Diagram
flowchart LR


Client-->|HTTPS|APIGW[API Gateway]


APIGW -->|auth| Auth[User/Auth Service]


APIGW -->|rest| Resource[Resource & Booking]


APIGW -->|rest| Marketplace[Marketplace]


APIGW -->|rest| Elearn[E-Learning]


APIGW -->|rest| IoT[IoT Service]


Resource -->|publish| Rabbit[(RabbitMQ)]


Marketplace -->|publish| Rabbit


OrderService[Order/Inventory Service] -->|subscribe| Rabbit


Notification -->|subscribe| Rabbit


Auth -->|db| PostgresAuth[(Postgres)]


Resource -->|db| PostgresRes[(Postgres)]


Marketplace -->|db| PostgresMarket[(Postgres)]


OrderService -->|db| PostgresOrder[(Postgres)]



🔐 8. Security Architecture

احراز هویت با JWT (Access + Refresh)

رمزگذاری رمز عبور با BCrypt

کنترل دسترسی با RBAC

Rate Limiting در Gateway

احراز هویت خدمات با internal tokens

جلوگیری از دسترسی cross-tenant

🏷️ 9. Multi-Tenancy Model
مدل انتخاب‌شده:

Shared Database + Shared Schema + tenant_id

دلیل انتخاب:

ساده‌تر برای توسعه فاز ۱

امکان migration به schema-per-tenant در آینده

مناسب برای تیم ۸ نفره

🚀 10. Non-Functional Requirements (NFRs)
✔ Scalability

سرویس‌ها stateless

امکان scale افقی

✔ Performance

پاسخ کمتر از 200ms برای عملیات پایه

استفاده از Redis (در فازهای بعد)

✔ Reliability

استفاده از RabbitMQ برای جلوگیری از از دست رفتن پیام

مقاومت در برابر خرابی سرویس‌های فرعی

✔ Maintainability

رعایت SOLID

جداسازی کامل ماژول‌ها

ثبت Architecture Decision Record

🧱 11. Technology Stack
Backend

Java 21

Spring Boot 3.3

Spring Cloud

PostgreSQL

RabbitMQ

Docker & Docker Compose

Frontend

React + Vite

(Next.js in future)

🗂️ 12. Repository Structure (Monorepo)
/smartuni-platform
   /gateway
   /auth-service
   /resource-service
   /marketplace-service
   /order-service
   /elearn-service
   /notification-service
   /iot-service
   /bff
   /common-libs
   docker-compose.yml
   README.md

📝 13. Architecture Decision Records (ADR)
ADR-001 – Microservices Architecture انتخاب

به دلیل نیاز به مقیاس‌پذیری، جداسازی دامنه‌ها، قابلیت توسعه مستقل سرویس‌ها.

ADR-002 – انتخاب RabbitMQ

پیاده‌سازی ساده‌تر نسبت به Kafka، مناسب برای پروتوتایپ.

ADR-003 – Multi-tenancy با tenant_id

رویکرد ساده و migration-friendly.

ADR-004 – Monorepo Structure

بهینه برای تیم کوچک و هماهنگی سریع.

📦 14. Deliverables of Phase 1

README.md (فایل حاضر)

ساختار کامل پوشه‌ها

docker-compose.yml اولیه

دیاگرام‌های معماری

ADRها

اسکلت سرویس‌ها (بدون منطق)

🎉 Phase 1 Completed Successfully
