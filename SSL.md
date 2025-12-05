# HAProxy SSL Certificate Generation Guide

This guide explains how to generate self-signed SSL certificates for use with HAProxy in a development environment.

## Prerequisites

- OpenSSL installed on your system
- Access to a terminal/command prompt

## Certificate Generation Steps

1. **Create a directory for your certificates**
   ```bash
   mkdir certs
   ```

2. **Generate a self-signed certificate and private key**
   ```bash
   openssl req -new -x509 -days 365 -nodes -out test.haproxy.com.crt -keyout test.haproxy.com.key
   ```
   You will be prompted to answer several questions about your organization and location. These values are used to populate the certificate fields.

3. **Combine the key and certificate into a PEM file**
   ```bash
   cat test.haproxy.com.key test.haproxy.com.crt > test.haproxy.com.pem
   ```

## File Descriptions

- `test.haproxy.com.key`: Private key file (keep secure)
- `test.haproxy.com.crt`: Public certificate file
- `test.haproxy.com.pem`: Combined file containing both key and certificate (used by HAProxy)

## HAProxy Configuration

The generated certificate should be placed in the [./certs](file:///d:/Projects/tutorials/haproxy-basic-test/certs) directory to be mounted into the HAProxy container. The HAProxy configuration ([haproxy.cfg](file:///d:/Projects/tutorials/haproxy-basic-test/haproxy.cfg)) references this certificate in the HTTPS frontend:

```
frontend https_front
    bind *:443 ssl crt /certs/test.haproxy.com.pem
```

## Security Notes

- These are self-signed certificates intended for development/testing purposes only
- Do not use these certificates in production environments
- In production, use certificates from a trusted Certificate Authority (CA)
- Protect your private key files and restrict access permissions appropriately

## Troubleshooting

If HAProxy fails to start with SSL errors:
1. Ensure the certificate file exists in the correct location
2. Verify the certificate file has proper read permissions
3. Check that the certificate file is in the correct PEM format
4. Confirm the certificate file path matches the HAProxy configuration