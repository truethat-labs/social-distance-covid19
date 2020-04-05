class HomeController < ApplicationController
  def index
    results = Geocoder.search(remote_ip)
    if results
      lat = results.first.latitude
      long = results.first.longitude

      @shops = Shop.near([lat, long], 10, order: :distance)

      if @shops.blank?
        @nearby_stores_list = fetch_nearby_places(lat, long)
      end
    end
    @shop = current_user.shops.first if current_user && current_user.shops
  end

  def nearby
    @shops = Shop.near([params[:lat], params[:long]], 10, order: :distance)
    render layout: false
  end

  private

    def fetch_nearby_places(lat, long)
      return unless (lat && long)
      headers = {}
      headers['Accept'] = 'application/json'
      url = "https://places.ls.hereapi.com/places/v1/discover/search?at=#{lat}%2C#{long}&q=grocery&apiKey=#{Rails.application.credentials.places_api_key}"
      result = RestClient.get(url, headers)
      JSON.parse(result.body)['results']['items']
    end
end
