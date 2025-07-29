class CreateServices < ActiveRecord::Migration[8.0]
  def change
    create_table :services do |t|
      t.string :name, null: false
      t.decimal :price, precision: 10, scale: 2
      
      t.references :location, null: false, foreign_key: true
      t.references :nutricionist, null: false, foreign_key: true

      t.timestamps
    end
  end
end
