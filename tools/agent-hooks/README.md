# Inactive upstream hook references

These scripts are copied from MIT WoC source for inspection, not execution.
They are nested under inactive/ outside runtime hook discovery and have no registrations.
There is intentionally no project .githooks directory, no hook installer invocation and
no core.hooksPath change. Both runtime settings files contain empty hook maps.

Do not execute these scripts or paste their upstream hook registrations into settings.
They retain upstream assumptions. In particular ensure-hooks.sh writes Git configuration;
pre-push expects package scripts that this fork does not expose, and diff/untracked-file
scanning must first be constrained to exclude personal notes and secret caches.
Any future activation requires an explicit user request, adaptation and separate review.
