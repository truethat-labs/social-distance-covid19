class ApplicationController < ActionController::Base
  def remote_ip
    if Rails.env.development? || Rails.env.test?
      Net::HTTP.get(URI.parse('http://checkip.amazonaws.com/')).squish
    else
      request.remote_ip
    end
  end
end
