.PHONY=build
build:
	.\node_modules\.bin\esbuild ts/main.ts --bundle --outfile=main.js --watch
