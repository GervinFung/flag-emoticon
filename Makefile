.PHONY: build
MAKEFLAGS += --silent

postinstall:
	pnpm prettier-config-generate && pnpm nuxt prepare

# format
format:
	pnpm prettier --ignore-path .gitignore --$(type) .

format-check:
	make format type=check

format-write:
	make format type=write

# build
build:
	pnpm nuxt build

development:
	pnpm nuxt dev

# generate
generate:
	pnpm nuxt generate

preview:
	pnpm nuxt preview
