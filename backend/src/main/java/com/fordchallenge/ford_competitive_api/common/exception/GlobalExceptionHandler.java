package com.fordchallenge.ford_competitive_api.common.exception;

import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.dao.DataIntegrityViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private ResponseEntity<ApiErrorResponse> error(int status, String message) {
        return ResponseEntity.status(status).body(new ApiErrorResponse(status, message, LocalDateTime.now()));
    }
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiErrorResponse> response(ResponseStatusException ex) {
        return error(ex.getStatusCode().value(), ex.getReason());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> validation(MethodArgumentNotValidException ex) {
        return error(400, ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage());
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiErrorResponse> conflict(DataIntegrityViolationException ex) {
        return error(409, "Os dados informados já estão cadastrados ou são inválidos.");
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> unexpected(Exception ex) {
        log.error("Erro não tratado", ex);
        return error(500, "Não foi possível concluir a operação. Tente novamente.");
    }
}
