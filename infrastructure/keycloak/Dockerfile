# Updated Dockerfile for Keycloak
FROM quay.io/keycloak/keycloak:26.1.2

# Copy realm import file
COPY realm-export.json /opt/keycloak/data/import/

# Set Keycloak environment variables
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Build optimized version for production
RUN /opt/keycloak/bin/kc.sh build

# Start Keycloak and import realm
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm", "--http-relative-path=/", "--http-host=0.0.0.0","--hostname-strict=false"]