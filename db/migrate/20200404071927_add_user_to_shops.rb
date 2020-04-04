class AddUserToShops < ActiveRecord::Migration[6.0]
  def change
    add_reference :shops, :user, foreign_key: true
  end
end
