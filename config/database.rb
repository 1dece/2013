require 'active_record'

  def uri_to_config(uri)
    begin
      uri = URI.parse(uri)
    rescue URI::InvalidURIError
      raise "Invalid DATABASE_URL"
    end
    {
      'adapter'  => (uri.scheme == 'postgres' ? 'postgresql' : uri.scheme),
      'database' => (uri.scheme.match(/sqlite/) ? uri.path : uri.path[1..-1]),
      'username' => uri.user,
      'password' => uri.password,
      'host'     => uri.host,
      'port'     => uri.port,
    }
  end

ENV['DATABASE_URL'] ||= ENV['OPENSHIFT_POSTGRESQL_DB_URL'] || 'postgres://postgres:postgres@localhost/1dece'

@db_config = uri_to_config ENV['DATABASE_URL']

# ActiveRecord::Base.establish_connection @db_config

