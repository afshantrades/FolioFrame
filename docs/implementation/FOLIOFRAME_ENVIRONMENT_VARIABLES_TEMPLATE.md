# FolioFrame Environment Variables Template

Status: placeholder template only. Do not paste real keys into this document.

Use this as a planning checklist for a future approved production implementation. The static MVP does not read these values and no live integrations are active.

```bash
# App
NEXT_PUBLIC_APP_URL="https://example.com"

# Stripe
STRIPE_SECRET_KEY="sk_test_placeholder_replace_in_secure_env"
STRIPE_WEBHOOK_SECRET="whsec_placeholder_replace_in_secure_env"

# Email platforms
MAILERLITE_API_KEY="placeholder_mailerlite_api_key"
CONVERTKIT_API_KEY="placeholder_convertkit_api_key"

# Automation routes
MAKE_WEBHOOK_URL="https://hook.example.com/placeholder"
ZAPIER_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/placeholder"

# Buyer tracker
AIRTABLE_API_KEY="placeholder_airtable_api_key"
AIRTABLE_BASE_ID="app_placeholder"

# Support and access routes
SUPPORT_EMAIL="support@example.com"
ACCESSHUB_FORM_ENDPOINT="https://example.com/accesshub-placeholder"

# Video and file delivery
VIMEO_ACCESS_TOKEN="placeholder_vimeo_access_token"
GOOGLE_DRIVE_FOLDER_ID="placeholder_google_drive_folder_id"
```

## Handling Rules

- Store real values only in the approved deployment environment or secret manager.
- Do not commit `.env` files.
- Use separate test and production credentials.
- Rotate any credential that is accidentally exposed.
- Record the owner for each credential before production use.
- Confirm each integration path with a QA scenario before launch.

## Static MVP Status

Not live. This template is documentation only.
