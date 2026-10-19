# CHADES

**Payments infrastructure: orchestration, ledger, risk, reconciliation.**
One platform, two clients, twenty services. Node.js + TypeScript + React.

CHADES is a senior-backend engineering portfolio: a payments-infrastructure
platform built to production standards — bounded services behind a single
API gateway, shared contracts enforced in CI, and an ADR/runbook/SLO
artifact for every service.

## Architecture

[web-console] ─┐
[mobile-wallet]─┴─► [api-gateway] ─► identity · ledger-core · payflow ·
                                     sentinel-fraud · reconciliation ·
                                     billing · notification · payout · kyc ·
                                     token-vault · webhook · settlement ·
                                     fx · dispute · analytics · aml ·
                                     config · merchant · audit

Shared: @chades-io/shared-types · @chades-io/audit · @chades-io/pricing · @chades-io/observability

## Services (20)

| # | Service | Responsibility | ADR | Failure mode | Client |
|---|---------|---------------|-----|-------------|--------|
| 1 | api-gateway | BFF for web + mobile; JWT, rate limits, routing | ADR-001 | upstream timeout + circuit breaker | both |
| 2 | identity-service | Users, RBAC, OAuth2/OIDC, token rotation | ADR-002 | token revocation + refresh replay | both |
| 3 | ledger-core | Immutable double-entry postings, multi-currency, FX locking | ADR-003 | property-based invariants + replay | web |
| 4 | payflow-orchestrator | Multi-PSP routing, saga/outbox, webhook verification | ADR-004 | DLQ + replay + PSP failover | both |
| 5 | sentinel-fraud | Rules + velocity scoring, sync/async decisioning | ADR-005 | sliding-window degrade + audit log | web |
| 6 | reconciliation-service | Ledger vs settlement matching, mismatch triage | ADR-006 | idempotent re-run + mismatch DLQ | web |
| 7 | billing-engine | Subscriptions, invoices, dunning | ADR-007 | idempotent retry + dunning DLQ | web |
| 8 | notification-service | Event fan-out (email/webhook/push) | ADR-008 | per-channel DLQ, at-least-once | web |
| 9 | payout-service | Outbound bank payouts, status reconciliation | ADR-009 | rail-failure compensation | web |
| 10 | kyc-pipeline | Async document verification + review queue | ADR-010 | job retry + manual review + audit | both |
| 11 | token-vault | Tokenization, card vault, PCI-scope isolation | ADR-011 | token desync + re-vault | both |
| 12 | webhook-service | Outbound merchant webhooks, retry, signing | ADR-012 | delivery DLQ + HMAC signing | web |
| 13 | settlement-service | Settlement plane, PSP file ingestion | ADR-013 | file-parse failure + replay | web |
| 14 | fx-service | Multi-currency conversion, rate locking | ADR-014 | rate-lock expiry + idempotent convert | both |
| 15 | dispute-service | Chargebacks, evidence deadlines | ADR-015 | state divergence + deadline miss | web |
| 16 | analytics-service | CQRS read models, aggregates | ADR-016 | stale aggregates + rebuild | web |
| 17 | aml-monitoring | Pattern monitoring, sanctions screening | ADR-017 | missed pattern + false positive | web |
| 18 | config-service | Dynamic routing config, feature flags | ADR-018 | stale config → misroute | web |
| 19 | merchant-service | Onboarding, API keys, plan assignment | ADR-019 | onboarding state divergence | both |
| 20 | audit-service | Audit query/export, tamper-evident hash chain | ADR-020 | hash-chain break + retention gap | web |

## Engineering standards (enforced in CI)

- Idempotency on every mutation; unique constraints tested
- Contract tests: payflow ↔ ledger-core, shared-types validated on every PR
- Observability: OTel traces + Prometheus metrics + structured logs (all services)
- Load tests: k6 scripts per service; p95/p99 SLOs documented
- ADRs in `docs/adr/`; runbooks in `docs/runbooks/`

## Monorepo layout

- `apps/web-console` — React operator console
- `apps/mobile-wallet` — React Native consumer wallet (later)
- `services/*` — 20 bounded backend services
- `packages/shared-types` — Zod schemas shared by all services + clients
- `packages/audit` — append-only event emit library
- `packages/pricing` — fee-calculation library
- `packages/observability` — OTel + logger + metrics
- `docs/adr` — Architecture Decision Records
- `docs/runbooks` — per-service runbooks
- `infra/` — Docker + Terraform (later)

## Status

- [x] Phase 0: monorepo skeleton
- [ ] Phase 1: `@chades-io/shared-types`
- [ ] Phase 2: `api-gateway` (mocked)
- [ ] Phase 3: `web-console`
- [ ] Phase 4: ADR-001 + first push
- [ ] ...twenty services