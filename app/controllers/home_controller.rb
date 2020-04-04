class HomeController < ApplicationController
  def index
  end

  def nearby
    @shops = Shop.near([params[:lat], params[:long]], 50)
    # render layout: false
  end
end
