require "./dece"

namespace :db do

  desc "Create database based on a DATABASE_URL"
  task(:create) do
    begin
      ActiveRecord::Base.establish_connection @db_config.merge(database: 'postgres', schema_search_path: 'public')
      ActiveRecord::Base.connection.create_database @db_config['database']
      ActiveRecord::Base.establish_connection @db_config
      $stdout.puts "database #{@db_config['database']} created"
    rescue Exception => e
      # $stderr.puts e, *(e.backtrace)
      $stderr.puts e
      $stderr.puts "Couldn't create database for #{@db_config.inspect}."
    end
  end

  desc "Drop database based on a DATABASE_URL"
  task(:drop) do
    begin
      ActiveRecord::Base.establish_connection @db_config.merge(database: 'postgres', schema_search_path: 'public')
      ActiveRecord::Base.connection.drop_database @db_config['database']
      $stdout.puts "database #{@db_config['database']} droppped"
    rescue Exception => e
      # $stderr.puts e, *(e.backtrace)
      $stderr.puts e
      $stderr.puts "Couldn't drop database for #{@db_config.inspect}."
    end
  end

  desc "Reset and migrate the database"
  task('migrate:reset' => ['db:drop', 'db:create', 'db:migrate']) do
  end

  desc "Migrate the database"
  task(:migrate) do
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    ActiveRecord::Migration.verbose = true
    ActiveRecord::Migrator.migrate("db/migrate")
  end

  desc "create an ActiveRecord migration in ./db/migrate"
  task :create_migration do
    name = ENV['NAME']
    abort("no NAME specified. use `rake db:create_migration NAME=create_users`") if !name

    migrations_dir = File.join("db", "migrate")
    version = ENV["VERSION"] || Time.now.utc.strftime("%Y%m%d%H%M%S")
    filename = "#{version}_#{name}.rb"
    migration_name = name.gsub(/_(.)/) { $1.upcase }.gsub(/^(.)/) { $1.upcase }

    FileUtils.mkdir_p(migrations_dir)

    open(File.join(migrations_dir, filename), 'w') do |f|
      f << (<<-EOS).gsub("      ", "")
      class #{migration_name} < ActiveRecord::Migration
	def self.up
	end

	def self.down
	end
      end
      EOS
    end
  end
end
