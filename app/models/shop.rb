class Shop < ApplicationRecord
  belongs_to :user, optional: true

  geocoded_by lat: :latitude, lon: :longitude
end
