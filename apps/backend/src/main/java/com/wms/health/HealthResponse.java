package com.wms.health;

import java.time.Instant;

public record HealthResponse(String status, String service, Instant checkedAt) {
}
