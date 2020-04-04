class Shop < ApplicationRecord
  belongs_to :user, optional: true
end
