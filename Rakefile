#!/usr/bin/env rake

require 'coffee-script'
require 'uglifier'

task :compile do
  name    = 'angular-restful-resource'
  file    = File.read "#{name}.coffee"
  content = CoffeeScript.compile file
  File.open "#{name}.js", 'w' do |file|
    file.write content
  end

  file    = File.read "#{name}.js"
  content = Uglifier.new.compile file
  File.open "#{name}.min.js", 'w' do |file|
    file.write content
  end
end
