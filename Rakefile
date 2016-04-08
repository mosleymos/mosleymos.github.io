#!/usr/bin/env rake

task :default => [ :build ]

task :build do
      sh 'bundle exec jekyll build'
end

desc "Test site"
task :html_test do
  `htmlproof ./_site`
end
