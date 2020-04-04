class HomeController < ApplicationController
  def index
    results = Geocoder.search(remote_ip)
    if results
      @shops = Shop.near([results.first.latitude, results.first.longitude], 10)
    end
  end

  def nearby
    @shops = Shop.near([params[:lat], params[:long]], 10)
    render layout: false
  end
end
