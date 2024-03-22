Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://redis:6379/1' } # Use 'redis' as the hostname
end
