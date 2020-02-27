package org.example.rest;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.example.service.user.ValidationError;
import org.springframework.validation.FieldError;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {
    ObjectMapper objectMapper = new ObjectMapper();

    public Response toResponse(ConstraintViolationException exception) {
        List<ValidationError> validationErrors = new ArrayList<>();
        for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
            ValidationError validationError = new ValidationError(violation.getLeafBean().getClass().getSimpleName(),
                    violation.getPropertyPath().toString(), violation.getMessageTemplate(),
                    violation.getMessageTemplate(), null);
            validationErrors.add(validationError);
        }
        String errorJson = null;
        try {
            errorJson = objectMapper.writeValueAsString(validationErrors);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return Response.status(Response.Status.BAD_REQUEST).entity(errorJson).type(MediaType.APPLICATION_JSON).build();

    }
}