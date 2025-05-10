# Dockerfile for Keycloak
FROM quay.io/keycloak/keycloak:26.1.2

# Set Keycloak environment variables
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Start Keycloak and bind to 0.0.0.0
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm", "--http-host=0.0.0.0"]

