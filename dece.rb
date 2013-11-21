require 'sinatra'
require 'koala'

require './config/database'
ActiveRecord::Base.establish_connection @db_config
use ActiveRecord::ConnectionAdapters::ConnectionManagement

require './models/user'

require './helpers'

get '/' do
  user_stats
  erb :index
end

post '/character' do
  user = current_user
  reject! unless user
  user.gender = params["user"]["gender"]
  user.character = params["user"]["character"]
  user.save!
  user.to_json
end

post '/save' do
  allow_new = true
  user = current_user(allow_new)
  reject! unless user
  user.update_attributes(params["user"]) if user.new_record?
  user.to_json
end
