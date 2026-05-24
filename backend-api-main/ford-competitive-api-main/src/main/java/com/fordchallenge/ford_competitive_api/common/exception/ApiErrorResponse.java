package com.fordchallenge.ford_competitive_api.common.exception;

import java.time.LocalDateTime;

public record ApiErrorResponse(
        int status,
        String message,
        LocalDateTime timestamp
) {
}