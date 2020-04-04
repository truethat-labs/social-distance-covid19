class Shop < ApplicationRecord
  belongs_to :user, optional: true

  geocoded_by lat: :latitude, lon: :longitude
  enum shop_type: { Grocery: 0, Medicine: 1, Other: 2}
end
