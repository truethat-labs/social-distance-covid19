class HomeController < ApplicationController
  def index
    results = Geocoder.search(remote_ip)
    if results.size > 0
      @location = {
        lat: results.first.latitude,
        lng: results.first.longitude
      }
      @shops = Shop.near([results.first.latitude, results.first.longitude], 10, order: :distance)
    end
    @shop = current_user.shops.first if current_user && current_user.shops
  end

  def nearby
    @shops = Shop.near([params[:lat], params[:long]], 10, order: :distance)
    render layout: false
  end
end
