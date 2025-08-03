class CreateLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :locations do |t|
      t.string :address, null: false
      t.string :municipality, null: false
      t.string :district, null: false
      t.string :zipcode, null: false

      t.timestamps
    end
  end
end
