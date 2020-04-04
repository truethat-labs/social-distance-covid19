class ShopsController < ApplicationController

  def new
    @shop = Shop.new
  end

  def create
    @shop = current_user.shops.create(shop_params)

    if @shop
      redirect_to root_path
    else
      render 'new'
    end
  end

  def show
    @shop = Shop.find(params[:id])
  end

  def edit_store
    @shop = current_user.shops.first
  end

  def edit
    @shop = current_user.shops.find(params[:id])
  end

  def manage_store
    @shop = current_user.shops.first
  end

  def update
    @shop = current_user.shops.find(params[:id])

    if @shop.update(shop_params)
      redirect_to root_path
    else
      render 'edit'
    end
  end

  private

    def shop_params
      params.require(:shop).permit(:name, :phone_number, :shop_type, :address1, :address2, :city, :state, :country, :zipcode, :max_allowed, :latitude, :longitude, :open)
    end

end
