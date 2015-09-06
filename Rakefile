require "rest_client"

task :minify_css do
	css_file = "css/mori.css"
	css_min_file = "css/mori.min.css"
	response = RestClient.post "http://cssminifier.com/raw", {:input => File.open(css_file).read}
	File.open(css_min_file, "w").write(response)
end

task :minify_js do
	`minify js/main.js`
end

task :clean do 
	`rm -rf js/main.min.js`
	`rm -rf css/mori.min.css`
end

task :build_site do 
	`rake clean; rake minify_js ; rake minify_css`
end
