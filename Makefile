init:
	mkdir dist

clean:
	rm -rf dist

package: init
	zip dist/peaceout.zip manifest.json *.html *.js *.css *.png

gen-images:
	magick peace.png -resize 16x -background transparent -gravity center peace16.png
	magick peace.png -resize 48x -background transparent -gravity center peace48.png
	magick peace.png -resize 128x -background transparent -gravity center peace128.png