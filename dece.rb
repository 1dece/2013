require 'sinatra'
require 'active_record'

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 'postgres://localhost/mydb')

get '/' do
  redirect '/index.html'
end

post '/save' do

end
