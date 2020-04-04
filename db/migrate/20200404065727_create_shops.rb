class CreateShops < ActiveRecord::Migration[6.0]
  def change
    create_table :shops do |t|
      t.string :name
      t.bigint :phone_number
      t.integer :shop_type, default: 0
      t.text :address1
      t.text :address2
      t.string :city
      t.string :state
      t.string :country
      t.string :zipcode
      t.integer :max_allowed
      t.integer :in_store
      t.decimal :latitude
      t.decimal :longitude
      t.boolean :open, default: false

      t.timestamps
    end
  end
end
