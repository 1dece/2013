require 'sinatra'

load 'database'
load 'models/user'

get '/' do
  redirect '/index.html'
end

post '/save' do
  puts params.inspect
end
