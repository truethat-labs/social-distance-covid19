class ShopsController < ApplicationController

  def new
    @shop = Shop.new
  end

  def create
    @shop = Shop.new(shop_params)
    @shop.save

    if @shop.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  def show
    @shop = Shop.find(params[:id])
  end

  private

    def shop_params
      params.require(:shop).permit(:name, :phone_number, :shop_type, :address1, :address2, :city, :state, :country, :zipcode, :max_allowed, :lat, :long, :open)
    end
end
